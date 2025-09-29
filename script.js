// Find our HTML elements from the page
const feedbackElement = document.getElementById("feedback");
const statusElement = document.getElementById("status");
const videoUploadElement = document.getElementById("videoUpload");
const statusBarElement = document.getElementById("statusBar");

// Video upload elements
let uploadedVideo = null;
let canvasElement = null;
let canvasCtx = null;
let isAnalyzingVideo = false;

// MediaPipe pose landmark indices (for clarity)
const POSE_LANDMARKS = {
  LEFT_HIP: 23,
  LEFT_KNEE: 25,
  LEFT_ANKLE: 27,
  RIGHT_HIP: 24,
  RIGHT_KNEE: 26,
  RIGHT_ANKLE: 28
};

// Performance tracking
let lastFrameTime = 0;
const FRAME_RATE_LIMIT = 30; // Max 30 FPS
const FRAME_INTERVAL = 1000 / FRAME_RATE_LIMIT;

// State management
let isInitialized = false;
let pose = null;

// Browser compatibility check
function checkBrowserSupport() {
  const errors = [];

  if (!HTMLCanvasElement.prototype.getContext) {
    errors.push("Canvas not supported");
  }

  if (!window.FileReader) {
    errors.push("File reading not supported");
  }

  return errors;
}

// Wait for MediaPipe libraries to load
function waitForMediaPipe() {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max wait

    const checkForMediaPipe = () => {
      // Check for the actual objects MediaPipe exposes
      const hasPose = typeof window.Pose === 'function';
      const hasDrawingUtils = typeof window.drawConnectors === 'function' && typeof window.drawLandmarks === 'function';
      const hasConnections = typeof window.POSE_CONNECTIONS !== 'undefined';

      console.log('MediaPipe check:', { hasPose, hasDrawingUtils, hasConnections });

      if (hasPose && hasDrawingUtils && hasConnections) {
        console.log('All required MediaPipe libraries loaded successfully');
        resolve();
      } else if (attempts >= maxAttempts) {
        const missing = [];
        if (!hasPose) missing.push('Pose');
        if (!hasDrawingUtils) missing.push('Drawing utilities');
        if (!hasConnections) missing.push('Pose connections');
        reject(new Error(`MediaPipe libraries failed to load. Missing: ${missing.join(', ')}`));
      } else {
        attempts++;
        setTimeout(checkForMediaPipe, 100);
      }
    };

    checkForMediaPipe();
  });
}

// Status update helper
function updateStatus(message, type = 'loading') {
  statusElement.textContent = message;
  statusElement.className = `status-${type}`;
}

// Error handling helper
function handleError(error, userMessage) {
  console.error(error);
  updateStatus(userMessage, 'error');
  feedbackElement.innerHTML = "Error: Unable to analyze pose";
}

// This is our helper function to calculate an angle between three dots
function calculateAngle(a, b, c) {
  try {
    if (!a || !b || !c || typeof a.x !== 'number' || typeof a.y !== 'number' ||
        typeof b.x !== 'number' || typeof b.y !== 'number' ||
        typeof c.x !== 'number' || typeof c.y !== 'number') {
      return null;
    }

    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);

    if (angle > 180.0) {
      angle = 360 - angle;
    }
    return angle;
  } catch (error) {
    console.error("Error calculating angle:", error);
    return null;
  }
}

// Video upload handling
function handleVideoUpload(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('video/')) {
    // Clean up previous video if exists
    if (uploadedVideo) {
      uploadedVideo.remove();
    }
    if (canvasElement) {
      canvasElement.remove();
    }

    // Create video container
    const videoContainer = document.createElement('div');
    videoContainer.style.position = 'relative';
    videoContainer.style.display = 'inline-block';
    videoContainer.style.margin = '1em auto';
    videoContainer.style.border = '1px solid #555';

    // Create video element for uploaded video
    uploadedVideo = document.createElement('video');
    uploadedVideo.controls = true;
    uploadedVideo.style.display = 'block';
    uploadedVideo.style.width = '100%';
    uploadedVideo.style.height = 'auto';
    uploadedVideo.style.maxWidth = '640px';

    // Create canvas for pose overlay
    canvasElement = document.createElement('canvas');
    canvasElement.style.position = 'absolute';
    canvasElement.style.top = '0';
    canvasElement.style.left = '0';
    canvasElement.style.pointerEvents = 'none';
    canvasCtx = canvasElement.getContext('2d');

    // Add elements to container
    videoContainer.appendChild(uploadedVideo);
    videoContainer.appendChild(canvasElement);

    // Add container to page (after feedback element)
    feedbackElement.parentNode.insertBefore(videoContainer, feedbackElement.nextSibling);

    // Set video source
    uploadedVideo.src = URL.createObjectURL(file);

    // Update status bar
    statusBarElement.textContent = "Status: Video loaded. Press play to begin.";

    // Add event listeners for video events
    uploadedVideo.addEventListener('play', () => {
      statusBarElement.textContent = "Status: Analyzing...";
      isAnalyzingVideo = true;
      startVideoAnalysis();
    });

    uploadedVideo.addEventListener('pause', () => {
      statusBarElement.textContent = "Status: Paused.";
      isAnalyzingVideo = false;
    });

    uploadedVideo.addEventListener('ended', () => {
      statusBarElement.textContent = "Status: Paused.";
      isAnalyzingVideo = false;
    });

    // Update canvas size when video metadata loads
    uploadedVideo.addEventListener('loadedmetadata', () => {
      canvasElement.width = uploadedVideo.videoWidth;
      canvasElement.height = uploadedVideo.videoHeight;
    });
  }
}

