"use client";

/**
 * CursorTrail — spawns configurable images along the mouse path.
 *
 * Adapted from https://codepen.io/GreenSock/pen/WbbEGmp
 * Uses GSAP ticker + mousemove. Disabled on touch devices and when no images configured.
 */

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { cursorTrail, getCursorTrailImages } from "../config/cursor-trail";

const images = getCursorTrailImages();
const { gap, size, zIndex } = cursorTrail;

function playAnimation(shape: HTMLElement): void {
  const tl = gsap.timeline();
  tl.from(shape, {
    opacity: 0,
    scale: 0,
    ease: "elastic.out(2,5)",
  })
  .to(
    shape,
    {
      rotation: gsap.utils.random(-360, 360),
      y: "120vh",
      scale: 0.5,
      ease: "back.in(0.1)",
      duration: 2,
    },
    "<"
  );
}

export function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images.length === 0 || !containerRef.current) return;

    const isTouch =
      "ontouchstart" in window ||
      !window.matchMedia("(pointer: fine)").matches;
    if (isTouch) return;

    const container = containerRef.current;
    const flairElements: HTMLImageElement[] = [];

    images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src.startsWith("/") ? src : `/${src}`;
      img.alt = "";
      img.className = "cursor-trail-img";
      img.style.cssText = `
        position: fixed;
        opacity: 0;
        width: ${size}px !important;
        height: ${size}px !important;
        max-width: ${size}px !important;
        max-height: ${size}px !important;
        min-width: 0;
        object-fit: contain;
        pointer-events: none;
      `;
      container.appendChild(img);
      flairElements.push(img);
    });

    let index = 0;
    const wrapper = gsap.utils.wrap(0, flairElements.length);
    gsap.defaults({ duration: 1 });

    const mousePos = { x: 0, y: 0 };
    const lastMousePos = { ...mousePos };
    const cachedMousePos = { x: 0, y: 0 };

    const handleMousemove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    function animateImage(): void {
      const wrappedIndex = wrapper(index);
      const img = flairElements[wrappedIndex];
      gsap.killTweensOf(img);
      gsap.set(img, { clearProps: "transform,opacity,left,top,xPercent,yPercent" });
      gsap.set(img, {
        opacity: 1,
        left: mousePos.x,
        top: mousePos.y,
        xPercent: -50,
        yPercent: -50,
      });
      playAnimation(img);
      index++;
    }

    function imageTrail(): void {
      const travelDistance = Math.hypot(
        lastMousePos.x - mousePos.x,
        lastMousePos.y - mousePos.y
      );

      cachedMousePos.x = gsap.utils.interpolate(
        cachedMousePos.x ?? mousePos.x,
        mousePos.x,
        0.1
      );
      cachedMousePos.y = gsap.utils.interpolate(
        cachedMousePos.y ?? mousePos.y,
        mousePos.y,
        0.1
      );

      if (travelDistance > gap) {
        animateImage();
        lastMousePos.x = mousePos.x;
        lastMousePos.y = mousePos.y;
      }
    }

    window.addEventListener("mousemove", handleMousemove);
    gsap.ticker.add(imageTrail);

    return () => {
      window.removeEventListener("mousemove", handleMousemove);
      gsap.ticker.remove(imageTrail);
      flairElements.forEach((img) => gsap.killTweensOf(img));
      flairElements.forEach((img) => img.remove());
    };
  }, []);

  if (images.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex }}
      aria-hidden
    />
  );
}
