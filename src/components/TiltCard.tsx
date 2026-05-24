"use client";

import { useRef, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Default 7. */
  intensity?: number;
};

/**
 * 3-D perspective tilt on hover — card rotates towards the cursor.
 * Only activates on true pointer (hover: hover) devices.
 * Uses RAF batching to avoid layout thrashing.
 */
export function TiltCard({
  children,
  className = "",
  intensity = 7,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;   // -0.5 → 0.5
      const y = (e.clientY - r.top) / r.height - 0.5;   // -0.5 → 0.5
      el.style.transition = "transform 80ms linear";
      el.style.transform = [
        "perspective(900px)",
        `rotateX(${-y * intensity * 2}deg)`,
        `rotateY(${x * intensity * 2}deg)`,
        "scale3d(1.015, 1.015, 1.015)",
      ].join(" ");
    });
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(rafRef.current);
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 650ms cubic-bezier(0.23, 1, 0.32, 1)";
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
