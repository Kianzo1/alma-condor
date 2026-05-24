import Image from "next/image";
import { Button } from "@/components/Button";
import { CondorMark } from "@/components/CondorMark";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { StatCounter } from "@/components/StatCounter";
import { TiltCard } from "@/components/TiltCard";
import { ParallaxLayer } from "@/components/ParallaxLayer";

// === Image assets (from Stitch design — to be replaced with real photos) ===
const IMG_HERO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBN2PKFG_lZpJ2zPBpfBerc1D_vk3LNP8JksVjo_qR01NQ3ALAS-iBfGS88l1hyyRWa9yDHoYIHT-7t3FOGJcLgEVnUj42BykZI_WYV3CiqsR6wH8pCtWnD-e9RAglMCL4Bhzr5OLoLbygP1yRAO83fndRcAVXn2sGBxCVA7YHk2xPywObri2JrtJTA6aH7DuekYHEwL3Y4GGcShB1HFp_cGGKadQpC8g1fWUO7aTU62cEyxvkq9FTWaB68fRZpRksaL0H6lb6K_RDm";

const IMG_HEARTH =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD-XJobP38SUcjKa5Xn-Mpf6MBgDJx7k2RN5QoAQwIk94vEMQSWsPsMcvjRSb6u5R-Sb72WMd0nq8UpKHpYJ7ohhMf3g8mx4oJuwp2XZA7hrsolr4psSf6_zalWMvsd6OHSakHpDseM7U6YFN0JYRtGQY4_xPOxJUXcAcwygg-IDYuzdA9rQhZ4Ni8wl0oR_OAAalWWZ5QwLcASQ0mYOcybgtFgdVIh2Q8SrFUP0n3hU_j0SVls_SWuqUH1ZMWp_DlkYkPnJgYVKkQQ";

const IMG_RIBEYE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDf38kbDR9M_Na47v1A-M88ypaKK_Xk51-fMfemCjoo-i6bJK-d5X8yQLG1HAP8LMUN-U2nJ5Dl0RaINb1wDSlXXcltgjidU3EslMK1yfVHZbGqkBRQ88xRNCSTy-vdMH--eGB9sJuerEcpCwHzhqKUy8jK0G-MtasTgd2LUR552mcW6YnyoDplfC41_4xgjhzLa06UGba_-jPo6QWB8tf1wkuBStVTfWkduGi8cuiGJT8VU4AffyAxHViLO0JvaWBZIcMT_E1P_-u4";

const IMG_CELLAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCoB1Jst8A0ObjmFT1z4Idf07Q-BjEaQpywq_jeugDZWNewQ6vcGrWzM7IJEz-9nkQa_vm9-mUQO2ttrdrAFP3r7NSN9-fjTZmBCSZaTz0JSwbLx7WyuDToJPmHI3hn6naezuJ7Z4cVwzFV5ihZ7BR2RO82YcU9fHnnS4Bxb7xvddguZCbiVbXkjOjyh3j9Nn_e8U2DyAkBgkTf7g4f3qiEty-G4Zc7vz-GOfunGFCxwKWp67FftigYL0ymRO0L4y8cs-BEmCDJ991o";

const STATS = [
  { value: "1.450", unit: "m", label: "Altitud" },
  { value: "06", unit: "tiempos", label: "Ritual" },
  { value: "45", unit: "días", label: "Maduración" },
];

const PILLARS = [
  "EL FUEGO",
  "EL CÓNDOR",
  "LA UVA",
  "EL TERRUÑO",
  "EL RITUAL",
  "LA CUMBRE",
  "EL QUEBRACHO",
];

