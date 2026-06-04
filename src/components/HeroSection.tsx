"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CondorMark } from "./CondorMark";
import { Button } from "./Button";

/**
 * Full-viewport sticky hero with scroll-driven image parallax.
 * The image translates upward at 40% of scroll speed, giving
 * the illusion it's "peeling away" as content slides over it.
 *
 * Structure expected by page.tsx:
 *   <div style={{ height: "200dvh", position: "relative" }}>
 *     <HeroSection ... />
 *   </div>
 *   <div style={{ marginTop: "-100dvh", position: "relative", zIndex: 10 }}>
 *     ...rest of content...
 *   </div>
 */
export function HeroSection({ imgSrc }: { imgSrc: string }) {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const img = imgRef.current;
    if (!img) return;

    let raf = 0;

    const tick = () => {
      const y = window.scrollY;
      // Move the image up at 40% of scroll speed.
      // scale(1.15) start gives enough buffer so edges never show.
      img.style.transform = `translateY(${y * 0.4}px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    tick(); // set initial state

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    /* Sticky container — stays pinned at top:0 within its 200dvh parent */
    <div className="sticky top-0 h-[100dvh] overflow-hidden z-0">

      {/* ── Image layer — scales up slightly for parallax headroom ── */}
      <div
        ref={imgRef}
        className="absolute inset-0"
        style={{ willChange: "transform", transform: "translateY(0)" }}
      >
        <Image
          src={imgSrc}
          alt="Alma Cóndor — sendero andino hacia las cumbres nevadas de Mendoza"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-[1.18]"
        />
      </div>

      {/* ── Gradient overlays ── */}
      {/* Bottom vignette — for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060504]/90 via-[#060504]/25 to-[#060504]/20" />
      {/* Left vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060504]/50 via-transparent to-transparent" />
      {/* Top tint for header area */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#060504]/50 to-transparent" />

      {/* ── Condor watermark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <CondorMark size={480} className="text-bone opacity-[0.04]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col justify-end px-7 md:px-14 pt-9 pb-14 md:pb-20">

        {/* Bottom editorial block */}
        <div className="space-y-6">

          {/* Headline — curtain rise */}
          <div className="overflow-hidden space-y-0">
            <div className="hero-curtain-wrap">
              <h1
                className="hero-curtain-1 block font-display text-bone"
                style={{
                  fontSize: "clamp(4.5rem, 13vw, 12.5rem)",
                  lineHeight: 0.86,
                  letterSpacing: "-0.04em",
                }}
              >
                Alma
              </h1>
            </div>
            <div className="hero-curtain-wrap">
              <h1
                className="hero-curtain-2 block font-display italic font-normal text-shimmer"
                style={{
                  fontSize: "clamp(4.5rem, 13vw, 12.5rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.04em",
                }}
              >
                Cóndor
              </h1>
            </div>
          </div>

          {/* Tagline + CTA */}
          <div className="hero-fade-3 flex flex-col gap-7">
            <p className="font-display italic text-xl md:text-2xl text-bone/50 leading-snug">
              Fuego ancestral, terruño sagrado.
            </p>
            <div>
              <Button href="/reservas" variant="gold" size="lg">
                Reservar Mesa
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
