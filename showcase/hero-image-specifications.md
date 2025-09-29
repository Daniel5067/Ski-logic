# Hero Image Specifications for Slope Logic

## UPDATED: Integrated Hero Image Requirements

### File Details
- **Filename**: `hero-ski-analysis.jpg`
- **Dimensions**: 1200x800px (3:2 aspect ratio)
- **Format**: JPG (optimized for web, ~200KB max)
- **Quality**: High resolution, professional photography

### Content Requirements

#### Main Subject
- **Primary focus**: A skier in dynamic action pose
- **Skiing position**: Mid-turn on a snowy slope
- **Angle**: Side profile or 3/4 view to clearly show body form
- **Visibility**: Clear view of skier's body segments (head, shoulders, torso, hips, knees, ankles)
- **Clothing**: Contrasting colors (dark jacket/pants) against white snow

#### Background
- **Setting**: Clean, snowy mountain slope
- **Lighting**: Bright, clear lighting (not backlit)
- **Snow condition**: Fresh powder or well-groomed slope
- **Clutter**: Minimal background distractions
- **Sky**: Blue sky or overcast but bright

### CRITICAL: AI Elements Must Be Part of the Image

**Unlike the previous approach with HTML/CSS overlays, the AI analysis elements must be integrated directly into the image itself:**

#### Required AI Elements in the Image:
1. **Pose Detection Points**: Bright cyan/blue dots on key body joints (head, shoulders, hips, knees, ankles)
2. **Skeleton Lines**: Connected lines between the pose points showing body structure analysis
3. **Feedback Annotations**: Small text labels or icons near body parts showing AI coaching tips:
   - "Good form" near upper body
   - "Adjust angle" near knees
   - "Lean forward" or similar coaching cues
4. **Professional UI Elements**: Clean, modern interface elements that look like they're from a ski analysis app

#### Visual Style for AI Elements:
- **Color scheme**: Bright cyan (#00D4FF) for pose points and lines
- **Typography**: Clean, modern font for text annotations
- **Style**: Futuristic but not overwhelming - should enhance, not dominate the image
- **Transparency**: AI elements should be semi-transparent to not block the skier
- **Professional look**: Should appear as if from a real AI coaching application

### How to Create/Source the Image

#### Option 1: AI Image Generation (Recommended)
**Midjourney Prompt:**
```
Professional skier in dynamic carved turn on snowy mountain slope, side view, with bright cyan AI pose detection points overlaid on joints (head, shoulders, hips, knees, ankles), connected skeleton lines, small coaching text labels "Good form", "Adjust angle", "Lean forward", futuristic ski analysis interface, clean modern UI, bright lighting, realistic photography style, 3:2 aspect ratio --ar 3:2 --style raw
```

**DALL-E Prompt:**
```
High-quality photograph of a skier in dynamic action pose on a bright snowy slope, with AI analysis overlay showing bright cyan pose detection points on body joints, connected skeleton lines, and small text coaching feedback labels, professional ski coaching app interface, clean modern design, side view angle, mountain background
```

#### Option 2: Photo Editing Approach
1. Find high-quality skiing action photo (stock photo sites)
2. Use Photoshop/GIMP to add AI elements:
   - Add bright cyan dots on key joints
   - Draw connecting lines between joints
   - Add text annotations with coaching tips
   - Use modern UI design elements

#### Option 3: Professional Creation
- Commission a designer/photographer
- Provide the detailed specifications above
- Ensure all AI elements are integrated into the final image

### Installation Instructions

1. Save the final image as `hero-ski-analysis.jpg` in the `showcase/` folder
2. The HTML and CSS are configured for a simple, full-width hero image
3. If the image doesn't exist, a placeholder with specifications will be shown
4. Ensure the image is optimized for web (compressed but high quality)

### Current Implementation Status

✅ Simplified HTML structure for full-width hero image
✅ Clean CSS styling with responsive design
✅ Informative placeholder when image is missing
✅ Professional floating animation
❌ Actual integrated hero image (needs to be created)

**The new implementation is much cleaner and will showcase a single, powerful image that demonstrates your AI ski analysis technology directly within the image itself.**