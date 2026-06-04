"use client";

import { useEffect, useRef } from "react";

type CondorSilhouetteProps = {
  /**
   * "drift" — slow diagonal drift across the viewport on mount (hero moment)
   * "ascend" — flies upward along a curve tied to scroll progress
   * "soar" — stationary, gentle hover with wing tilt (CTA moment)
   */
  mode?: "drift" | "ascend" | "soar";
  className?: string;
  /** Visual size in px (width). Wingspan ratio is preserved. */
  size?: number;
  /** Tint color — defaults to "currentColor" so the parent controls it. */
  color?: string;
  /** Initial delay before animation starts, ms. Default 0. */
  delay?: number;
};

/**
 * Hand-tuned condor silhouette — represents the spirit of Alma Cóndor.
 * Three ritual appearance modes:
 *   - drift: slow horizontal arc across the hero on load
 *   - ascend: scroll-driven flight upward following a curve
 *   - soar: gentle hover with subtle wing tilt in CTA
 *
 * Path is a single, stylized two-wing silhouette designed at viewBox
 * 200x80 to give the proper soaring wingspan ratio (≈2.5:1).
 */
export function CondorSilhouette({
  mode = "drift",
  className = "",
  size = 160,
  color = "currentColor",
  delay = 0,
}: CondorSilhouetteProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Scroll-driven ascend: subscribe to scroll and translate along Bézier curve
  useEffect(() => {
    if (mode !== "ascend") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = wrapperRef.current;
    if (!el) return;

    const parent = el.parentElement;
    if (!parent) return;

    let raf = 0;
    const update = () => {
      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 = section bottom just entered viewport, 1 = section top just left
      const raw = (vh - rect.top) / (rect.height + vh);
      const p = Math.max(0, Math.min(1, raw));

      // Diagonal flight path: bottom-left → top-right with a soft arc.
      // x goes 0%→100% of parent width minus a margin
      // y follows a parabolic arc (down a touch then up) for natural soar
      const x = p * 90; // 0%→90%
      const arc = -Math.sin(p * Math.PI) * 18; // peak dip mid-flight
      const y = (1 - p) * 75 + arc; // 75%→0% with arc

      // Wing tilt subtly inverts at apex
      const tilt = (p - 0.5) * 8;
      el.style.transform = `translate(${x}%, ${y}%) rotate(${tilt}deg)`;
      el.style.opacity = String(Math.min(p * 3, 1) * (1 - Math.max(0, (p - 0.85) * 6)));
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
  }, [mode]);

  // Mode-specific class for CSS-driven animations (drift / soar)
  const animClass =
    mode === "drift"
      ? "condor-drift"
      : mode === "soar"
      ? "condor-soar"
      : "";

  return (
    <div
      ref={wrapperRef}
      className={`pointer-events-none ${animClass} ${className}`}
      style={{
        width: size,
        animationDelay: delay ? `${delay}ms` : undefined,
        willChange: "transform, opacity",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 80"
        width="100%"
        height="auto"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Two-wing soaring condor — single continuous stroke style */}
        <path
          d="
            M 12 40
            C 28 30, 48 22, 68 26
            C 78 28, 86 32, 94 36
            C 96 35, 98 34, 100 34
            C 102 34, 104 35, 106 36
            C 114 32, 122 28, 132 26
            C 152 22, 172 30, 188 40
            M 94 36
            L 96 42
            L 100 44
            L 104 42
            L 106 36
            M 80 27
            C 78 24, 76 22, 74 20
            M 120 27
            C 122 24, 124 22, 126 20
          "
        />
        {/* Body accent — small filled marker for the head */}
        <circle cx="100" cy="40" r="1.6" fill={color} stroke="none" />
      </svg>
    </div>
  );
}
