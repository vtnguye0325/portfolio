"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Overlay } from "./Overlay";

gsap.registerPlugin(ScrollTrigger);

interface ScrollyFramesProps {
  /** Base path for frames, e.g. "/hero-frames/frame_" (ffmpeg outputs frame_0001.jpg, frame_0002.jpg, ...) */
  frameBasePath: string;
  /** Total number of frames (e.g. 150 for 5s at 30fps) */
  frameCount: number;
  /** File extension, e.g. ".jpg" or ".webp" */
  frameExt?: string;
  sectionHeight?: number;
}

function buildFrameUrls(
  basePath: string,
  count: number,
  ext: string
): string[] {
  const urls: string[] = [];
  for (let i = 0; i < count; i++) {
    const num = String(i + 1).padStart(4, "0");
    urls.push(`${basePath}${num}${ext}`);
  }
  return urls;
}

export function ScrollyFrames({
  frameBasePath,
  frameCount,
  frameExt = ".jpg",
  sectionHeight = 1200,
}: ScrollyFramesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [frameUrls, setFrameUrls] = useState<string[]>(() =>
    buildFrameUrls(frameBasePath, frameCount, frameExt)
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const urls = buildFrameUrls(frameBasePath, frameCount, frameExt);
    setFrameUrls(urls);
    setReady(false);

    let loaded = 0;
    const target = urls.length;
    const preloads = urls.map((src) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded >= target) setReady(true);
      };
      img.src = src;
      return img;
    });

    return () => {
      preloads.forEach((img) => (img.src = ""));
    };
  }, [frameBasePath, frameCount, frameExt]);

  useEffect(() => {
    if (!ready || !containerRef.current || !imgRef.current) return;

    const container = containerRef.current;
    const img = imgRef.current;
    const urls = frameUrls;
    const lastIndex = urls.length - 1;
    let currentIndex = -1;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const index = Math.round(self.progress * lastIndex);
        if (index !== currentIndex && urls[index]) {
          currentIndex = index;
          img.src = urls[index];
        }
      },
    });

    currentIndex = 0;
    img.src = urls[0];

    return () => st.kill();
  }, [ready, frameUrls]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${sectionHeight}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden will-change-transform">
        <img
          ref={imgRef}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          src={frameUrls[0]}
          draggable={false}
        />
        <Overlay triggerRef={containerRef} />
      </div>
    </div>
  );
}
