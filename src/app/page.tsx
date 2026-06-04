import Image from "next/image";
import { Button } from "@/components/Button";
import { CondorMark } from "@/components/CondorMark";
import { Reveal } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";
import { TiltCard } from "@/components/TiltCard";
import { ParallaxLayer } from "@/components/ParallaxLayer";
import { HeroSection } from "@/components/HeroSection";
import { SplitText } from "@/components/SplitText";
import { AconcaguaPath } from "@/components/AconcaguaPath";
import { RitualCurtain } from "@/components/RitualCurtain";
import { CondorSilhouette } from "@/components/CondorSilhouette";
import { VelocityHeading } from "@/components/VelocityHeading";

// ── Local high-res photography (public/images/) ──────────────────────────────
/** Aconcagua peak — pure dominance, the king of the Andes */
const IMG_HERO    = "/images/inicio2.jpg";
/** Snow path with wooden poles — secondary editorial break */
const IMG_PATH    = "/images/inicio1.jpg";
/** Editorial beef flat-lay on dark stone with rosemary and garlic */
const IMG_HEARTH  = "/images/comida1.jpg";
/** Two premium cuts (ribeye + tenderloin) on slate stone */
const IMG_RIBEYE  = "/images/comida2.jpg";
/** Wine glasses bokeh — bokeh DOF from above */
const IMG_CELLAR  = "/images/vino1.jpg";
/** Guanacos on Andean ridge — pure condor spirit */
const IMG_GUANACO = "/images/deco1.jpg";
/** Ruta 7 into the Andes — low angle leading lines */
const IMG_RUTA7   = "/images/deco2.jpg";
/** Malbec grapes — dark dramatic close-up, high-res (Unsplash) */
const IMG_GRAPES  = "/images/vino2.jpg";
/** Uva — fotos del usuario para la antesala del Ascenso */
const IMG_UVA     = "/images/uva.jpg";
const IMG_UVA2    = "/images/uva2.jpg";
/** Wine glass with grapes on dark rustic surface — moody ritual */
const IMG_MALBEC  = "/images/deco4.jpg";
/** Aconcagua valley under cloudy sky — epic scale */
const IMG_VALLEY  = "/images/deco5.jpg";
/** Rustic meat board — quebracho platter */
const IMG_BOARD   = "/images/comida3.jpg";

const PILLARS = [
  "El Fuego", "El Cóndor", "La Uva", "El Terruño",
  "El Ritual", "La Cumbre", "El Quebracho", "Mendoza",
];

