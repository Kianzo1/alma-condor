"use client";

import { useEffect, useRef } from "react";

type StatCounterProps = {
  /** The display value string — e.g. "1.450", "06", "45" */
  value: string;
  /** Total animation duration in ms. Default 1400. */
  duration?: number;
  className?: string;
};

/**
 * Parses the display format from a value string so it can be
 * reproduced at any intermediate count.
 */
function parseValue(value: string): {
  target: number;
  format: (n: number) => string;
} {
  // Argentinian thousands: "1.450" → target 1450
  const isThousandDot = /^\d{1,3}\.\d{3}$/.test(value);
  // Leading zero: "06" → target 6, always formatted as 2 chars
  const isLeadingZero = /^0\d+$/.test(value);

  const numStr = value.replace(/\./g, "");
  const target = parseInt(numStr, 10);
  const padLen = numStr.length;

  const format = (n: number): string => {
    const r = Math.round(n);
    const s = String(r).padStart(padLen, "0");
    if (isThousandDot && s.length > 3) {
      return s.slice(0, s.length - 3) + "." + s.slice(-3);
    }
    if (isLeadingZero) {
      return String(r).padStart(value.length, "0");
    }
    return String(r);
  };

  return { target, format };
}

/**
 * Animated stat number that counts up from 0 when it enters the viewport.
 * Falls back gracefully to the static value for SSR / reduced-motion.
 */
export function StatCounter({
  value,
  duration = 1400,
  className = "",
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { target, format } = parseValue(value);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || fired.current) return;
        fired.current = true;

        const t0 = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - t0) / duration, 1);
          // easeOutQuart — fast start, smooth finish
          const eased = 1 - (1 - progress) ** 4;
          el.textContent = format(eased * target);
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = value; // lock to exact original string
          }
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  // Initial render shows the final value — good for SSR
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
