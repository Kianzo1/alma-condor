"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxLayerProps = {
  children?: ReactNode;
  /**
   * How far this layer travels relative to scroll.
   * 0 = fixed (no parallax). 0.5 = half scroll speed.
   * Negative = travels upward (foreground feel).
   */
  factor?: number;
  className?: string;
};

/**
 * Lightweight scroll-parallax layer.
 * Uses RAF + passive listener — no layout thrashing.
 * Disabled when prefers-reduced-motion is active.
 */
export function ParallaxLayer({
  children,
  factor = 0.2,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    let raf: number;

    const onScroll = () => {
      if (ticking) return;
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          const y = window.scrollY * factor;
          ref.current.style.transform = `translateY(${y}px)`;
        }
        ticking = false;
      });
      ticking = true;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Set initial position
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [factor]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
