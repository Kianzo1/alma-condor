"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  /**
   * "single"  — blur + fade + translateY on the element (default)
   * "stagger" — cascades the single effect across direct children
   * "clip"    — cinematic curtain-wipe from bottom (clip-path reveal)
   */
  mode?: "single" | "stagger" | "clip";
  /**
   * Slide direction for mode="single".
   * "up" (default) | "left" | "right" | "scale"
   */
  direction?: "up" | "left" | "right" | "scale";
  /** Once visible, stay visible (default true). */
  once?: boolean;
  className?: string;
  as?: ElementType;
  /** Distance from viewport edge before triggering. Default '-80px' bottom. */
  rootMargin?: string;
};

/**
 * IntersectionObserver-driven scroll reveal.
 * Pairs with [data-reveal] / [data-reveal-stagger] CSS in globals.css.
 *
 * Performance: uses GPU-friendly transform + opacity + blur only.
 * No window scroll listeners.
 */
export function Reveal({
  children,
  mode = "single",
  direction = "up",
  once = true,
  className,
  as: Tag = "div",
  rootMargin = "0px 0px -80px 0px",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin, threshold: 0.05 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [once, rootMargin]);

  // Build the data attribute object for this reveal mode/direction
  const dataAttrs: Record<string, string> =
    mode === "stagger"
      ? { "data-reveal-stagger": "" }
      : mode === "clip"
      ? { "data-reveal-img": "" }
      // For "single": pass direction as value so CSS can target [data-reveal="left"] etc.
      // Empty string = default "up" (translateY)
      : { "data-reveal": direction === "up" ? "" : direction };

  return (
    <Tag
      ref={ref}
      {...dataAttrs}
      data-visible={visible ? "true" : "false"}
      className={className}
    >
      {children}
    </Tag>
  );
}
