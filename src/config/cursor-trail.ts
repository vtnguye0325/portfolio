/**
 * Cursor trail effect configuration.
 *
 * Specify a folder in public/ and a naming convention. Images are loaded as
 * {folder}/{prefix}{n}{ext} for n = 1..count (e.g. /trail/trail1.jpg).
 */
export const cursorTrail = {
  /** Folder path in public/ (e.g. "/trail"). */
  folder: "/trail",
  /** File prefix (e.g. "trail" → trail1.jpg, trail2.jpg). */
  prefix: "trail",
  /** File extension (e.g. ".jpg"). */
  ext: ".jpg",
  /** Number of images (1..count). */
  count: 5,
  /** Pixels of mouse movement before spawning next image. */
  gap: 300,
  /** Width/height of each trail image in pixels. */
  size: 1000,
  /** z-index of the trail overlay. */
  zIndex: 50,
} as const;

export function getCursorTrailImages(): string[] {
  const { folder, prefix, ext, count } = cursorTrail;
  if (count < 1) return [];
  return Array.from({ length: count }, (_, i) =>
    `${folder}/${prefix}${i + 1}${ext}`
  );
}
