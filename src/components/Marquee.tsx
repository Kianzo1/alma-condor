"use client";

import { type ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  /**
   * Seconds for one full loop. Default 60.
   * Higher = slower.
   */
  speed?: number;
  /** Scroll direction. Default "left". */
  direction?: "left" | "right";
  className?: string;
};

/**
 * Infinite marquee — pure CSS animation, zero JS overhead.
 * Items are doubled so translateX(-50%) aligns with exactly one set width.
 * Direction uses two separate @keyframes (marqueeLeft / marqueeRight)
 * defined in globals.css to avoid any React style-shorthand conflicts.
 */
export function Marquee({
  items,
  speed = 60,
  direction = "left",
  className = "",
}: MarqueeProps) {
  const loop = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div
        className={`marquee-track ${
          direction === "right" ? "marquee-track--right" : "marquee-track--left"
        }`}
        style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
      >
        {loop.map((item, i) => (
          <div
            key={i}
            aria-hidden={i >= items.length ? true : undefined}
            style={{
              flexShrink: 0,
              paddingLeft: "3rem",
              paddingRight: "3rem",
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
