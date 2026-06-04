"use client";

import { useEffect, useState } from "react";

/**
 * ScrollToTop — floating condor button (bottom-right)
 *
 * Appears after 500px of scroll. On hover the condor tilts upward with a
 * spring-bounce (simulating wing thrust). On click scrolls to the top.
 * Uses the same condor SVG path as CondorSilhouette, drawn in copper.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set initial state
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Volver al inicio"
      className={[
        "fixed bottom-8 right-7 z-50",
        "w-[54px] h-[54px] rounded-full",
        "cursor-pointer outline-none",
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-5 pointer-events-none",
      ].join(" ")}
    >
      {/* Outer shell — bezel-style ring */}
      <span
        className={[
          "absolute inset-0 rounded-full",
          "border border-white/[0.08] bg-surface/80 backdrop-blur-md",
          "transition-[border-color,box-shadow] duration-500",
          hovered
            ? "border-gold/35 shadow-[0_0_32px_-6px_rgba(192,104,48,0.45),inset_0_1px_0_rgba(255,255,255,0.07)]"
            : "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        ].join(" ")}
        aria-hidden="true"
      />

      {/* Inner glow — copper warmth on hover */}
      <span
        className="absolute inset-[2px] rounded-full bg-gradient-to-b from-gold/[0.07] to-transparent transition-opacity duration-500"
        style={{ opacity: hovered ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* Condor SVG — tilts upward with spring bounce on hover */}
      <span
        className="relative z-10 flex items-center justify-center w-full h-full"
        aria-hidden="true"
      >
        <span
          style={{
            display: "block",
            /* hover: tilts -18° and lifts -8px.
               enter: spring cubic-bezier overshoots → wing-flap illusion.
               leave: heavy ease-out settles back gently. */
            transform: hovered
              ? "translateY(-7px) rotate(-18deg) scale(1.14)"
              : "translateY(0px) rotate(0deg) scale(1)",
            transition: hovered
              ? "transform 550ms cubic-bezier(0.34,1.56,0.64,1)"   /* spring in */
              : "transform 750ms cubic-bezier(0.16,1,0.3,1)",       /* settle out */
            willChange: "transform",
          }}
        >
          <svg
            viewBox="0 0 200 80"
            width="34"
            height="auto"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            {/* Same path as CondorSilhouette — two-wing soaring shape */}
            <path d="
              M 12 40
              C 28 30, 48 22, 68 26
              C 78 28, 86 32, 94 36
              C 96 35, 98 34, 100 34
              C 102 34, 104 35, 106 36
              C 114 32, 122 28, 132 26
              C 152 22, 172 30, 188 40
              M 94 36 L 96 42 L 100 44 L 104 42 L 106 36
              M 80 27 C 78 24, 76 22, 74 20
              M 120 27 C 122 24, 124 22, 126 20
            " />
            <circle cx="100" cy="40" r="1.6" fill="var(--color-gold)" stroke="none" />
          </svg>
        </span>
      </span>

      {/* Upward-flight hint — tiny line that extends above on hover */}
      <span
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-px bg-gradient-to-t from-gold/50 to-transparent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ height: hovered ? "20px" : "0px" }}
        aria-hidden="true"
      />
    </button>
  );
}
