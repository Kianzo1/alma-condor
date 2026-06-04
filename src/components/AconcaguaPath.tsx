"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { CondorMark } from "./CondorMark";

/* ─── Constants ──────────────────────────────────────────────────────────── */
const DASH = 2800; // > actual path arc-length (~2000 SVG units)

const STATIONS = [
  { num: "01", title: "Apertura",  detail: "Charcutería de altura",      x: 150,  y: 945, side: "up"   as const, threshold: 0.04 },
  { num: "02", title: "Tierra",    detail: "Cordero al fuego lento",     x: 530,  y: 760, side: "down" as const, threshold: 0.27 },
  { num: "03", title: "Fuego",     detail: "El corte insignia",          x: 960,  y: 560, side: "up"   as const, threshold: 0.52 },
  { num: "04", title: "Maridaje",  detail: "Cava privada · Malbec 2017", x: 1370, y: 355, side: "down" as const, threshold: 0.76 },
  { num: "05", title: "Cumbre",    detail: "Dulce de leche · brasas",    x: 1750, y: 240, side: "down" as const, threshold: 0.97 },
];

const PATH_D =
  "M 150 945 C 280 880,410 820,530 760 " +
  "S 760 660,960 560 " +
  "S 1190 440,1370 355 " +
  "S 1580 290,1750 240";

/* ─── Web Audio chimes — pentatonic G4 A4 C5 D5 E5 ─────────────────────── */
const FREQS = [392, 440, 523, 587, 659];
function chime(idx: number, ctx: AudioContext) {
  try {
    const f   = FREQS[idx] ?? 440;
    const now = ctx.currentTime;
    const o1  = ctx.createOscillator(); const g1 = ctx.createGain();
    o1.type = "sine"; o1.frequency.value = f;
    g1.gain.setValueAtTime(0, now);
    g1.gain.linearRampToValueAtTime(0.07,    now + 0.04);
    g1.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
    o1.connect(g1); g1.connect(ctx.destination);
    o1.start(now); o1.stop(now + 1.6);
    const o2 = ctx.createOscillator(); const g2 = ctx.createGain();
    o2.type = "sine"; o2.frequency.value = f * 2;
    g2.gain.setValueAtTime(0, now);
    g2.gain.linearRampToValueAtTime(0.025,   now + 0.04);
    g2.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
    o2.connect(g2); g2.connect(ctx.destination);
    o2.start(now); o2.stop(now + 1.0);
  } catch { /* silent */ }
}

