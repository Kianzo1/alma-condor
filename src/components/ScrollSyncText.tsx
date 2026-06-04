"use client";

import { useRef, useEffect } from "react";
import type { ReactNode } from "react";

type ScrollSyncTextProps = {
  children: ReactNode;
  /** Direction the text travels as you scroll DOWN. Default "left". */
  direction?: "left" | "right";
  /** Travel range in vw units. Default 20. */
  magnitude?: number;
  className?: string;
};

/**
 * Scroll-synced horizontal text strip.
 * As the user scrolls vertically through the section, the text
 * translates horizontally — a staple of Awwwards-winning sites in 2024.
 *
 * Uses passive RAF scroll listener — zero layout thrash.
 */
export function ScrollSyncText({
  children,
  direction = "left",
  magnitude = 20,
  className = "",
}: ScrollSyncTextProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let raf = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 = section bottom entering viewport bottom, 1 = section top leaving viewport top
      const raw = (vh - rect.top) / (rect.height + vh);
      const p = Math.max(0, Math.min(1, raw));
      // Center at p=0.5: move symmetrically around 0
      const offset = (p - 0.5) * magnitude * window.innerWidth * 0.01;
      const sign = direction === "right" ? 1 : -1;
      track.style.transform = `translateX(${sign * offset}px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [direction, magnitude]);

  return (
    <div ref={sectionRef} className={`overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="whitespace-nowrap select-none"
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );
}
