"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Global smooth scroll — injects Lenis into the RAF loop.
 * Render once in layout; returns null (no DOM output).
 *
 * Emil: CSS animations run off-main-thread — buttery smooth even under load.
 * Lenis handles the scroll interpolation so every interaction
 * feels expensive without extra animation code.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      // Apple-style deceleration curve — fast start, graceful settle
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let raf: number;

    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
