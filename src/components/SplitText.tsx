"use client";

import { useRef, useEffect, useState } from "react";

type SplitTextProps = {
  children: string;
  /**
   * "word" — each word slides up independently (default, readable on long text).
   * "char" — each character slides up (dramatic on short labels).
   */
  by?: "word" | "char";
  className?: string;
  /** Base delay before first item animates, ms. Default 0. */
  delay?: number;
  /** Stagger between items, ms. Default: 55ms (word) / 28ms (char). */
  stagger?: number;
  /** Additional class applied to each split unit span. */
  itemClassName?: string;
};

/**
 * Splits text and reveals each word/character with a masked slide-up.
 * The overflow:hidden wrapper masks the translateY, giving a clean
 * "curtain reveal" per unit — the exact effect seen on Awwwards winners.
 *
 * Performance: pure CSS transitions driven by a single IntersectionObserver.
 */
export function SplitText({
  children,
  by = "word",
  className = "",
  delay = 0,
  stagger,
  itemClassName = "",
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  const s = stagger ?? (by === "char" ? 28 : 55);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const units =
    by === "char"
      ? children.split("").map((c) => (c === " " ? " " : c))
      : children.split(" ");

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={children}>
      {units.map((unit, i) => (
        <span
          key={i}
          aria-hidden="true"
          // The overflow:hidden clip masks the translateY slide.
          // leading must be tall enough to hold descenders (g, y, p, j)
          // since overflow-hidden would otherwise clip them.
          className="inline-block overflow-hidden leading-[1.32]"
          style={{ verticalAlign: "bottom", paddingBottom: "0.08em" }}
        >
          <span
            className={`inline-block ${itemClassName}`}
            style={{
              transition: `transform 850ms cubic-bezier(0.23,1,0.32,1) ${delay + i * s}ms, opacity 700ms ease ${delay + i * s}ms`,
              transform: visible ? "translateY(0%)" : "translateY(110%)",
              opacity: visible ? 1 : 0,
            }}
          >
            {unit}
            {/* Space after each word */}
            {by === "word" && i < units.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
