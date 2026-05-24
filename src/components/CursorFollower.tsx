"use client";

import { useEffect, useRef } from "react";

/**
 * Premium gold cursor — replaces the native cursor on pointer devices.
 * Three layers:
 *   1. Ambient glow  — large, soft; heaviest spring lag
 *   2. Ring          — 34 px border circle; medium lag; expands over interactive elements
 *   3. Dot           — 6 px fill; snaps immediately to cursor
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on true pointer devices (no touch-only)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let mX = -300, mY = -300;   // mouse
    let rX = -300, rY = -300;   // ring (lags)
    let gX = -300, gY = -300;   // glow (heaviest lag)
    let expanded = false;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mX = e.clientX;
      mY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = !!el.closest(
        "a, button, [role='button'], label, input, select, textarea, [data-cursor-expand]"
      );
      if (interactive !== expanded) {
        expanded = interactive;
        ringRef.current?.classList.toggle("cursor-ring--expanded", expanded);
      }
    };

    const tick = () => {
      // Dot — immediate snap
      dotRef.current!.style.transform =
        `translate(${mX}px, ${mY}px) translate(-50%, -50%)`;

      // Ring — slight spring lag (0.15 factor)
      rX += (mX - rX) * 0.15;
      rY += (mY - rY) * 0.15;
      ringRef.current!.style.transform =
        `translate(${rX}px, ${rY}px) translate(-50%, -50%)`;

      // Glow — heavy spring lag (0.05 factor)
      gX += (mX - gX) * 0.05;
      gY += (mY - gY) * 0.05;
      glowRef.current!.style.transform =
        `translate(${gX}px, ${gY}px) translate(-50%, -50%)`;

      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    // Hide the native cursor globally
    document.documentElement.classList.add("custom-cursor");
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <>
      {/* Ambient glow — behind everything, very faint */}
      <div ref={glowRef} aria-hidden="true" className="cursor-glow" />
      {/* Ring — sits just above normal content */}
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" />
      {/* Dot — topmost */}
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
    </>
  );
}
