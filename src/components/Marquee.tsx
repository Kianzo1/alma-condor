"use client";

import { useState, type ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  /** Seconds for one full loop. Lower = faster. Default 50. */
  speed?: number;
  /** Pause when mouse is over the track. */
  pauseOnHover?: boolean;
  /** Scroll direction. Default "left". */
  direction?: "left" | "right";
  className?: string;
};

/**
 * Infinite marquee — items doubled client-side for seamless loop.
 * All animation styles are inline so no Tailwind class conflicts.
 */
export function Marquee({
  items,
  speed = 50,
  pauseOnHover = false,
  direction = "left",
  className = "",
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);

  // Double the items so translateX(-50%) aligns exactly with one set's width
  const loop = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `marquee ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          animationDirection: direction === "right" ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        {loop.map((item, i) => (
          <div
            key={i}
            aria-hidden={i >= items.length ? true : undefined}
            style={{
              flexShrink: 0,
              paddingLeft: "2rem",
              paddingRight: "2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
