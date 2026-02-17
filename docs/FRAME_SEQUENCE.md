# Scroll-driven hero: image sequence

The hero uses an **image sequence** (one image per frame) instead of video. Scroll position picks the frame to show. No keyframes or encoding issues.

## Generate frames from your video

From the project root. Creates `public/hero-frames/frame_0001.jpg` … `frame_0150.jpg` (1-based, 4 digits).

**5 seconds at 30fps = 150 frames:**
```bash
mkdir -p public/hero-frames
ffmpeg -i public/misc/hero-scrub.mp4 -vf "fps=30" public/hero-frames/frame_%04d.jpg
```

**4.5 seconds at 60fps = 270 frames:**
```bash
mkdir -p public/hero-frames
ffmpeg -i public/misc/hero-scrub.mp4 -t 5 -vf "fps=360" public/hero-frames/frame_%04d.jpg
```
No config needed: frame count is derived from the number of files in `public/hero-frames`.

**Other duration/fps:** e.g. 10s at 24fps = 240 frames:
```bash
ffmpeg -i public/hero.mp4 -vf "fps=24" public/hero-frames/frame_%04d.jpg
```
Frame count is read automatically from the folder.

**Smaller files (WebP):**
```bash
ffmpeg -i public/hero.mp4 -vf "fps=30" public/hero-frames/frame_%04d.webp
```
Use `frameExt=".webp"` in the component.

**Frame count:** The app counts files in `public/hero-frames` at request time (server-side). No env or hard-coded count; add or remove frames and the hero updates automatically.
