# Smooth scroll-scrubbed video

If the hero video **only shows a few frames** (e.g. 4) or **holds then jumps** when you scroll, the MP4 has too few **keyframes** (I-frames). Browsers only seek to keyframes, so you only see that many distinct images.

**Fix:** Re-encode so there is a **keyframe every frame**. Use Option A below.

## Re-encode with ffmpeg

From the project root, run one of the following.

**Option A – Keyframe every frame (use this for smooth scrub; larger file):**
```bash
ffmpeg -i public/hero.mp4 -c:v libx264 -g 1 -keyint_min 1 -sc_threshold 0 -an public/hero-scrub.mp4
```

If `hero-scrub.mp4` still only shows a few frames, overwrite it with the same command (add `-y` to allow overwrite):
```bash
ffmpeg -y -i public/hero.mp4 -c:v libx264 -g 1 -keyint_min 1 -sc_threshold 0 -an public/hero-scrub.mp4
```

**Option B – Keyframe every 15 frames (~0.5s at 30fps, smaller file, still smooth):**
```bash
ffmpeg -i public/hero.mp4 -c:v libx264 -g 15 -keyint_min 15 -sc_threshold 0 -an public/hero-scrub.mp4
```

Then point your app at `hero-scrub.mp4` (e.g. in `src/app/page.tsx` set `HERO_VIDEO_SRC = "/hero-scrub.mp4"`).

- `-g 1` / `-keyint_min 1`: keyframe every frame.  
- `-g 15`: keyframe every 15 frames (every 0.5s at 30fps).  
- `-sc_threshold 0`: don’t add extra keyframes on scene change (keeps keyframes regular).  
- `-an`: no audio (optional; remove if you need sound).

Install ffmpeg: `brew install ffmpeg` (macOS) or [ffmpeg.org](https://ffmpeg.org).