export default function HomePage() {
  return (
    <>
      {/* ================================================================
          01 · HERO — Editorial Split Cinematic
      ================================================================ */}
      <section className="relative min-h-[100dvh] flex items-center pt-32 md:pt-28 pb-20 overflow-hidden">
        {/* Atmospheric backdrop — each layer has a different parallax depth */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Massive condor — deepest layer, barely moves */}
          <ParallaxLayer factor={0.12} className="absolute inset-0 flex items-center justify-center opacity-[0.025]">
            <CondorMark size={1200} className="text-bone" />
          </ParallaxLayer>
          {/* Malbec radial glow — mid depth */}
          <ParallaxLayer factor={0.22} className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-malbec/25 rounded-full blur-[160px]" />
          {/* Gold radial glow — nearest layer */}
          <ParallaxLayer factor={0.35} className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gold/[0.08] rounded-full blur-[140px]" />
          {/* Vertical fade to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-surface" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT — Typography stack (7 cols) */}
            <Reveal as="div" mode="stagger" className="lg:col-span-7 space-y-8">
              {/* Index + breadcrumb */}
              <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                <span className="text-gold">01</span>
                <span className="w-8 h-px bg-slate-deep" />
                <span>Bienvenida al Hogar</span>
              </div>

              {/* Massive editorial headline */}
              <h1 className="font-display text-[clamp(4rem,13vw,11rem)] leading-[0.86] tracking-[-0.04em] text-bone">
                <span className="block">Alma</span>
                <span className="block italic font-normal -mt-2 md:-mt-4 text-shimmer">
                  Cóndor
                </span>
              </h1>

              {/* Tagline */}
              <p className="font-display italic text-2xl md:text-4xl text-bone-muted leading-snug max-w-2xl pt-2">
                Fuego ancestral, terruño sagrado.
                <br />
                <span className="not-italic text-base md:text-lg text-bone-muted/70 font-body font-light tracking-wide">
                  Una parrilla y cava de altura, escondida entre los Andes y el viñedo.
                </span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button href="/reservas" variant="gold" size="lg">
                  Reservar Mesa
                </Button>
                <Button href="/menu" variant="ghost" size="lg">
                  Conocer la Carta
                </Button>
              </div>

              {/* Bottom address strip */}
              <div className="pt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[10.5px] tracking-[0.28em] uppercase text-slate">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  Abierto esta noche · 19:00 → 00:00
                </span>
                <span className="hidden sm:block w-px h-3 bg-slate-deep" />
                <span>Ruta 7 · Luján de Cuyo</span>
                <span className="hidden sm:block w-px h-3 bg-slate-deep" />
                <span>Mendoza · Argentina</span>
              </div>
            </Reveal>

            {/* RIGHT — Asymmetric floating cards (5 cols) */}
            <Reveal as="div" className="lg:col-span-5 relative h-[500px] md:h-[600px] lg:h-[640px]">
              {/* Stat card — top right, smaller */}
              <div className="absolute top-0 right-0 w-[55%] z-20 bezel-shell rotate-[2deg] hover:rotate-0 transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <div className="bezel-core p-6 md:p-7">
                  <div className="eyebrow no-line mb-5 text-[9.5px]">Marca de la Casa</div>
                  <div className="space-y-4">
                    {STATS.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-baseline justify-between border-b border-white/[0.05] pb-2 last:border-0"
                      >
                        <span className="text-[10px] tracking-[0.25em] uppercase text-bone-muted">
                          {stat.label}
                        </span>
                        <span className="font-display text-2xl md:text-3xl text-bone tabular-nums">
                          <StatCounter value={stat.value} />
                          <span className="text-gold text-xs ml-1 tracking-wider">
                            {stat.unit}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main hero image — bottom left, larger */}
              <div className="absolute bottom-0 left-0 w-[78%] aspect-[3/4] z-10 bezel-shell">
                <div className="bezel-core relative h-full">
                  <Image
                    src={IMG_HERO}
                    alt="Silueta de un cóndor sobre los Andes al atardecer"
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 80vw"
                    className="object-cover"
                  />
                  {/* Image fade overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/30 via-transparent to-transparent" />
                  {/* Floating quote badge */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-full bg-surface/70 backdrop-blur-md border border-white/[0.06] px-4 py-2.5">
                    <CondorMark size={16} className="text-gold shrink-0" />
                    <span className="text-[10px] tracking-[0.25em] uppercase text-bone-muted truncate">
                      Aconcagua · 6.961 m
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating year card — bottom right, smallest */}
              <div className="absolute bottom-8 right-0 z-30 bezel-shell -rotate-[3deg] hover:rotate-0 transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <div className="bezel-core px-7 py-5 text-center">
                  <div className="eyebrow no-line text-[9px] mb-2">Establecido</div>
                  <div className="font-display text-4xl md:text-5xl text-gold leading-none">
                    MMXXV
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.4em] uppercase text-bone/40">
            Descubrir
          </span>
          <span className="w-px h-12 bg-gradient-to-b from-gold/60 via-gold/20 to-transparent scroll-indicator-line" />
        </div>
      </section>

      {/* ================================================================
          MARQUEE — Brand pillars ticker
      ================================================================ */}
      <section className="relative border-y border-white/[0.04] bg-surface-low/40 backdrop-blur-sm py-8 md:py-10">
        <Marquee
          speed={60}
          items={PILLARS.map((p, i) => (
            <span
              key={i}
              className="font-display italic text-3xl md:text-5xl text-bone-muted/70 hover:text-gold transition-colors duration-700 flex items-center gap-12 md:gap-16"
            >
              {p}
              <CondorMark size={20} className="text-gold/40 shrink-0" />
            </span>
          ))}
        />
      </section>

      {/* ================================================================
          02 · LA ALQUIMIA DEL FUEGO — Editorial 5:7 split
      ================================================================ */}
      <section className="relative py-32 md:py-48 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Image side */}
            <Reveal as="div" mode="clip" className="lg:col-span-5 relative">
              <div className="relative bezel-shell">
                <div className="bezel-core relative aspect-[4/5]">
                  <Image
                    src={IMG_HEARTH}
                    alt="Brasas de quebracho bajo la parrilla"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                  {/* Gold corner brackets */}
                  <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-gold/40" />
                  <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-gold/40" />
                  {/* Bottom caption pill */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur-md border border-white/[0.06]">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-gold">
                      Quebracho · 850°C
                    </span>
                  </div>
                </div>
              </div>
              {/* Floating signature */}
              <div className="absolute -bottom-6 -right-6 bezel-shell rotate-[3deg]">
                <div className="bezel-core px-5 py-3">
                  <span className="font-display italic text-sm text-bone-muted">
                    — Chef Mateo Salvatierra
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Text side */}
            <Reveal as="div" mode="stagger" className="lg:col-span-7 lg:pl-6 space-y-7">
              <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                <span className="text-gold">02</span>
                <span className="w-8 h-px bg-slate-deep" />
                <span>La Esencia</span>
              </div>

              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-bone tracking-[-0.02em]">
                La{" "}
                <span className="italic font-normal text-gold/95">
                  alquimia
                </span>
                <br />
                del fuego.
              </h2>

              <div className="ridge w-32" />

              <p className="font-display italic text-xl md:text-2xl text-bone-muted leading-relaxed max-w-xl">
                A la sombra del Aconcagua, donde el aire se vuelve fino y el sol arde eterno, nace Alma Cóndor.
              </p>

              <p className="text-base md:text-lg text-bone/80 leading-loose font-light max-w-2xl">
                Unimos el espíritu salvaje de los Andes con la tradición noble de la parrilla argentina. Nuestra filosofía descansa en el fuego del{" "}
                <span className="text-gold italic">quebracho colorado</span> — la fuente primaria de vida para cada plato. Cortes de pampa criados en libertad, maridados con el alma profunda de los Malbec de altura.
              </p>

              <div className="pt-4">
                <Button href="/menu" variant="ghost" size="lg">
                  La Carta del Ritual
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          03 · EL VUELO DEL CÓNDOR — Asymmetric Bento Grid
      ================================================================ */}
      <section className="relative py-32 md:py-48 px-6 md:px-10 bg-surface-low border-y border-white/[0.04]">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-malbec/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto">
          {/* Header */}
          <Reveal as="div" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-20">
            <div className="md:col-span-8 space-y-6">
              <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                <span className="text-gold">03</span>
                <span className="w-8 h-px bg-slate-deep" />
                <span>Experiencia Ancestral</span>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-bone tracking-[-0.02em]">
                El vuelo{" "}
                <span className="italic font-normal text-gold/95">del cóndor</span>
              </h2>
            </div>
            <div className="md:col-span-4 space-y-3">
              <div className="ridge" />
              <p className="font-display italic text-lg text-bone-muted leading-relaxed">
                Un viaje sensorial de seis tiempos, curado por el chef Mateo Salvatierra.
              </p>
            </div>
          </Reveal>

          {/* Bento — asymmetric */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-6 md:auto-rows-[minmax(0,1fr)] md:h-[760px]">
            {/* Card 1: Featured large */}
            <TiltCard className="md:col-span-4 md:row-span-2">
            <Reveal as="article" className="h-full group bezel-shell">
              <div className="bezel-core relative h-full min-h-[400px]">
                <Image
                  src={IMG_RIBEYE}
                  alt="Ribeye Valle de Uco con copa de Malbec"
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover opacity-60 grayscale group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />

                {/* Top badge */}
                <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-surface/70 backdrop-blur-md border border-white/[0.06] px-4 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-gold">
                    La Insignia
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 space-y-5">
                  <h3 className="font-display text-4xl md:text-5xl text-bone leading-[0.95] tracking-[-0.02em]">
                    Ribeye <span className="italic text-gold/95">Valle de Uco</span>
                  </h3>
                  <p className="text-bone-muted text-sm md:text-base max-w-md leading-relaxed">
                    Maduración en seco 45 días, terminado sobre llama abierta con sal rosada de los Andes y hierbas de montaña.
                  </p>
                  <div className="flex items-center gap-6 pt-2">
                    <span className="font-display text-2xl text-gold">$28.500</span>
                    <span className="w-12 h-px bg-gold/40" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                      Maridaje Sugerido · Malbec 2017
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
            </TiltCard>

            {/* Card 2: Cellar */}
            <TiltCard className="md:col-span-2">
            <Reveal as="article" className="h-full group bezel-shell">
              <div className="bezel-core relative h-full min-h-[260px]">
                <Image
                  src={IMG_CELLAR}
                  alt="Cava de vinos privada"
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover opacity-50 grayscale group-hover:opacity-85 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                />
                <div className="absolute inset-0 bg-surface/40" />
                <div className="absolute inset-0 p-7 flex flex-col justify-between">
                  <div className="eyebrow text-[9.5px]">La Cava</div>
                  <div>
                    <h4 className="font-display text-3xl text-bone mb-3 leading-tight">
                      720 etiquetas
                    </h4>
                    <p className="text-xs text-bone-muted leading-relaxed">
                      Reserva privada del Valle de Uco, Salta y Patagonia. Una bóveda subterránea esculpida en piedra de los Andes.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            </TiltCard>

            {/* Card 3: The Ritual quote */}
            <TiltCard className="md:col-span-2">
            <Reveal as="article" className="h-full group bezel-shell">
              <div className="bezel-core relative h-full min-h-[260px] p-7 flex flex-col justify-between">
                <CondorMark size={28} className="text-gold/70 group-hover:text-gold transition-colors duration-700" />
                <div>
                  <span className="font-display text-7xl text-gold/30 leading-none">&ldquo;</span>
                  <p className="font-display italic text-base md:text-lg text-bone-muted leading-relaxed -mt-4">
                    El fuego es el único lenguaje que la carne entiende a la perfección.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                    El Credo
                  </span>
                  <CondorMark size={16} className="text-gold/40" />
                </div>
              </div>
            </Reveal>
            </TiltCard>
          </div>

          {/* Bento footer link */}
          <Reveal as="div" className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/[0.05]">
            <p className="font-display italic text-lg md:text-xl text-bone-muted">
              Seis tiempos. Dos copas. Una sola noche.
            </p>
            <Button href="/menu" variant="gold" size="lg">
              Ver Carta Completa
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          04 · INVITATION — Full-bleed cinematic CTA
      ================================================================ */}
      <section className="relative py-40 md:py-56 overflow-hidden">
        {/* Atmospheric backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
            <CondorMark size={1000} className="text-gold" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-malbec/30 blur-[160px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal as="div" mode="stagger" className="space-y-10">
            <div className="flex items-center justify-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
              <span className="text-gold">04</span>
              <span className="w-8 h-px bg-slate-deep" />
              <span>La Invitación</span>
              <span className="w-8 h-px bg-slate-deep" />
              <span className="text-gold">04</span>
            </div>

            <h2 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] text-bone tracking-[-0.03em]">
              Tu lugar
              <br />
              <span className="italic font-normal text-gold/95">
                junto al fuego.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-bone-muted/90 font-light leading-relaxed max-w-xl mx-auto">
              Las reservas son limitadas para preservar la intimidad del ritual. Te esperamos al borde de los Andes.
            </p>

            <div className="flex justify-center pt-4">
              <Button href="/reservas" variant="gold" size="lg">
                Asegurar Mesa
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
