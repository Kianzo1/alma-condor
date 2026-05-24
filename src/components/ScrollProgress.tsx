"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed gold hairline at the top of the viewport that scales
 * horizontally with scroll progress. Uses requestAnimationFrame
 * to coalesce scroll events into a single CSS variable write
 * per frame — hardware-accelerated via transform: scaleX().
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        el.style.setProperty("--progress", `${p}`);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="scroll-progress w-full"
      style={{ ["--progress" as never]: 0 }}
      aria-hidden="true"
    />
  );
}
