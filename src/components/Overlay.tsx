"use client";

/**
 * Overlay — scroll-driven text above the hero frame sequence.
 *
 * Renders three lines of copy that fade in/out and move slightly (parallax)
 * as the user scrolls through the hero section. Uses the same ScrollTrigger
 * context as the hero (same trigger element, start/end) so text and frames
 * stay in sync. Timeline progress 0–1 maps to scroll progress through the
 * trigger; durations are proportions of that timeline.
 */

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface OverlayProps {
  /** Ref to the tall hero container; ScrollTrigger uses it for start/end. */
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

export function Overlay({ triggerRef }: OverlayProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger || !line1Ref.current || !line2Ref.current || !line3Ref.current)
      return;

    // Same trigger/start/end as hero so overlay and frame sequence share one scroll range
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });


    tl.fromTo(
      line1Ref.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0 }
    )
      .to(line1Ref.current, { opacity: 1, y: 0, duration: 0 })
      .to(line1Ref.current, { opacity: 0, y: -16, duration: 0.5 }, 0.0);


    tl.fromTo(
      line2Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.20 },
      0.28
    )
      .to(line2Ref.current, { opacity: 1, y: 0, duration: 0.25 })


    tl.fromTo(
      line3Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.12 },
      0.58
    )
      .to(line3Ref.current, { opacity: 1, y: 0, duration: 0.42 })

    return () => {
      tl.kill();
    };
  }, [triggerRef]);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
    >
      {/* Line 1: headline, center. Animates 0% → ~25% scroll (in, hold, out up). */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p
          ref={line1Ref}
          className="opacity-0 text-center text-3xl font-light tracking-tight text-white/95 drop-shadow-lg md:text-5xl lg:text-6xl"
        >
          Vy Nguyen
        </p>
      </div>
      {/* Line 2: tagline, left. Animates ~28% → ~55% scroll (in from below, hold, out up). */}
      <div className="absolute inset-0 flex flex-col items-start justify-center pl-8 md:pl-16 lg:pl-24">
        <p
          ref={line2Ref}
          className="opacity-0 max-w-md text-left text-xl font-light text-white/90 drop-shadow-md md:text-3xl lg:text-4xl"
        >
          I build digital experiences.
        </p>
      </div>
      {/* Line 3: tagline, right. Animates ~58% → ~92% scroll (in from below, long hold, out up). */}
      <div className="absolute inset-0 flex flex-col items-end justify-center pr-8 md:pr-16 lg:pr-24">
        <p
          ref={line3Ref}
          className="opacity-0 max-w-md text-right text-xl font-light text-white/90 drop-shadow-md md:text-3xl lg:text-4xl"
        >
          Bridging design and engineering.
        </p>
      </div>
    </div>
  );
}
