"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";

type VelocityHeadingProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Max skew in degrees applied at peak scroll velocity. Default 5. */
  maxSkew?: number;
  /** Max horizontal compress factor (1 - amount). Default 0.06 (6%). */
  maxCompress?: number;
};

/**
 * Wraps a heading and applies a velocity-linked skewY + scaleX distortion as
 * the user scrolls. When scroll velocity is high, the text leans into the
 * direction of travel — evokes the feeling of flight without literal pictures.
 *
 * Performance: single RAF loop, computes velocity from scrollY deltas,
 * relaxes back to 0 with exponential decay. GPU-only transforms.
 */
export function VelocityHeading({
  children,
  as: Tag = "h2",
  className = "",
  maxSkew = 5,
  maxCompress = 0.06,
}: VelocityHeadingProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let velocity = 0; // px per ms — clamped to [-2, 2]
    let raf = 0;
    let active = false;

    const tick = (now: number) => {
      // Exponential decay toward 0
      velocity *= 0.92;

      const el = ref.current;
      if (el) {
        // Map velocity to skew/scale. Velocity range roughly [-2, 2].
        const v = Math.max(-2, Math.min(2, velocity));
        const skew = (v / 2) * maxSkew; // degrees
        const compress = 1 - (Math.abs(v) / 2) * maxCompress;
        el.style.transform = `skewY(${skew}deg) scaleX(${compress.toFixed(4)})`;
      }

      if (Math.abs(velocity) > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        active = false;
        if (ref.current) ref.current.style.transform = "";
      }
      void now;
    };

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const dy = window.scrollY - lastY;
      // Snap a fresh velocity sample (px/ms); blend with previous
      const sample = dy / dt;
      velocity = velocity * 0.4 + sample * 0.6;
      lastT = now;
      lastY = window.scrollY;

      if (!active) {
        active = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [maxSkew, maxCompress]);

  // Strongly typed ref handoff
  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  return (
    <Tag
      ref={setRef}
      className={className}
      style={{
        display: "block",
        transformOrigin: "center center",
        willChange: "transform",
        transition: "transform 280ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </Tag>
  );
}
