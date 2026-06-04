"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { CondorMark } from "@/components/CondorMark";

/* The five tiempos — mirrors the Aconcagua ascent stations so the ritual
   reads as one continuous narrative (apertura → cumbre). */
const COURSES = [
  { num: "I",   name: "Apertura",  detail: "Charcutería de altura" },
  { num: "II",  name: "Tierra",    detail: "Cordero al fuego lento" },
  { num: "III", name: "Fuego",     detail: "El corte insignia" },
  { num: "IV",  name: "Maridaje",  detail: "Cava privada · Malbec" },
  { num: "V",   name: "Cumbre",    detail: "Dulce de leche · brasas" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   RitualCurtain — "La Invitación al Ritual"

   Award-style pinned reveal (CSS-Tricks "sliding effects using sticky"):
   while a short pinned stage holds the scene still, scroll advances "time" and
   the Invitación panel sweeps in FROM THE RIGHT, covering the mountain scene
   like a page-change. When the sweep finishes the stage unpins and the page
   keeps scrolling normally into the final CTA.

   Why pinned (not a plain in-flow slide):
   a plain slide fires in the bottom sliver of the screen as the previous
   section unpins, so it's already seated before it's prominent — you never see
   it travel. Pinning freezes the vertical scroll so the horizontal sweep is
   centre-stage and impossible to miss. The pin is short (~80dvh of fuel) and the
   panel is moving the entire time, so it never feels "stuck".

   · <section> 180dvh  → ~80dvh of scroll fuel; inner is sticky.
   · <stage>           → the darkened mountain (continuation of the ascent) so
                          there is NO dead-black gap before the panel arrives.
   · <panel>           → translateX 100% → 0 over the first ~62% of the sweep,
                          then holds; a gold leading edge marks its front.

   100% scroll-position-driven, so it runs under prefers-reduced-motion too
   (this user has it enabled system-wide; gating it would hide the effect).
─────────────────────────────────────────────────────────────────────────────── */
export function RitualCurtain({ imgSrc }: { imgSrc: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panel   = panelRef.current;
    if (!section || !panel) return;

    /* Cinematic ease — slow start, fluid middle, very gentle arrival.
       Feels like a heavy velvet curtain rather than a snapping door. */
    const easeCinematic = (t: number) => {
      // Custom curve: slow in (t^2 phase), then smooth deceleration (1 - (1-t)^3)
      // Blended for a "mass settling" feel at both ends
      if (t < 0.45) return 2.4 * t * t;
      const u = 1 - t;
      return 1 - u * u * u * 2.4;
    };
    let alive = true;

    const tick = () => {
      if (!alive) return;

      const rect  = section.getBoundingClientRect();
      const vh    = window.innerHeight;
      const range = Math.max(1, rect.height - vh);
      /* Pulled up to overlap the ascent's SUMMIT HOLD. While pinned here the
         ascent is still frozen at the cumbre directly behind us, and this panel
         is the only opaque layer — so the sweep is a pure horizontal page-turn
         OVER the held summit: no vertical rise, no dead-black, summit stays in
         view on the left until the panel finishes covering. p = pin progress. */
      const p     = Math.max(0, Math.min(1, -rect.top / range));
      /* 0.82 denominator = sweep spans 82% of total scroll range → much
         slower, more cinematic. Panel holds at destination for the last 18%. */
      const slide = Math.min(1, p / 0.82);
      const eased = easeCinematic(slide);
      panel.style.transform = `translate3d(${(1 - eased) * 100}%,0,0)`;

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => { alive = false; };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10"
      style={{ height: "280dvh", marginTop: "-215dvh" }}
    >
      {/* No opaque background here: while the panel is mid-sweep the held ascent
          summit shows through behind it (the page-turn happens OVER the cumbre). */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden">

        {/* ── PANEL: sweeps in from the right edge ───────────────────────── */}
        <div
          ref={panelRef}
          className="absolute inset-0 will-change-transform"
          style={{ transform: "translate3d(100%,0,0)" }}
        >
          {/* Malbec photography — subtle full-panel ambience behind everything */}
          <div className="absolute inset-y-0 right-0 w-[55%] pointer-events-none hidden md:block overflow-hidden">
            <Image
              src={imgSrc}
              alt=""
              fill
              sizes="55vw"
              loading="lazy"
              decoding="async"
              className="object-cover object-center opacity-[0.16]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0e0303] via-[#0e0303]/65 to-[#0e0303]/10" />
          </div>

          {/* Panel base tint + layered glows for depth */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#1c0505] via-[#0e0303] to-surface" />
          <div className="absolute -top-1/4 right-0 w-[760px] h-[140%] bg-malbec/20 blur-[210px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[440px] h-[420px] bg-gold/[0.05] blur-[200px] pointer-events-none" />
          {/* Giant numeral watermark — "V" for cinco tiempos */}
          <div className="absolute right-[4%] top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block" aria-hidden="true">
            <span className="font-display leading-none text-malbec-glow/[0.045]" style={{ fontSize: "36rem", letterSpacing: "-0.04em" }}>V</span>
          </div>
          {/* Leading edge — copper hairline marking the panel's front */}
          <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-gold/60 to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

                {/* ── LEFT — narrative + the five tiempos as a degustación menu ── */}
                <div className="lg:col-span-7 space-y-7">
                  {/* Eyebrow pill */}
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-malbec-light/25 bg-malbec/10 px-4 py-1.5 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-malbec-glow animate-pulse" />
                    <span className="text-[10px] tracking-[0.32em] uppercase text-malbec-light/85">La Invitación al Ritual</span>
                  </div>

                  {/* Heading */}
                  <h3
                    className="font-display text-bone leading-[0.95] tracking-[-0.03em]"
                    style={{ fontSize: "clamp(2.3rem,5vw,4.4rem)" }}
                  >
                    Sumate al ascenso.
                    <span className="block italic font-normal text-shimmer">
                      Cinco tiempos, una sola noche.
                    </span>
                  </h3>

                  {/* Course list — real tasting menu */}
                  <ul className="border-t border-white/[0.07] max-w-xl">
                    {COURSES.map((c) => (
                      <li
                        key={c.num}
                        className="group/c flex items-center gap-5 py-[0.7rem] border-b border-white/[0.07] transition-colors duration-500 hover:bg-white/[0.02]"
                      >
                        <span className="font-display italic text-gold/75 text-lg w-9 shrink-0 tabular-nums group-hover/c:text-gold transition-colors duration-500">
                          {c.num}
                        </span>
                        <span className="font-display text-bone/90 text-lg md:text-xl leading-none">
                          {c.name}
                        </span>
                        <span className="ml-auto text-[11px] tracking-[0.1em] text-bone/35 font-light hidden sm:block">
                          {c.detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ── RIGHT — premium price card ── */}
                <div className="lg:col-span-5">
                  <div className="bezel-shell">
                    <div className="bezel-core relative overflow-hidden">

                      {/* Photo header */}
                      <div className="relative h-32 md:h-40 overflow-hidden">
                        <Image
                          src={imgSrc} alt="" fill sizes="40vw"
                          loading="lazy" decoding="async"
                          className="object-cover object-center opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/45 to-transparent" />
                        <div className="absolute inset-0 bg-malbec/25 mix-blend-multiply" />
                        <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                          <span className="text-[9.5px] tracking-[0.3em] uppercase text-bone/75">Menú degustación</span>
                          <span className="rounded-full border border-gold/35 bg-surface/40 backdrop-blur-sm px-2.5 py-1 text-[9px] tracking-[0.25em] uppercase text-gold">
                            05 tiempos
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-6 md:p-7 space-y-5">
                        {/* Price + condor */}
                        <div className="flex items-end justify-between">
                          <div>
                            <span className="font-display text-5xl text-bone tabular-nums leading-none">$78.500</span>
                            <div className="text-[10px] tracking-[0.25em] uppercase text-bone/40 mt-2">por persona</div>
                          </div>
                          <CondorMark size={26} className="text-gold/45 mb-1" />
                        </div>

                        {/* Maridaje add-on row */}
                        <div className="flex items-center justify-between rounded-xl bg-white/[0.025] border border-white/[0.06] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                          <span className="text-xs text-bone/60 font-light">Maridaje de cava</span>
                          <span className="font-display text-gold tabular-nums text-lg">+$24.500</span>
                        </div>

                        {/* Notes */}
                        <div className="space-y-1.5 text-[11px] text-bone/40 font-light leading-relaxed">
                          <p>Jueves a sábado · Reserva con 14 días</p>
                          <p>Opción vegetariana disponible</p>
                        </div>

                        <Button href="/reservas" variant="gold" size="lg" className="w-full justify-center">
                          Reservar el Ritual
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Scarcity line */}
                  <p className="text-center text-[10px] tracking-[0.3em] uppercase text-bone/30 mt-4">
                    Cupos limitados — la cumbre es para pocos
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
