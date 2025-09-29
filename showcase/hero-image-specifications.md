# Hero Image Specifications for Slope Logic

## Image Requirements

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
- **Clothing**: Contrasting colors (dark jacket/pants) against white snow for better AI overlay visibility

#### Background
- **Setting**: Clean, snowy mountain slope
- **Lighting**: Bright, clear lighting (not backlit)
- **Snow condition**: Fresh powder or well-groomed slope
- **Clutter**: Minimal background distractions
- **Sky**: Blue sky or overcast but bright

#### Technical Considerations
- **Contrast**: High contrast between skier and background
- **Focus**: Sharp focus on the skier
- **Body position**: Clear joint visibility for AI pose estimation
- **Action**: Dynamic skiing pose (carved turn, not straight skiing)

### AI Overlay Integration

The HTML/CSS structure includes:

#### Pose Points (8 key joints)
- Head (25% from top, 48% from left)
- Left Shoulder (35% from top, 46% from left)
- Right Shoulder (35% from top, 52% from left)
- Hip Center (50% from top, 49% from left)
- Left Knee (65% from top, 45% from left)
- Right Knee (65% from top, 53% from left)
- Left Ankle (80% from top, 43% from left)
- Right Ankle (80% from top, 55% from left)

#### Feedback Bubbles (3 examples)
1. **Success feedback**: "Good balance" (top right)
2. **Warning feedback**: "Lean more forward" (middle left)
3. **Tip feedback**: "Improve knee angle" (bottom right)

#### Visual Effects
- Glowing cyan pose points with pulse animation
- Connected skeleton lines between joints
- Semi-transparent feedback bubbles with icons
- Floating animation for entire image container

### Where to Source the Image

#### Option 1: Stock Photography
- **Shutterstock**: Search "skier action pose side view"
- **Unsplash**: Search "skiing downhill professional"
- **Getty Images**: Search "ski technique demonstration"

#### Option 2: AI Generation
- **Midjourney prompt**: "Professional skier in dynamic carved turn, side view, bright snowy slope, high contrast, realistic photography style, clear body segments visible"
- **DALL-E prompt**: "High-quality photo of a skier in action pose on snowy slope, side angle view, bright lighting, professional skiing technique"

#### Option 3: Professional Photography
- Commission a ski photographer
- Ensure model release and usage rights
- Specific direction for AI overlay compatibility

### Installation Instructions

1. Save the image as `hero-ski-analysis.jpg` in the `showcase/` folder
2. The HTML and CSS are already configured to display the image with AI overlays
3. If the image doesn't exist, a placeholder will be shown
4. Ensure the image is optimized for web (compressed but high quality)

### Optimization Tips

- Use WebP format with JPG fallback for better compression
- Implement lazy loading if needed
- Consider responsive images with srcset for different screen sizes
- Test the pose point positions and adjust in CSS if needed based on actual skier position

### Current Implementation Status

✅ HTML structure complete with pose points and feedback bubbles
✅ CSS styling with animations and responsive design
✅ Fallback placeholder when image is missing
❌ Actual hero image (needs to be sourced/created)

The implementation will automatically work once the image file is added to the showcase folder.