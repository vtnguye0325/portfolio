export const heroFrames = {
  frameBasePath:
    process.env.NEXT_PUBLIC_HERO_FRAME_BASE ?? "/hero-frames/frame_",
  frameExt: process.env.NEXT_PUBLIC_HERO_FRAME_EXT ?? ".jpg",
} as const;
