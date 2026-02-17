import { readdirSync } from "fs";
import { join } from "path";

/**
 * Returns the number of frame files in public/hero-frames (or the folder
 * implied by frameBasePath). Use in Server Components only.
 * Example: "/hero-frames/frame_" -> folder "hero-frames"; counts frame_*.jpg
 */
export function getHeroFrameCount(
  frameBasePath: string,
  frameExt: string
): number {
  const segments = frameBasePath.replace(/^\/+/, "").split("/").filter(Boolean);
  const folder = segments[0] ?? "hero-frames";
  const dir = join(process.cwd(), "public", folder);
  try {
    const files = readdirSync(dir);
    const prefix = "frame_";
    return files.filter(
      (f) => f.startsWith(prefix) && f.endsWith(frameExt)
    ).length;
  } catch {
    return 0;
  }
}