export default function HomePage() {
  return (
    <>
      {/* ================================================================
          01 · HERO STICKY — full-bleed, image slides up on scroll
          200dvh wrapper = hero stays pinned while content reveals.
      ================================================================ */}
      <div style={{ height: "200dvh", position: "relative", zIndex: 0 }}>
        <HeroSection imgSrc={IMG_HERO} />
        {/* ── Cóndor #1 (RITUAL DE LLEGADA) — drift across hero on load ── */}
        <div className="pointer-events-none fixed inset-x-0 top-0 h-[100dvh] overflow-hidden z-[5]">
          <div className="absolute top-[32%] left-0 w-full" style={{ ["--condor-delay" as string]: "1800ms" }}>
            <CondorSilhouette mode="drift" size={130} color="rgba(235,228,221,0.45)" className="ml-[-15vw]" />
          </div>
        </div>
      </div>

      {/* Everything below slides OVER the sticky hero */}
      <div style={{ marginTop: "-100dvh", position: "relative", zIndex: 10 }}>

        {/* ================================================================
            02 · MANIFESTO — compact editorial statement
            Tightened: smaller fonts, reduced padding, dual-column layout
        ================================================================ */}
        <section className="relative overflow-hidden py-20 md:py-28 bg-surface">
          {/* Ambient guanaco photo — very subtle, edge-pinned right */}
          <div className="absolute inset-y-0 right-0 w-[36%] pointer-events-none hidden lg:block">
            <Image
              src={IMG_GUANACO}
              alt=""
              fill
              sizes="36vw"
              loading="lazy"
              decoding="async"
              className="object-cover object-center opacity-[0.07] grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-surface/30" />
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-malbec/10 blur-[200px] rounded-full" />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">

              {/* Left: eyebrow + tight quote */}
              <div className="md:col-span-7 space-y-6">
                <Reveal>
                  <div className="eyebrow text-[10px]">El Manifiesto</div>
                  <blockquote
                    className="font-display italic text-bone leading-[1.22] mt-5 pb-2"
                    style={{ fontSize: "clamp(1.7rem,3.8vw,3.2rem)", letterSpacing: "-0.02em" }}
                  >
                    <span className="text-gold/35 text-[0.5em] align-top leading-none mr-1">&ldquo;</span>
                    <SplitText by="word" delay={80} stagger={55}>
                      El fuego no cocina.
                    </SplitText>{" "}
                    <span className="text-shimmer">
                      <SplitText by="word" delay={380} stagger={55}>
                        El fuego transforma.
                      </SplitText>
                    </span>{" "}
                    <SplitText by="word" delay={680} stagger={50}>
                      Y nosotros somos sus guardianes.
                    </SplitText>
                    <span className="text-gold/35 text-[0.5em] align-super leading-none ml-1">&rdquo;</span>
                  </blockquote>
                </Reveal>
              </div>

              {/* Right: body context */}
              <Reveal as="div" mode="single" direction="left" className="md:col-span-5 space-y-5">
                <div className="ridge w-16" />
                <p className="font-body font-light text-sm md:text-base text-bone/50 leading-relaxed max-w-md">
                  A la sombra del Aconcagua, donde el aire se vuelve fino y el sol
                  quema sin piedad, nació Alma Cóndor. Una sola obsesión:
                  honrar el quebracho, el corte, y el terruño.
                </p>
                <div className="flex items-center gap-3 text-[9.5px] tracking-[0.3em] uppercase text-gold/65">
                  <span className="w-6 h-px bg-gold/55" />
                  <span>Mateo Salvatierra · Chef</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================================================
            CINEMATIC IMAGE BREAK — snow path full-bleed with parallax
            Editorial pause between manifesto and craft sections
            + Cóndor #2 (RITUAL DE INVOCACIÓN) drifting top-right
        ================================================================ */}
        <section className="relative h-[55dvh] md:h-[70dvh] overflow-hidden">
          <Image
            src={IMG_PATH}
            alt="Sendero andino hacia las cumbres de Mendoza"
            fill
            sizes="100vw"
            loading="lazy"
            decoding="async"
            className="object-cover object-center"
          />
          {/* Heavy duotone treatment — keeps editorial coherence */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/35 to-surface/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/40 via-transparent to-surface/40" />

          {/* Cóndor #2 — RITUAL DE INVOCACIÓN. A second silhouette drifts
              right-to-left across the sky of the snow path, slower, smaller. */}
          <div className="absolute top-[18%] inset-x-0 pointer-events-none">
            <div className="relative w-full h-0">
              <CondorSilhouette
                mode="drift"
                size={95}
                color="rgba(235,228,221,0.45)"
                className="absolute"
                delay={400}
              />
            </div>
          </div>

          {/* Floating quote — bottom-left anchored */}
          <div className="absolute inset-0 flex items-end px-8 md:px-16 pb-16 md:pb-24">
            <Reveal mode="single" direction="up" className="max-w-2xl space-y-4">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-gold/80">
                <span className="w-8 h-px bg-gold/60" />
                <span>El Camino</span>
              </div>
              <VelocityHeading
                as="p"
                className="font-display italic text-bone/95 leading-[1.05]"
                maxSkew={4}
                maxCompress={0.05}
              >
                <span style={{ fontSize: "clamp(1.8rem,4.5vw,3.6rem)", letterSpacing: "-0.02em" }} className="block">
                  Donde el silencio del Aconcagua
                  <br />
                  <span className="text-gold/85">se vuelve el sabor del fuego.</span>
                </span>
              </VelocityHeading>
            </Reveal>
          </div>

          {/* Bottom hairline */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </section>

        {/* Minimalist gold hairline divider — replaces the loud ScrollSyncText.
            A thin shimmering line + a small condor mark = visual pause. */}
        <div className="relative bg-surface py-10 overflow-hidden">
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
          <div className="relative z-10 flex items-center justify-center">
            <div className="px-6 bg-surface flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-gold/55">
              <span className="w-6 h-px bg-gold/40" />
              <CondorMark size={16} className="text-gold/65" />
              <span>El Camino</span>
              <span className="w-6 h-px bg-gold/40" />
            </div>
          </div>
        </div>

        {/* ================================================================
            03 · LA ALQUIMIA — full-bleed image with text overlay
        ================================================================ */}
        <section className="relative overflow-hidden bg-surface">
          <div className="relative h-[78dvh] md:h-[90dvh]">
            {/* clip-path section entry — box unfolds in on scroll */}
            <Reveal mode="clip" className="absolute inset-0">
              <Image
                src={IMG_HEARTH}
                alt="Selección de cortes sobre piedra oscura — Los mejores cortes de Alma Cóndor"
                fill
                sizes="100vw"
                loading="lazy"
                decoding="async"
                className="object-cover object-center"
              />
            </Reveal>

            <div className="absolute inset-0 bg-gradient-to-r from-surface/92 via-surface/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/75 via-transparent to-surface/25" />

            {/* Text block */}
            <div className="absolute inset-y-0 left-0 flex items-center px-8 md:px-16 max-w-[600px]">
              <Reveal mode="single" direction="right" className="space-y-7">
                <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-gold">
                  <span className="w-8 h-px bg-gold/50" />
                  <span>La Alquimia del Fuego</span>
                </div>

                <VelocityHeading
                  as="h2"
                  className="font-display text-bone tracking-[-0.03em] leading-[0.88]"
                  maxSkew={4}
                  maxCompress={0.05}
                >
                  <span style={{ fontSize: "clamp(2.8rem,7.5vw,6.5rem)" }} className="block">
                    Donde el calor
                    <br />
                    <span data-cinema-reveal className="inline-block italic font-normal text-shimmer">se vuelve arte.</span>
                  </span>
                </VelocityHeading>

                <div className="ridge w-20" />
                <p className="font-display italic text-lg md:text-xl text-bone/60 leading-relaxed max-w-sm">
                  Quebracho colorado. 850°C. Paciencia de siglos.
                </p>
                <p className="text-sm md:text-base text-bone/40 font-light leading-loose max-w-xs">
                  45 días en cámara seca antes de encontrarse con la llama.
                  El resultado no es un plato — es una memoria.
                </p>
                <Button href="/menu" variant="ghost" size="lg">La Carta del Ritual</Button>
              </Reveal>
            </div>

            {/* Temperature badge */}
            <div className="absolute bottom-8 right-8 md:right-14 hidden md:block">
              <Reveal mode="single" direction="left">
                <div className="bezel-shell">
                  <div className="bezel-core px-7 py-8 text-center space-y-1">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-bone/35 block">Temperatura</span>
                    <span className="font-display text-5xl text-gold leading-none block">850°</span>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-bone/35 block">Quebracho</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="absolute bottom-8 left-8 md:left-16 flex items-center gap-4">
              <span className="w-8 h-px bg-gold/25" />
              <span className="font-display italic text-sm text-bone/35">Chef Mateo Salvatierra</span>
            </div>
          </div>
        </section>

        {/* ================================================================
            04 · STATS — three oversized animated numbers
            data-scroll-reveal uses CSS Scroll-Driven (Chrome 115+)
        ================================================================ */}
        <section className="relative border-y border-white/[0.05] bg-surface-low/40 overflow-hidden">
          {/* Aconcagua valley ambient — extreme right, very subtle */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src={IMG_VALLEY}
              alt=""
              fill
              sizes="100vw"
              loading="lazy"
              decoding="async"
              className="object-cover object-center opacity-[0.09]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/60 to-surface" />
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.05]">
            {[
              { value: "1.450", unit: "m",    label: "Altitud sobre el mar",      sub: "Donde el Malbec gana carácter" },
              { value: "45",    unit: "días",  label: "Maduración mínima en seco", sub: "Para cada corte insignia" },
              { value: "720",   unit: "+",     label: "Etiquetas en cava privada", sub: "Valle de Uco · Salta · Patagonia" },
            ].map((s, idx) => (
              <Reveal
                key={s.label}
                as="div"
                rootMargin="0px 0px -40px 0px"
                className="px-10 md:px-14 py-16 flex flex-col gap-3 group cursor-default hover:bg-gold/[0.03] transition-colors duration-700"
              >
                <div
                  className="font-display leading-none text-bone tabular-nums group-hover:text-gold transition-colors duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ fontSize: "clamp(3.5rem,8vw,6rem)" }}
                >
                  <StatCounter value={s.value} />
                  <span className="text-gold ml-1" style={{ fontSize: "0.45em" }}>{s.unit}</span>
                </div>
                <span className="text-[10px] tracking-[0.28em] uppercase text-gold font-semibold">{s.label}</span>
                <span className="text-sm text-bone/38 font-light leading-relaxed">{s.sub}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================================================================
            05 · EL VUELO — asymmetric bento with SplitText heading
        ================================================================ */}
        <section className="relative py-36 md:py-52 px-6 md:px-12 overflow-hidden bg-surface">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-malbec/5 blur-[200px] rounded-full pointer-events-none" />

          <div className="max-w-[1440px] mx-auto">
            {/* Header — SplitText char reveal on the accent word */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-20">
              <div className="md:col-span-7 space-y-5">
                <Reveal>
                  <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-gold">
                    <span className="w-8 h-px bg-gold/50" />
                    <span>Experiencia Ancestral</span>
                  </div>
                </Reveal>
                <VelocityHeading
                  as="h2"
                  className="font-display text-bone tracking-[-0.03em] leading-[0.88]"
                  maxSkew={4}
                  maxCompress={0.05}
                >
                  <span style={{ fontSize: "clamp(2.8rem,7vw,6.5rem)" }} className="block">
                    El vuelo del{" "}
                    <span className="italic font-normal text-shimmer">
                      <SplitText by="char" delay={200} stagger={30}>cóndor</SplitText>
                    </span>
                  </span>
                </VelocityHeading>
              </div>
              <Reveal as="div" mode="single" direction="left" className="md:col-span-5 space-y-4">
                <div className="ridge" />
                <p className="font-display italic text-lg md:text-xl text-bone/50 leading-relaxed">
                  Cinco tiempos curados por el chef Mateo Salvatierra. Una noche irrepetible.
                </p>
              </Reveal>
            </div>

            {/* Bento */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

              {/* A — main hero card (teaser → carta) */}
              <TiltCard className="md:col-span-8">
                <Reveal as="article" className="group bezel-shell h-full">
                  <div className="bezel-core relative h-[500px] md:h-[660px]">
                    <Image
                      src={IMG_RIBEYE}
                      alt="Ribeye Valle de Uco — corte insignia de Alma Cóndor"
                      fill
                      sizes="(min-width: 768px) 65vw, 100vw"
                      loading="lazy"
                      decoding="async"
                      className="object-cover object-center opacity-[0.55] grayscale group-hover:scale-[1.04] group-hover:opacity-[0.92] group-hover:grayscale-0 img-reveal"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />

                    <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-surface/70 backdrop-blur-md border border-white/[0.07] px-4 py-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                      <span className="text-[10px] tracking-[0.3em] uppercase text-gold">La Insignia</span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 space-y-5">
                      <h3
                        className="font-display text-bone leading-[0.88] tracking-[-0.03em]"
                        style={{ fontSize: "clamp(2rem,5vw,4.5rem)" }}
                      >
                        Ribeye <span className="italic text-shimmer">Valle de Uco</span>
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-px bg-gold/35" />
                        <span className="text-[10px] tracking-[0.28em] uppercase text-bone/40">45 días · quebracho · sal rosada andina</span>
                      </div>
                      <div>
                        <Button href="/menu#cortes" variant="gold" size="sm">
                          Ver este plato
                        </Button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </TiltCard>

              {/* B — right column */}
              <div className="md:col-span-4 flex flex-col gap-4 md:gap-5">
                <TiltCard className="flex-1">
                  <Reveal as="article" className="group bezel-shell h-full">
                    <div className="bezel-core relative min-h-[300px] h-full">
                      <Image
                        src={IMG_CELLAR}
                        alt="Cava privada — copas de Malbec"
                        fill
                        sizes="(min-width: 768px) 30vw, 100vw"
                        loading="lazy"
                        decoding="async"
                        className="object-cover object-center opacity-[0.45] grayscale group-hover:opacity-[0.88] group-hover:grayscale-0 group-hover:scale-105 img-reveal"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
                      <div className="absolute inset-0 p-7 flex flex-col justify-between">
                        <div className="eyebrow text-[9.5px]">La Cava</div>
                        <div>
                          <div className="font-display text-bone leading-none mb-2" style={{ fontSize: "clamp(2.2rem,4vw,3rem)" }}>
                            720 <span className="text-gold italic font-normal text-xl">etiquetas</span>
                          </div>
                          <p className="text-xs text-bone/40 leading-relaxed font-light mb-5">Bóveda en piedra andina</p>
                          <Button href="/cava" variant="ghost" size="sm">Ver Cava</Button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </TiltCard>

                <TiltCard>
                  <Reveal as="article" className="group bezel-shell">
                    <div className="bezel-core p-8 min-h-[200px] flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <CondorMark size={22} className="text-gold/50 group-hover:text-gold transition-colors duration-700" />
                        <span className="text-[9px] tracking-[0.3em] uppercase text-bone/25">El Credo</span>
                      </div>
                      <div>
                        <span className="font-display text-[5rem] text-gold/10 leading-none block -mb-5">&ldquo;</span>
                        <p className="font-display italic text-base text-bone/60 leading-relaxed">
                          El fuego es el único lenguaje que la carne entiende a la perfección.
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </TiltCard>
              </div>
            </div>

            <Reveal as="div" className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/[0.05]">
              <p className="font-display italic text-lg md:text-xl text-bone/45">
                Cinco tiempos. Dos copas. Una sola noche.
              </p>
              <Button href="/menu" variant="gold" size="lg">Ver Carta Completa</Button>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            06 · EL ASCENSO — los 6 tiempos como camino sobre el Aconcagua
            Opens with the "¿experiencia única?" gateway OVER the grape
            vineyard, which fades as the path begins to draw.
            Scroll-driven path-draw + station reveals. The flagship moment.
        ================================================================ */}
        <AconcaguaPath imgSrc={IMG_VALLEY} stageSrc={IMG_GRAPES} introImg={IMG_UVA2} />

        {/* ================================================================
            06b · INVITACIÓN AL RITUAL — page-change curtain that closes the
            Aconcagua ascent. Slides in from the right + counter-parallax,
            then releases scroll into the final CTA.
        ================================================================ */}
        <RitualCurtain imgSrc={IMG_MALBEC} />

        {/* ── PILARES — tira editorial entre la Invitación y el CTA final ── */}
        <section className="border-y border-white/[0.05] bg-surface relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-10 md:py-14 flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10 gap-y-3">
            {PILLARS.map((p, i) => (
              <span key={i} className="flex items-center gap-6 md:gap-10">
                <span className="font-display italic text-bone/55 hover:text-bone/85 transition-colors duration-700 leading-[1.4]"
                      style={{ fontSize: "clamp(1.05rem,1.9vw,1.55rem)" }}>
                  {p}
                </span>
                {i < PILLARS.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-gold/40 shrink-0" />
                )}
              </span>
            ))}
          </div>
        </section>

        {/* ================================================================
            07 · CTA FINAL — architectural invitation + Ruta 7 ambient
        ================================================================ */}
        <section className="relative min-h-[85dvh] flex items-center justify-center overflow-hidden py-40 bg-surface">
          {/* Ruta 7 into the Andes — full bleed, heavily masked */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src={IMG_RUTA7}
              alt=""
              fill
              sizes="100vw"
              loading="lazy"
              decoding="async"
              className="object-cover object-top opacity-[0.13]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/75 to-surface/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface/60 via-transparent to-surface/60" />
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none">
              <span
                className="font-display leading-none"
                style={{
                  fontSize: "clamp(20rem,58vw,54rem)",
                  WebkitTextStroke: "1px rgba(255,255,255,0.015)",
                  color: "transparent",
                  letterSpacing: "-0.06em",
                }}
              >
                VII
              </span>
            </div>
            <ParallaxLayer factor={0.1} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-malbec/15 blur-[200px] rounded-full" />
          </div>

          <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
            <Reveal mode="stagger" className="space-y-10">
              <div className="flex items-center gap-5 justify-center">
                <span className="w-14 h-px bg-gold/20" />
                <CondorMark size={20} className="text-gold/40" />
                <span className="w-14 h-px bg-gold/20" />
              </div>

              <div className="eyebrow no-line justify-center text-[9.5px]">La Invitación</div>

              {/* ── Cóndor #3 (RITUAL DE DESPEDIDA) — soar above the headline ── */}
              <div className="flex justify-center mb-2">
                <CondorSilhouette mode="soar" size={86} color="rgba(212,175,55,0.55)" />
              </div>
              <VelocityHeading
                as="h2"
                className="font-display text-bone leading-[0.84] tracking-[-0.04em]"
                maxSkew={3.5}
                maxCompress={0.05}
              >
                <span style={{ fontSize: "clamp(3.5rem,12vw,10rem)" }} className="block">
                  Tu lugar
                  <br />
                  <span data-cinema-reveal className="inline-block italic font-normal text-shimmer">junto al fuego.</span>
                </span>
              </VelocityHeading>

              <p className="text-lg md:text-xl text-bone/40 font-light leading-relaxed max-w-md mx-auto">
                Las reservas son limitadas para preservar la intimidad del ritual.
                Te esperamos al borde de los Andes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-2">
                <Button href="/reservas" variant="gold" size="lg">Asegurar Mesa</Button>
                <Button href="/menu" variant="ghost" size="lg">Ver el Menú</Button>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[9.5px] tracking-[0.3em] uppercase text-bone/25 border-t border-white/[0.04]">
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold/50 animate-pulse" />
                  Abierto esta noche · 19:00 → 00:00
                </span>
                <span>Ruta 7 · Luján de Cuyo · Mendoza</span>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}