// Analyze uploaded video frames
function startVideoAnalysis() {
  if (!uploadedVideo || !pose || !isAnalyzingVideo) return;

  const analyzeFrame = async () => {
    if (uploadedVideo && !uploadedVideo.paused && !uploadedVideo.ended && isAnalyzingVideo) {
      try {
        await pose.send({image: uploadedVideo});
      } catch (error) {
        console.error("Error analyzing video frame:", error);
      }
      requestAnimationFrame(analyzeFrame);
    }
  };

  analyzeFrame();
}

// This main function runs every time the AI sees a person
function onResults(results) {
  try {
    // Only process if we have an uploaded video and canvas
    if (!uploadedVideo || !canvasElement || !canvasCtx) {
      return;
    }

    // Frame rate limiting
    const currentTime = performance.now();
    if (currentTime - lastFrameTime < FRAME_INTERVAL) {
      return;
    }
    lastFrameTime = currentTime;

    // Ensure we have valid video dimensions
    if (!uploadedVideo.videoWidth || !uploadedVideo.videoHeight) {
      return;
    }

    // Make sure canvas is properly sized
    if (canvasElement.width !== uploadedVideo.videoWidth || canvasElement.height !== uploadedVideo.videoHeight) {
      canvasElement.width = uploadedVideo.videoWidth;
      canvasElement.height = uploadedVideo.videoHeight;
    }

    // Clear the canvas
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // If the AI finds pose dots, start the analysis
    if (results.poseLandmarks && results.poseLandmarks.length > 0) {
      // Draw the skeleton lines and dots on the screen
      if (typeof drawConnectors === 'function' && typeof POSE_CONNECTIONS !== 'undefined') {
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {color: '#00FF00', lineWidth: 4});
      }
      if (typeof drawLandmarks === 'function') {
        drawLandmarks(canvasCtx, results.poseLandmarks, {color: '#FF0000', radius: 2});
      }

      // --- Start of Ski Coach Logic ---

      // Get the specific dots we need for the left leg
      const leftHip = results.poseLandmarks[POSE_LANDMARKS.LEFT_HIP];
      const leftKnee = results.poseLandmarks[POSE_LANDMARKS.LEFT_KNEE];
      const leftAnkle = results.poseLandmarks[POSE_LANDMARKS.LEFT_ANKLE];

      // Validate that we have all required landmarks
      if (leftHip && leftKnee && leftAnkle) {
        // Calculate the angle of the left knee using our function
        const kneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);

        if (kneeAngle !== null && !isNaN(kneeAngle)) {
          // Display the angle on the screen, rounded to a whole number
          feedbackElement.innerHTML = "Knee Angle: " + Math.round(kneeAngle) + "°";
        } else {
          feedbackElement.innerHTML = "Knee Angle: --";
        }
      } else {
        feedbackElement.innerHTML = "Knee Angle: -- (landmarks not detected)";
      }

      // --- End of Ski Coach Logic ---
    } else {
      feedbackElement.innerHTML = "Knee Angle: -- (no pose detected)";
      // Status remains "Analyzing..." when AI fails to find landmarks (as requested)
    }
  } catch (error) {
    handleError(error, "Error processing pose data");
  }
}

// Initialize the application
async function initializeApp() {
  try {
    updateStatus("Checking browser compatibility...", 'loading');

    // Check browser support
    const compatibilityErrors = checkBrowserSupport();
    if (compatibilityErrors.length > 0) {
      handleError(new Error("Browser not compatible"), compatibilityErrors.join(", "));
      return;
    }

    updateStatus("Loading MediaPipe libraries...", 'loading');

    // Wait for MediaPipe libraries to load
    await waitForMediaPipe();
    updateStatus("Loading AI model...", 'loading');

    // Setup the AI Model with error handling
    pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      }
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    // Connect our main function (onResults) to the AI
    pose.onResults(onResults);

    updateStatus("Ready! Upload a video to begin pose analysis.", 'ready');

  } catch (error) {
    handleError(error, "Failed to initialize application");
  }
}

// Cleanup function
function cleanup() {
  try {
    if (pose) {
      pose.close();
    }
    if (uploadedVideo && uploadedVideo.src) {
      URL.revokeObjectURL(uploadedVideo.src);
    }
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
}

// Handle page unload
window.addEventListener('beforeunload', cleanup);

// Add video upload event listener
videoUploadElement.addEventListener('change', handleVideoUpload);

// Start the application when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}