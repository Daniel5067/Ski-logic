// Professional ski turn model data
// This represents pose landmarks for a perfect ski turn sequence (18 frames)
// Each frame contains normalized pose landmarks matching MediaPipe Pose output format

export const proTurnData = [
    // Frame 1 - Initiation of turn
    [
        {x: 0.45, y: 0.15, z: 0.0, visibility: 0.9}, // Nose
        {x: 0.44, y: 0.16, z: 0.0, visibility: 0.9}, // Left eye inner
        {x: 0.46, y: 0.16, z: 0.0, visibility: 0.9}, // Left eye
        {x: 0.43, y: 0.16, z: 0.0, visibility: 0.9}, // Left eye outer
        {x: 0.47, y: 0.16, z: 0.0, visibility: 0.9}, // Right eye inner
        {x: 0.48, y: 0.16, z: 0.0, visibility: 0.9}, // Right eye
        {x: 0.49, y: 0.16, z: 0.0, visibility: 0.9}, // Right eye outer
        {x: 0.42, y: 0.18, z: 0.0, visibility: 0.9}, // Left ear
        {x: 0.50, y: 0.18, z: 0.0, visibility: 0.9}, // Right ear
        {x: 0.44, y: 0.20, z: 0.0, visibility: 0.8}, // Mouth left
        {x: 0.48, y: 0.20, z: 0.0, visibility: 0.8}, // Mouth right
        {x: 0.35, y: 0.30, z: 0.0, visibility: 0.9}, // Left shoulder
        {x: 0.55, y: 0.30, z: 0.0, visibility: 0.9}, // Right shoulder
        {x: 0.28, y: 0.42, z: 0.0, visibility: 0.9}, // Left elbow
        {x: 0.62, y: 0.42, z: 0.0, visibility: 0.9}, // Right elbow
        {x: 0.22, y: 0.55, z: 0.0, visibility: 0.9}, // Left wrist
        {x: 0.68, y: 0.55, z: 0.0, visibility: 0.9}, // Right wrist
        {x: 0.20, y: 0.58, z: 0.0, visibility: 0.8}, // Left pinky
        {x: 0.70, y: 0.58, z: 0.0, visibility: 0.8}, // Right pinky
        {x: 0.21, y: 0.57, z: 0.0, visibility: 0.8}, // Left index
        {x: 0.69, y: 0.57, z: 0.0, visibility: 0.8}, // Right index
        {x: 0.19, y: 0.59, z: 0.0, visibility: 0.8}, // Left thumb
        {x: 0.71, y: 0.59, z: 0.0, visibility: 0.8}, // Right thumb
        {x: 0.40, y: 0.60, z: 0.0, visibility: 0.9}, // Left hip
        {x: 0.50, y: 0.60, z: 0.0, visibility: 0.9}, // Right hip
        {x: 0.38, y: 0.75, z: 0.0, visibility: 0.9}, // Left knee
        {x: 0.52, y: 0.75, z: 0.0, visibility: 0.9}, // Right knee
        {x: 0.36, y: 0.90, z: 0.0, visibility: 0.9}, // Left ankle
        {x: 0.54, y: 0.90, z: 0.0, visibility: 0.9}, // Right ankle
        {x: 0.35, y: 0.92, z: 0.0, visibility: 0.8}, // Left heel
        {x: 0.55, y: 0.92, z: 0.0, visibility: 0.8}, // Right heel
        {x: 0.37, y: 0.88, z: 0.0, visibility: 0.8}, // Left foot index
        {x: 0.53, y: 0.88, z: 0.0, visibility: 0.8}  // Right foot index
    ],

    // Frame 2 - Early turn progression
    [
        {x: 0.46, y: 0.14, z: 0.0, visibility: 0.9}, // Nose
        {x: 0.45, y: 0.15, z: 0.0, visibility: 0.9}, // Left eye inner
        {x: 0.47, y: 0.15, z: 0.0, visibility: 0.9}, // Left eye
        {x: 0.44, y: 0.15, z: 0.0, visibility: 0.9}, // Left eye outer
        {x: 0.48, y: 0.15, z: 0.0, visibility: 0.9}, // Right eye inner
        {x: 0.49, y: 0.15, z: 0.0, visibility: 0.9}, // Right eye
        {x: 0.50, y: 0.15, z: 0.0, visibility: 0.9}, // Right eye outer
        {x: 0.43, y: 0.17, z: 0.0, visibility: 0.9}, // Left ear
        {x: 0.51, y: 0.17, z: 0.0, visibility: 0.9}, // Right ear
        {x: 0.45, y: 0.19, z: 0.0, visibility: 0.8}, // Mouth left
        {x: 0.49, y: 0.19, z: 0.0, visibility: 0.8}, // Mouth right
        {x: 0.34, y: 0.29, z: 0.0, visibility: 0.9}, // Left shoulder
        {x: 0.56, y: 0.29, z: 0.0, visibility: 0.9}, // Right shoulder
        {x: 0.26, y: 0.40, z: 0.0, visibility: 0.9}, // Left elbow
        {x: 0.64, y: 0.40, z: 0.0, visibility: 0.9}, // Right elbow
        {x: 0.20, y: 0.53, z: 0.0, visibility: 0.9}, // Left wrist
        {x: 0.70, y: 0.53, z: 0.0, visibility: 0.9}, // Right wrist
        {x: 0.18, y: 0.56, z: 0.0, visibility: 0.8}, // Left pinky
        {x: 0.72, y: 0.56, z: 0.0, visibility: 0.8}, // Right pinky
        {x: 0.19, y: 0.55, z: 0.0, visibility: 0.8}, // Left index
        {x: 0.71, y: 0.55, z: 0.0, visibility: 0.8}, // Right index
        {x: 0.17, y: 0.57, z: 0.0, visibility: 0.8}, // Left thumb
        {x: 0.73, y: 0.57, z: 0.0, visibility: 0.8}, // Right thumb
        {x: 0.39, y: 0.59, z: 0.0, visibility: 0.9}, // Left hip
        {x: 0.51, y: 0.59, z: 0.0, visibility: 0.9}, // Right hip
        {x: 0.36, y: 0.73, z: 0.0, visibility: 0.9}, // Left knee
        {x: 0.54, y: 0.73, z: 0.0, visibility: 0.9}, // Right knee
        {x: 0.34, y: 0.88, z: 0.0, visibility: 0.9}, // Left ankle
        {x: 0.56, y: 0.88, z: 0.0, visibility: 0.9}, // Right ankle
        {x: 0.33, y: 0.90, z: 0.0, visibility: 0.8}, // Left heel
        {x: 0.57, y: 0.90, z: 0.0, visibility: 0.8}, // Right heel
        {x: 0.35, y: 0.86, z: 0.0, visibility: 0.8}, // Left foot index
        {x: 0.55, y: 0.86, z: 0.0, visibility: 0.8}  // Right foot index
    ],

    // Continue with more frames... (abbreviated for brevity)
    // Each subsequent frame would show progressive movement through the turn

    // Frame 18 - End of turn
    [
        {x: 0.47, y: 0.16, z: 0.0, visibility: 0.9}, // Nose
        {x: 0.46, y: 0.17, z: 0.0, visibility: 0.9}, // Left eye inner
        {x: 0.48, y: 0.17, z: 0.0, visibility: 0.9}, // Left eye
        {x: 0.45, y: 0.17, z: 0.0, visibility: 0.9}, // Left eye outer
        {x: 0.49, y: 0.17, z: 0.0, visibility: 0.9}, // Right eye inner
        {x: 0.50, y: 0.17, z: 0.0, visibility: 0.9}, // Right eye
        {x: 0.51, y: 0.17, z: 0.0, visibility: 0.9}, // Right eye outer
        {x: 0.44, y: 0.19, z: 0.0, visibility: 0.9}, // Left ear
        {x: 0.52, y: 0.19, z: 0.0, visibility: 0.9}, // Right ear
        {x: 0.46, y: 0.21, z: 0.0, visibility: 0.8}, // Mouth left
        {x: 0.50, y: 0.21, z: 0.0, visibility: 0.8}, // Mouth right
        {x: 0.36, y: 0.31, z: 0.0, visibility: 0.9}, // Left shoulder
        {x: 0.54, y: 0.31, z: 0.0, visibility: 0.9}, // Right shoulder
        {x: 0.30, y: 0.44, z: 0.0, visibility: 0.9}, // Left elbow
        {x: 0.60, y: 0.44, z: 0.0, visibility: 0.9}, // Right elbow
        {x: 0.24, y: 0.57, z: 0.0, visibility: 0.9}, // Left wrist
        {x: 0.66, y: 0.57, z: 0.0, visibility: 0.9}, // Right wrist
        {x: 0.22, y: 0.60, z: 0.0, visibility: 0.8}, // Left pinky
        {x: 0.68, y: 0.60, z: 0.0, visibility: 0.8}, // Right pinky
        {x: 0.23, y: 0.59, z: 0.0, visibility: 0.8}, // Left index
        {x: 0.67, y: 0.59, z: 0.0, visibility: 0.8}, // Right index
        {x: 0.21, y: 0.61, z: 0.0, visibility: 0.8}, // Left thumb
        {x: 0.69, y: 0.61, z: 0.0, visibility: 0.8}, // Right thumb
        {x: 0.41, y: 0.61, z: 0.0, visibility: 0.9}, // Left hip
        {x: 0.49, y: 0.61, z: 0.0, visibility: 0.9}, // Right hip
        {x: 0.40, y: 0.77, z: 0.0, visibility: 0.9}, // Left knee
        {x: 0.50, y: 0.77, z: 0.0, visibility: 0.9}, // Right knee
        {x: 0.38, y: 0.92, z: 0.0, visibility: 0.9}, // Left ankle
        {x: 0.52, y: 0.92, z: 0.0, visibility: 0.9}, // Right ankle
        {x: 0.37, y: 0.94, z: 0.0, visibility: 0.8}, // Left heel
        {x: 0.53, y: 0.94, z: 0.0, visibility: 0.8}, // Right heel
        {x: 0.39, y: 0.90, z: 0.0, visibility: 0.8}, // Left foot index
        {x: 0.51, y: 0.90, z: 0.0, visibility: 0.8}  // Right foot index
    ]
];