/* ─────────────────────────────────────────────────────────────────────────────
   AconcaguaPath — El Ascenso

   Architecture (ALL animation is pure DOM — zero React state in the hot path):
   · <section> 360dvh → creates ~260dvh scroll fuel; inner div is sticky.
   · Path:   classList.remove("ac-path-init") + setAttribute("stroke-dashoffset")
   · Dots:   setAttribute("data-pulsing/data-passed") → CSS keyframes
   · Labels: setAttribute("data-revealed","true") → CSS transitions
              (CSS custom props --i and --d drive per-char stagger delays)

   Why no React state?
   Calling setRevealed() in a RAF triggers a re-render.  During re-render React
   calls old callback-refs with null before calling new ones with the element.
   That null window races with the RAF and silently drops data-pulsing updates.
   Direct DOM manipulation has no re-renders, no null windows, no races.
─────────────────────────────────────────────────────────────────────────────── */
export function AconcaguaPath({
  imgSrc,
  stageSrc,
  introImg,
}: {
  imgSrc: string;
  stageSrc: string;
  /** Optional cinematic gateway image shown OVER the stage at scroll start
      ("¿experiencia única?"), fading out as the path begins to draw. */
  introImg?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLDivElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const introRef   = useRef<HTMLDivElement>(null);
  const pathRef    = useRef<SVGPathElement>(null);
  /* Pre-sized to STATIONS.length so indices never shift across renders */
  const dotsRef    = useRef<(SVGGElement   | null)[]>(STATIONS.map(() => null));
  const labelsRef  = useRef<(HTMLDivElement | null)[]>(STATIONS.map(() => null));
  const audioRef   = useRef<AudioContext | null>(null);

  /* chars only needed for JSX rendering — memo avoids recreating on re-render */
  const chars = useMemo(() => STATIONS.map(s => Array.from(s.title)), []);

  useEffect(() => {
    const section = sectionRef.current;
    const path    = pathRef.current;
    if (!section || !path) return;

    /* NOTE: We deliberately do NOT early-return on prefers-reduced-motion.
       The path draw + label reveals are driven entirely by scroll position —
       the user controls them exactly like a scrollbar, so they're acceptable
       under reduced motion.  The jarring, auto-playing effects (pulse-ring
       scale animation, label translateY/blur) are toned down in globals.css
       via @media (prefers-reduced-motion: reduce). */

    /* ── Hand CSS class off to SVG attributes — no specificity conflict ─── */
    path.classList.remove("ac-path-init");
    path.setAttribute("stroke-dasharray",  String(DASH));
    path.setAttribute("stroke-dashoffset", String(DASH)); // fully hidden

    const hit: boolean[] = STATIONS.map(() => false);
    let alive = true;

    /* Entrance sweep: the whole canvas slides in from the right over the first
       ENTER slice of scroll, then the path-draw phase takes the rest. A dimmed
       mountain "stage" sits behind so there is no dead-black during the sweep.
       ENTER is generous (slow) and easeOutQuint settles gently (smooth). */
    const ENTER    = 0.26;
    /* Path finishes drawing at DRAW_END; the remaining scroll HOLDS the summit
       fully visible. The next section (Invitación) overlaps this hold and sweeps
       in from the right over the held summit — so you reach the cumbre, see it,
       and the page turns horizontally without ever scrolling it away. */
    const DRAW_END = 0.70;
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    /* ── Continuous RAF loop ────────────────────────────────────────────── */
    const tick = () => {
      if (!alive) return;

      const rect  = section.getBoundingClientRect();
      const vh    = window.innerHeight;
      const range = Math.max(1, rect.height - vh);
      /* p: 0 = section top at viewport top, 1 = fully scrolled through */
      const p     = Math.max(0, Math.min(1, -rect.top / range));

      /* ── Entrance: sweep canvas translateX 100% → 0 ─────────────────────── */
      const enter = Math.min(1, p / ENTER);
      const easedEnter = easeInOutCubic(enter);
      if (canvasRef.current)
        canvasRef.current.style.transform = `translate3d(${(1 - easedEnter) * 100}%,0,0)`;
      if (stageRef.current)
        stageRef.current.style.transform = `translate3d(${-easedEnter * 5}%,0,0) scale(1.05)`;

      /* ── Intro gateway: full at p=0, fades + lifts away as the ascent sweeps
            in. Gone (opacity 0) by enter≈0.5 so it never fights the mountain.
            Driven directly here (not CSS) → unaffected by reduced-motion. */
      if (introRef.current) {
        const fade = Math.max(0, 1 - enter * 2);          // 1 → 0 over first half of ENTER
        introRef.current.style.opacity = String(fade);
        introRef.current.style.transform =
          `translate3d(0,${(1 - fade) * -36}px,0) scale(${1 + (1 - fade) * 0.04})`;
        introRef.current.style.pointerEvents = fade < 0.05 ? "none" : "auto";
      }

      /* ── Draw phase: remap progress to the range BETWEEN sweep and hold ─── */
      const pDraw = Math.max(0, Math.min(1, (p - ENTER) / (DRAW_END - ENTER)));

      /* Path draw — SVG attribute, universally supported */
      path.setAttribute("stroke-dashoffset", String(DASH * (1 - pDraw)));

      /* Station reveals */
      STATIONS.forEach((s, i) => {
        if (pDraw >= s.threshold && !hit[i]) {
          /* ── Arrive at station ─────────────────────────────────────────── */
          hit[i] = true;

          /* Dot: restart CSS pulse animation */
          const g = dotsRef.current[i];
          if (g) {
            g.removeAttribute("data-pulsing");
            void g.getBoundingClientRect(); // force reflow → animation restarts
            g.setAttribute("data-pulsing", "true");
            g.setAttribute("data-passed",  "true");
          }

          /* Label: CSS transitions fire when attribute is added */
          labelsRef.current[i]?.setAttribute("data-revealed", "true");

          /* Chime */
          if (!audioRef.current) {
            try { audioRef.current = new AudioContext(); } catch { /* ok */ }
          }
          if (audioRef.current) {
            if (audioRef.current.state === "suspended")
              audioRef.current.resume().catch(() => {});
            chime(i, audioRef.current);
          }

        } else if (hit[i] && pDraw < s.threshold - 0.04) {
          /* ── Scrolled back past station ──────────────────────────────── */
          hit[i] = false;
          dotsRef.current[i]?.removeAttribute("data-pulsing");
          dotsRef.current[i]?.removeAttribute("data-passed");
          labelsRef.current[i]?.removeAttribute("data-revealed");
        }
      });

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => { alive = false; };
  }, []);

  /* ── Render ─────────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      className="relative bg-surface"
      style={{ height: "360dvh" }}
    >
      {/* Sticky canvas — pinned for the full scroll range */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-surface">

        {/* ── STAGE: a DIFFERENT dimmed photo behind the sweep (no dead-black,
                 and no duplicate of the canvas image) ───────────────────── */}
        <div ref={stageRef} className="absolute inset-0 will-change-transform">
          <Image
            src={stageSrc} alt="" fill sizes="100vw"
            loading="lazy" decoding="async"
            className="object-cover object-center opacity-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/55 to-surface/90" />
          <div className="absolute inset-0 bg-gradient-to-l from-surface/70 via-transparent to-surface/30" />
        </div>

        {/* ── INTRO GATEWAY: "¿experiencia única?" over the grape vineyard.
                Full-screen at scroll start, fades + lifts as the ascent sweeps
                in (opacity/transform set by the RAF above). ───────────────── */}
        {introImg && (
          <div
            ref={introRef}
            className="absolute inset-0 will-change-[opacity,transform]"
            style={{ opacity: 1 }}
          >
            {/* Vineyard backdrop — brighter, the grapes read clearly */}
            <Image
              src={introImg}
              alt="Uvas Malbec — la antesala del ritual"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-[1.02] opacity-[0.92]"
            />
            {/* Soft dark veil — just enough for text legibility */}
            <div className="absolute inset-0 bg-[#060504]/20" />
            {/* Legibility gradients (bottom-weighted) + warm tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/45 to-surface/5" />
            <div className="absolute inset-0 bg-gradient-to-b from-surface/35 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-malbec/12 mix-blend-multiply" />

            {/* Bottom-anchored content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 md:pb-32 px-6">
              <div className="text-center max-w-[960px] mx-auto w-full space-y-9">

                {/* Brand mark */}
                <div className="flex items-center justify-center gap-5">
                  <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/40" />
                  <CondorMark size={22} className="text-gold/60" />
                  <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/40" />
                </div>

                {/* Pre-question */}
                <p
                  className="font-display text-bone/70 leading-snug tracking-[-0.01em]"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
                >
                  ¿Listo para una
                </p>

                {/* Hero line — shimmer italic */}
                <h2
                  className="font-display italic font-normal text-shimmer leading-[0.88] tracking-[-0.045em] -mt-2"
                  style={{ fontSize: "clamp(4rem, 12vw, 11rem)" }}
                >
                  experiencia
                  <br />
                  única?
                </h2>

                {/* Ridge */}
                <div className="ridge w-20 mx-auto opacity-60" />

                {/* Scroll CTA */}
                <div className="space-y-5">
                  <p
                    className="font-display italic text-bone/55 tracking-[0.02em]"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 1.55rem)" }}
                  >
                    Scrolleá para vivirla.
                  </p>
                  <div className="flex flex-col items-center gap-2.5">
                    <span className="text-[8px] tracking-[0.45em] uppercase text-bone/30">
                      descender
                    </span>
                    <span className="w-px h-14 bg-gradient-to-b from-gold/60 to-transparent scroll-indicator-line" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ── CANVAS: the full ascent scene — sweeps in from the right ────── */}
        <div
          ref={canvasRef}
          className="absolute inset-0 will-change-transform"
          style={{ transform: "translate3d(100%,0,0)" }}
        >

        {/* Background image */}
        <Image
          src={imgSrc} alt="" fill sizes="100vw"
          loading="lazy" decoding="async"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-surface/20 to-surface/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/70 via-transparent to-surface/40" />

        {/* Header */}
        <div className="absolute top-10 md:top-16 left-8 md:left-16 z-10 max-w-md">
          <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-gold mb-4">
            <span className="w-8 h-px bg-gold/60" />
            <span>El Ascenso</span>
          </div>
          <h2
            className="font-display text-bone leading-none tracking-[-0.03em] pb-1"
            style={{ fontSize: "clamp(1.9rem,4.4vw,3.6rem)" }}
          >
            Cinco tiempos.
            <br />
            <span className="italic font-normal text-shimmer">Una cumbre.</span>
          </h2>
          <p className="font-display italic text-bone/50 text-sm md:text-base mt-4 max-w-xs leading-snug">
            Cada plato es una estación. Un paso más cerca del cielo.
          </p>
        </div>

        {/* Altitude badge */}
        <div className="absolute top-10 md:top-16 right-8 md:right-16 z-10 text-right">
          <div className="text-[10px] tracking-[0.3em] uppercase text-bone/40">Aconcagua</div>
          <div className="font-display text-3xl md:text-5xl text-bone/85 tabular-nums leading-none mt-1">
            6.961<span className="text-gold text-base align-top ml-1">m</span>
          </div>
          <div className="text-[9px] tracking-[0.25em] uppercase text-bone/30 mt-1">cumbre de los Andes</div>
        </div>

        {/* ── SVG ─────────────────────────────────────────────────────────── */}
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            {/* Copper gradient — matches the brand palette (#C06830 → #D4804A) */}
            <linearGradient id="acGrad" x1="0" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#A85520" stopOpacity="0.2" />
              <stop offset="50%"  stopColor="#C06830" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D4804A" stopOpacity="1"   />
            </linearGradient>
            <filter id="acGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ghost track — always visible, very faint */}
          <path
            d={PATH_D}
            stroke="#C06830"
            strokeOpacity="0.08"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
          />

          {/*
           * Animated path.
           * .ac-path-init hides it via CSS (stroke-dashoffset:2800).
           * useEffect removes the class and takes over with setAttribute().
           */}
          <path
            ref={pathRef}
            d={PATH_D}
            className="ac-path-init"
            stroke="url(#acGrad)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            filter="url(#acGlow)"
          />

          {/* Station dots — CSS animations keyed on data-pulsing / data-passed */}
          {STATIONS.map((s, i) => (
            <g
              key={s.num}
              ref={el => { dotsRef.current[i] = el; }}
              className={`station-dot${i === 4 ? " station-dot--summit" : ""}`}
              style={{ transform: `translate(${s.x}px,${s.y}px)` }}
            >
              <circle className="station-pulse-ring"
                cx="0" cy="0" r="4" fill="none" stroke="#D4804A" strokeWidth="1.4" />
              <circle className="station-pulse-ring station-pulse-ring--inner"
                cx="0" cy="0" r="4" fill="none" stroke="#C06830" strokeWidth="1.1" />
              <circle className="station-halo"
                cx="0" cy="0" r="12" fill="none" stroke="#C06830" strokeOpacity="0.2" />
              <circle className="station-core"
                cx="0" cy="0" r="4.5" fill="#D4804A" />
              {i === 4 && (<>
                <circle cx="0" cy="0" r="22" fill="none" stroke="#D4804A" strokeOpacity="0.30" strokeWidth="0.9" />
                <circle cx="0" cy="0" r="12" fill="none" stroke="#D4804A" strokeOpacity="0.55" strokeWidth="1.0" />
              </>)}
            </g>
          ))}
        </svg>

        {/* ── Station labels — pure CSS transitions, no React state ──────── */}
        {STATIONS.map((s, i) => {
          const isUp     = s.side === "up";
          const isSummit = i === 4;
          const tChars   = chars[i];

          return (
            <div
              key={s.num}
              /*
               * data-revealed is toggled by the RAF via setAttribute().
               * CSS in globals.css reads this attribute and transitions
               * all child elements (.station-connector, .station-eyebrow,
               * .station-char, .station-detail) into view.
               * --d cascades to .station-detail for its stagger delay.
               */
              ref={el => { labelsRef.current[i] = el; }}
              className="absolute pointer-events-none select-none"
              style={{
                left: `${(s.x / 1920) * 100}%`,
                top:  `${(s.y / 1080) * 100}%`,
                transform: "translate(-50%,-50%)",
                /* --d = char count → used by .station-detail transition-delay */
                "--d": tChars.length,
              } as React.CSSProperties}
            >
              {/* Hairline connector */}
              <div
                className="station-connector absolute left-1/2 -translate-x-1/2 w-px"
                style={{
                  height: 48,
                  top: isUp ? -48 : 14,
                  background: "linear-gradient(to bottom,transparent,rgba(212,175,55,.5),transparent)",
                }}
              />

              {/* Text block */}
              <div
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
                style={{ top: isUp ? -130 : 28 }}
              >
                {/* Eyebrow */}
                <div className="station-eyebrow mb-[6px]">
                  <span className={`text-[9px] tracking-[.38em] uppercase font-semibold ${isSummit ? "text-gold" : "text-gold/80"}`}>
                    Tiempo {s.num}{isSummit ? " · Cumbre" : ""}
                  </span>
                </div>

                {/* Title — character stagger via --i CSS custom property */}
                <div
                  className={`font-display italic leading-none tracking-[-0.01em] pb-0.5 ${isSummit ? "text-bone" : "text-bone/95"}`}
                  style={{ fontSize: "clamp(1.5rem,2.5vw,2.4rem)" }}
                >
                  {tChars.map((ch, idx) => (
                    <span
                      key={idx}
                      className="station-char"
                      /* --i drives calc(var(--i)*70ms+180ms) in CSS */
                      style={{ "--i": idx } as React.CSSProperties}
                    >
                      {ch === " " ? " " : ch}
                    </span>
                  ))}
                </div>

                {/* Detail — fires after all chars via --d on parent */}
                <div
                  className="station-detail text-bone/60 mt-1.5 font-light"
                  style={{ fontSize: "clamp(.75rem,.9vw,.9rem)" }}
                >
                  {s.detail}
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom scroll hint */}
        <div className="absolute bottom-6 left-8 md:left-16 right-8 md:right-16 flex items-end justify-between z-10">
          <div className="flex items-center gap-3 text-[9px] tracking-[.28em] uppercase text-bone/35">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/50 animate-pulse" />
            <span>Scrolleá · El camino al cielo</span>
          </div>
          <div className="text-[9px] tracking-[.28em] uppercase text-bone/30 hidden md:block">
            Curado por Chef Mateo Salvatierra
          </div>
        </div>

        </div>{/* /canvas */}
      </div>
    </section>
  );
}
