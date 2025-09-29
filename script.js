// Import pro model data
import { proTurnData } from './pro_model.js';

// Get HTML elements
const videoUpload = document.getElementById('videoUpload');
const videoContainer = document.getElementById('videoContainer');
const videoPlayer = document.getElementById('videoPlayer');
const poseCanvas = document.getElementById('poseCanvas');
const canvasCtx = poseCanvas.getContext('2d');
const similarityScoreElement = document.getElementById('similarity-score');

// Initialize MediaPipe Pose
let pose;
let isAnalyzing = false;

// Similarity scoring variables
let frameCount = 0;
let totalSimilarity = 0;
let currentAverageScore = 0;

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

// Calculate pose similarity between user and pro poses
function calculatePoseSimilarity(userPose, proPose) {
    if (!userPose || !proPose || userPose.length !== proPose.length) {
        return 0;
    }

    let totalDistance = 0;
    let validLandmarks = 0;

    // Compare each landmark point
    for (let i = 0; i < userPose.length; i++) {
        const userPoint = userPose[i];
        const proPoint = proPose[i];

        // Only compare landmarks that are visible in both poses
        if (userPoint.visibility > 0.5 && proPoint.visibility > 0.5) {
            // Calculate Euclidean distance between corresponding landmarks
            const dx = userPoint.x - proPoint.x;
            const dy = userPoint.y - proPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            totalDistance += distance;
            validLandmarks++;
        }
    }

    if (validLandmarks === 0) {
        return 0;
    }

    // Calculate average distance
    const averageDistance = totalDistance / validLandmarks;

    // Convert distance to similarity percentage (0-100%)
    // Assuming max meaningful distance is around 0.5 (half the screen)
    const maxDistance = 0.5;
    const similarity = Math.max(0, (1 - (averageDistance / maxDistance)) * 100);

    return similarity;
}

// Handle pose detection results
function onPoseResults(results) {
    // Clear the canvas
    canvasCtx.clearRect(0, 0, poseCanvas.width, poseCanvas.height);

    // Draw pose landmarks if detected
    if (results.poseLandmarks) {
        // Store current pose landmarks for data capture
        currentPoseLandmarks = results.poseLandmarks;

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

        // Compare with pro model and update similarity score
        if (isAnalyzing) {
            compareWithProModel(results.poseLandmarks);
        }
    } else {
        // Clear stored landmarks if no pose detected
        currentPoseLandmarks = null;
    }
}

// Compare current pose with pro model and update similarity score
function compareWithProModel(userPose) {
    // Get corresponding pro pose frame (cycle through pro data)
    const proFrameIndex = frameCount % proTurnData.length;
    const proPose = proTurnData[proFrameIndex];

    // Calculate similarity for current frame
    const frameSimilarity = calculatePoseSimilarity(userPose, proPose);

    // Update running totals
    frameCount++;
    totalSimilarity += frameSimilarity;
    currentAverageScore = totalSimilarity / frameCount;

    // Update the display
    updateSimilarityDisplay();
}

// Update the similarity score display
function updateSimilarityDisplay() {
    const scoreText = `Pro Similarity Score: ${Math.round(currentAverageScore)}%`;
    similarityScoreElement.textContent = scoreText;

    // Add color coding based on score
    similarityScoreElement.style.color = getSimilarityColor(currentAverageScore);
}

// Get color based on similarity score
function getSimilarityColor(score) {
    if (score >= 80) return '#28a745'; // Green for excellent
    if (score >= 60) return '#ffc107'; // Yellow for good
    if (score >= 40) return '#fd7e14'; // Orange for fair
    return '#dc3545'; // Red for needs improvement
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
        // Reset scoring when starting analysis
        frameCount = 0;
        totalSimilarity = 0;
        currentAverageScore = 0;
        updateSimilarityDisplay();
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

// Data capture feature - press 'p' to capture current pose landmarks
let currentPoseLandmarks = null;

window.addEventListener('keydown', function(event) {
    // Check if 'p' key is pressed and video is playing
    if (event.key === 'p' || event.key === 'P') {
        if (isAnalyzing && currentPoseLandmarks) {
            console.log('Captured Pose Landmarks:', JSON.stringify(currentPoseLandmarks, null, 2));
            console.log('Raw Pose Landmarks Array:', currentPoseLandmarks);

            // Also show a brief visual confirmation
            const originalColor = similarityScoreElement.style.backgroundColor;
            similarityScoreElement.style.backgroundColor = '#28a745';
            setTimeout(() => {
                similarityScoreElement.style.backgroundColor = originalColor;
            }, 200);
        } else if (!isAnalyzing) {
            console.log('Data capture: Video must be playing to capture pose data');
        } else {
            console.log('Data capture: No pose landmarks detected in current frame');
        }
    }
});

// Initialize pose detection when page loads
window.addEventListener('load', function() {
    // Wait a bit for MediaPipe to load
    setTimeout(initializePose, 1000);
});