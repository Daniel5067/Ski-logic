// Get HTML elements
const videoUpload = document.getElementById('videoUpload');
const videoContainer = document.getElementById('videoContainer');
const videoPlayer = document.getElementById('videoPlayer');
const poseCanvas = document.getElementById('poseCanvas');
const canvasCtx = poseCanvas.getContext('2d');

// Initialize MediaPipe Pose
let pose;
let isAnalyzing = false;

// Initialize pose detection when page loads
function initializePose() {
    pose = new Pose({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
    });

    pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    pose.onResults(onPoseResults);
}

// Handle pose detection results
function onPoseResults(results) {
    // Clear the canvas
    canvasCtx.clearRect(0, 0, poseCanvas.width, poseCanvas.height);

    // Draw pose landmarks if detected
    if (results.poseLandmarks) {
        // Draw pose connections (skeleton)
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
            color: '#00FF00',
            lineWidth: 4
        });

        // Draw pose landmarks (joints)
        drawLandmarks(canvasCtx, results.poseLandmarks, {
            color: '#FF0000',
            radius: 6
        });
    }
}

// Handle file upload
videoUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith('video/')) {
        // Create object URL for the video file
        const videoURL = URL.createObjectURL(file);

        // Set video source and show the video container
        videoPlayer.src = videoURL;
        videoContainer.classList.remove('hidden');

        // Set up canvas dimensions when video metadata loads
        videoPlayer.addEventListener('loadedmetadata', function() {
            poseCanvas.width = videoPlayer.videoWidth;
            poseCanvas.height = videoPlayer.videoHeight;
        });
    }
});

// Handle video play event
videoPlayer.addEventListener('play', function() {
    if (!isAnalyzing) {
        isAnalyzing = true;
        detectPose();
    }
});

// Handle video pause/end events
videoPlayer.addEventListener('pause', function() {
    isAnalyzing = false;
});

videoPlayer.addEventListener('ended', function() {
    isAnalyzing = false;
});

// Continuously detect pose while video is playing
async function detectPose() {
    if (isAnalyzing && !videoPlayer.paused && !videoPlayer.ended) {
        // Send current video frame to MediaPipe
        await pose.send({ image: videoPlayer });

        // Request next frame
        requestAnimationFrame(detectPose);
    }
}

// Update canvas size when video dimensions change
videoPlayer.addEventListener('resize', function() {
    poseCanvas.width = videoPlayer.videoWidth;
    poseCanvas.height = videoPlayer.videoHeight;
});

// Initialize pose detection when page loads
window.addEventListener('load', function() {
    // Wait a bit for MediaPipe to load
    setTimeout(initializePose, 1000);
});