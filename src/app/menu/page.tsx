import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CondorMark } from "@/components/CondorMark";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { SplitText } from "@/components/SplitText";
import { HexagonIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "La Carta · El Ritual del Fuego",
  description:
    "La Carta de Alma Cóndor: capítulos del fuego ancestral. Cortes de autor, entradas mendocinas, vegetales de la huerta de altura.",
};

const IMG_HERO   = "/images/comida1.jpg";
const IMG_CORTE  = "/images/comida2.jpg";
const IMG_GRAPES = "/images/vino2.jpg";
const IMG_HUERTA = "/images/huerta-vegetales.jpg";

// ============ Menu data ============
type Dish = {
  numeral: string;
  name: string;
  description: string;
  price?: string;
  pairing?: string;
  tag?: string;
  origin?: string;
};

const APERTURA: Dish[] = [
  {
    numeral: "I.i",
    name: "Empanadas Mendocinas",
    description:
      "Cortadas a cuchillo, horneadas al barro con leña de vid y olivo. Carne braseada de Tunuyán.",
    price: "$4.200",
    origin: "Valle de Uco",
    pairing: "Torrontés · Salta",
  },
  {
    numeral: "I.ii",
    name: "Mollejas al Limón Andino",
    description:
      "Corazón de molleja crocante, terminado con sal de Cachi y cítricos de estación de Maipú.",
    price: "$12.500",
    tag: "Favorito de la Casa",
    pairing: "Chardonnay White Bones",
  },
  {
    numeral: "I.iii",
    name: "Provoleta Ahumada",
    description:
      "Provolone artesanal de Tunuyán, ahumado con leña de algarrobo y orégano serrano.",
    price: "$9.800",
    pairing: "Bonarda 2020",
  },
];

const CORTES: Dish[] = [
  {
    numeral: "II.i",
    name: "Ribeye Valle de Uco",
    description:
      "Maduración en seco 45 días. Sellado sobre llama abierta de quebracho para una costra perfecta. Terminado con sal rosada andina y ajos confitados al humo.",
    price: "$28.500",
    tag: "La Insignia",
    origin: "Valle de Uco · 45 días dry-aged",
    pairing: "Malbec Gran Reserva 2017",
  },
  {
    numeral: "II.ii",
    name: "Ojo de Bife Alma Cóndor",
    description:
      "450g de pura nobleza. Infiltración excepcional, sellado a fuego fuerte sobre brasas de quebracho. Acompañado de ajos confitados al humo.",
    price: "$28.500",
    tag: "Del Chef",
    origin: "Pampa Húmeda · 21 días dry-aged",
    pairing: "Gran Reserva Cóndor 2017",
  },
  {
    numeral: "II.iii",
    name: "Entraña Premium",
    description:
      "La favorita de la casa. Limpia y jugosa, servida al punto exacto con provenzal de hierbas frescas de montaña.",
    price: "$24.000",
    origin: "Cuenca del Mendoza",
    pairing: "Malbec Catena Zapata",
  },
  {
    numeral: "II.iv",
    name: "Bife de Chorizo Wagyu",
    description:
      "Wagyu argentino de cuarta cruza. Marbling perfecto, terminado sobre brasas de quebracho con flor de sal del Atlántico.",
    price: "$36.500",
    tag: "Edición Limitada · 12 cortes por noche",
    origin: "Wagyu Bredow",
    pairing: "Petit Verdot Reserva",
  },
  {
    numeral: "II.v",
    name: "Cordero Patagónico",
    description:
      "A las brasas durante seis horas, untado con chimichurri de menta silvestre y reducción de Malbec.",
    price: "$26.000",
    origin: "Estepa Patagónica",
    pairing: "Pinot Noir Patagonia",
  },
];

const HUERTA: Dish[] = [
  {
    numeral: "III.i",
    name: "Papas al Rescoldo",
    description: "Cocinadas bajo cenizas de quebracho, con manteca de hierbas y sal ahumada.",
    price: "$5.500",
  },
  {
    numeral: "III.ii",
    name: "Vegetales de Estación",
    description: "Asados a la plancha con aceite de oliva virgen extra de Maipú.",
    price: "$5.200",
  },
  {
    numeral: "III.iii",
    name: "Rúcula y Parmesano",
    description: "Hojas tiernas, lascas de reggianito, reducción de aceto balsámico.",
    price: "$4.800",
  },
  {
    numeral: "III.iv",
    name: "Calabaza Ahumada",
    description: "Con astillas de nogal, miel silvestre, queso de cabra de Tupungato.",
    price: "$5.500",
  },
];

const CHAPTER_NAV = [
  { id: "apertura", roman: "I", label: "Apertura" },
  { id: "cortes", roman: "II", label: "El Corazón de la Brasa" },
  { id: "huerta", roman: "III", label: "La Huerta de Altura" },
];

// ============ DishCard ============
function DishCard({ dish, delay = 0 }: { dish: Dish; delay?: number }) {
  return (
    <article
      className="group/dish bezel-shell"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="bezel-core p-6 md:p-8 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/dish:bg-surface-high relative overflow-hidden">
        {/* Animated gold accent line on hover */}
        <div className="absolute left-0 top-0 w-[2px] h-0 bg-gradient-to-b from-gold to-gold/0 group-hover/dish:h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />

        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <span className="font-display italic text-base text-gold/60 tabular-nums group-hover/dish:text-gold transition-colors duration-500">
            {dish.numeral}
          </span>
          {dish.tag && (
            <span className="text-[9.5px] tracking-[0.25em] uppercase text-gold border border-gold/30 bg-gold/5 px-2.5 py-1 rounded-full">
              {dish.tag}
            </span>
          )}
        </div>

        {/* Name + price */}
        <div className="flex items-baseline justify-between gap-4 mb-4">
          <h3 className="font-display text-2xl md:text-3xl text-bone leading-tight tracking-[-0.01em] group-hover/dish:text-shimmer transition-all duration-500">
            {dish.name}
          </h3>
          {dish.price && (
            <span className="font-display text-xl md:text-2xl text-gold tabular-nums whitespace-nowrap">
              {dish.price}
            </span>
          )}
        </div>

        {/* Animated hairline */}
        <div className="h-px bg-gradient-to-r from-gold/20 via-white/[0.04] to-transparent mb-5 group-hover/dish:from-gold/50 transition-all duration-700" />

        {/* Description */}
        <p className="font-display italic text-base text-bone-muted leading-relaxed mb-6">
          {dish.description}
        </p>

        {/* Footnotes */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-[10px] tracking-[0.22em] uppercase text-slate">
          {dish.origin && (
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold" />
              {dish.origin}
            </span>
          )}
          {dish.pairing && (
            <span className="flex items-center gap-2">
              <CondorMark size={11} className="text-gold/70 shrink-0" />
              {dish.pairing}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

// ============ Page ============
export default function MenuPage() {
  return (
    <>
      {/* ================================================================
          COVER
      ================================================================ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={IMG_HERO}
            alt="Brasas de quebracho y cortes premium"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/30 to-surface" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(12,10,9,0.9)_100%)]" />
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-malbec/15 blur-[140px] rounded-full animate-pulse-slow" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10">
          <Reveal as="div" mode="stagger" className="max-w-5xl mx-auto text-center space-y-10">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-4 text-[10px] tracking-[0.4em] uppercase text-bone-muted">
              <span className="h-px w-12 bg-gold" />
              <span className="text-gold">Vol. I — MMXXV</span>
              <span className="h-px w-12 bg-gold" />
            </div>

            {/* Cover title */}
            <h1 className="font-display text-[clamp(3rem,11vw,9rem)] leading-[0.88] text-bone tracking-[-0.04em]">
              <SplitText by="char" stagger={40}>La Carta</SplitText>
              <br />
              <span className="inline-block italic font-normal text-shimmer text-[clamp(2rem,7vw,5.5rem)]">
                <SplitText by="char" stagger={35} delay={400}>del Ritual.</SplitText>
              </span>
            </h1>

            {/* Subtitle */}
            <Reveal as="p" className="font-display italic text-xl md:text-2xl text-bone-muted leading-relaxed max-w-2xl mx-auto">
              Tres capítulos. Doce pasos. Una sola hoguera.
            </Reveal>

            {/* Decorative cóndor */}
            <div className="flex items-center justify-center gap-6 pt-6">
              <span className="h-px w-24 bg-gradient-to-r from-transparent to-gold/40" />
              <CondorMark size={28} className="text-gold" />
              <span className="h-px w-24 bg-gradient-to-l from-transparent to-gold/40" />
            </div>

            {/* Chapter nav */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
              {CHAPTER_NAV.map((ch, i) => (
                <a
                  key={ch.id}
                  href={`#${ch.id}`}
                  className="group/chip rounded-full bezel-shell press hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className="block bezel-core px-5 py-2.5 rounded-full">
                    <span className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-bone-muted group-hover/chip:text-gold transition-colors duration-500">
                      <span className="text-gold font-display italic">{ch.roman}</span>
                      <span>{ch.label}</span>
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] tracking-[0.4em] uppercase text-bone">Abrir</span>
          <span className="w-px h-12 bg-gradient-to-b from-bone via-bone/30 to-transparent" />
        </div>
      </section>

      {/* ================================================================
          CHAPTER I — APERTURA
      ================================================================ */}
      <section id="apertura" className="relative py-32 md:py-44 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">

          {/* Chapter heading */}
          <Reveal as="div" className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end mb-20">
            <div className="md:col-span-3">
              <div className="font-display italic text-[clamp(8rem,15vw,14rem)] leading-[0.8] text-gold/10 select-none">
                I
              </div>
            </div>
            <div className="md:col-span-9 space-y-5">
              <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                <span className="text-gold">Capítulo Primero</span>
                <span className="w-8 h-px bg-slate-deep" />
                <span>Apertura</span>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-bone tracking-[-0.02em]">
                Los primeros{" "}
                <span className="inline-block italic text-shimmer">
                  <SplitText by="char" stagger={30}>susurros</SplitText>
                </span>
                <br />
                del horno de barro.
              </h2>
              <div className="ridge w-32" />
              <p className="font-display italic text-lg text-bone-muted leading-relaxed max-w-2xl">
                Pequeños bocados que honran la tradición del campo mendocino y el calor primitivo del quebracho.
              </p>
            </div>
          </Reveal>

          {/* Dish list — staggered rows, no images */}
          <div className="space-y-4">
            {APERTURA.map((dish, i) => (
              <Reveal key={dish.numeral} direction="left" rootMargin="0px 0px -40px 0px">
                <DishCard dish={dish} delay={i * 80} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee divider */}
      <section className="relative border-y border-white/[0.04] bg-surface-low/40 py-8 overflow-hidden">
        <Marquee
          speed={75}
          items={[
            "EL FUEGO ES EL ÚNICO LENGUAJE",
            "—",
            "QUE LA CARNE ENTIENDE",
            "—",
            "A LA PERFECCIÓN",
            "—",
            "CHEF MATEO SALVATIERRA",
            "—",
          ].map((p, i) => (
            <span
              key={i}
              className="font-display italic text-xl md:text-2xl text-bone-muted/50 flex items-center gap-10"
            >
              {p}
            </span>
          ))}
        />
      </section>

      {/* ================================================================
          EDITORIAL BREAK — single cinematic image + quote
      ================================================================ */}
      <section className="relative overflow-hidden py-24 md:py-36 px-6 md:px-10 bg-surface border-y border-white/[0.04]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-malbec/8 blur-[180px] rounded-full" />
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Image */}
            <Reveal as="div" direction="left" className="lg:col-span-6">
              <div className="bezel-shell group">
                <div className="bezel-core relative h-[420px] md:h-[520px] overflow-hidden">
                  <Image
                    src={IMG_GRAPES}
                    alt="Uvas Malbec — Valle de Uco"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    loading="lazy"
                    className="object-cover object-center group-hover:scale-[1.05] transition-transform duration-[2200ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-surface/65 backdrop-blur-md border border-white/[0.07] px-3.5 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-malbec-glow animate-pulse" />
                    <span className="text-[9px] tracking-[0.28em] uppercase text-bone/80">Malbec · 2017</span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="font-display italic text-bone/90 text-2xl">El terruño</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Text */}
            <Reveal as="div" direction="right" className="lg:col-span-6 space-y-8">
              <div className="eyebrow text-[10px]">El Terruño · Valle de Uco</div>
              <h2 className="font-display text-bone leading-[0.92] tracking-[-0.03em]" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
                De la{" "}
                <span className="italic text-shimmer">
                  <SplitText by="char" stagger={40}>vid</SplitText>
                </span>
                {" "}a la{" "}
                <span className="italic text-shimmer">
                  <SplitText by="char" stagger={40} delay={200}>brasa.</SplitText>
                </span>
              </h2>
              <div className="ridge" />
              <p className="font-display italic text-base md:text-lg text-bone-muted leading-relaxed">
                Doscientos kilómetros de altura, viento norte y suelos aluviales.
                Cada uva y cada corte cuenta la misma historia: la del Valle de Uco.
              </p>
              <div className="flex items-center gap-4 pt-2 text-[10px] tracking-[0.3em] uppercase text-gold/60">
                <span className="w-6 h-px bg-gold/40" />
                Valle de Uco · 1.450m sobre el mar
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================================================================
          CHAPTER II — EL CORAZÓN DE LA BRASA
      ================================================================ */}
      <section
        id="cortes"
        className="relative py-32 md:py-44 px-6 md:px-10 bg-surface-low border-y border-white/[0.04] overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-malbec/15 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none">
          <CondorMark size={900} className="text-bone" />
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          {/* Chapter heading */}
          <Reveal as="div" className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end mb-20">
            <div className="md:col-span-9 md:order-1 space-y-5">
              <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                <span className="text-gold">Capítulo Segundo</span>
                <span className="w-8 h-px bg-slate-deep" />
                <span>El Corazón de la Brasa</span>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-bone tracking-[-0.02em]">
                Donde el{" "}
                <span className="inline-block italic text-shimmer">
                  <SplitText by="char" stagger={30}>cóndor</SplitText>
                </span>
                <br />
                acaricia el fuego.
              </h2>
              <div className="ridge w-32" />
              <p className="font-display italic text-lg text-bone-muted leading-relaxed max-w-2xl">
                Selección exclusiva de novillos criados en pasturas naturales, madurados en seco durante 21 días.
              </p>
            </div>
            <div className="md:col-span-3 md:order-2 text-right">
              <div className="font-display italic text-[clamp(8rem,15vw,14rem)] leading-[0.8] text-gold/10 select-none">
                II
              </div>
            </div>
          </Reveal>

          {/* Hero corte — full bleed with image */}
          <Reveal as="div" className="mb-10">
            <article className="bezel-shell group/hero">
              <div className="bezel-core relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
                  <Image
                    src={IMG_CORTE}
                    alt="Ribeye Valle de Uco — La Insignia"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/hero:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/40 lg:to-transparent" />
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    <span className="rounded-full bg-surface/70 backdrop-blur-md border border-gold/30 px-4 py-2 text-[10px] tracking-[0.3em] uppercase text-gold flex items-center gap-2">
                      <HexagonIcon size={11} className="text-gold" />
                      La Insignia
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 rounded-full bg-surface/70 backdrop-blur-md border border-white/[0.06] px-4 py-2">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                      45 días dry-aged
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-between gap-8">
                  <div className="space-y-6">
                    <span className="font-display italic text-base text-gold/70 tabular-nums">II.i</span>
                    <h3 className="font-display text-4xl md:text-5xl text-bone leading-[0.95] tracking-[-0.02em]">
                      Ribeye{" "}
                      <span className="italic text-shimmer">Valle de Uco</span>
                    </h3>
                    <div className="h-px bg-gradient-to-r from-gold/40 to-transparent w-32 group-hover/hero:w-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                    <p className="font-display italic text-lg text-bone-muted leading-relaxed">
                      Maduración en seco 45 días. Sellado sobre llama abierta de quebracho para una costra perfecta. Terminado con sal rosada andina y ajos confitados al humo.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-baseline justify-between gap-4 pt-6 border-t border-white/[0.06]">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-bone-muted">Precio</span>
                      <span className="font-display text-4xl text-gold tabular-nums">$28.500</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-slate">
                      <CondorMark size={12} className="text-gold/70" />
                      Maridaje sugerido · Malbec Gran Reserva 2017
                    </div>
                    <Button href="/reservas" variant="gold" size="sm" className="w-full justify-center">
                      Reservar esta noche
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Rest of cortes — staggered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CORTES.slice(1).map((dish, i) => (
              <Reveal key={dish.numeral} direction={i % 2 === 0 ? "left" : "right"} rootMargin="0px 0px -40px 0px">
                <DishCard dish={dish} delay={i * 60} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CHAPTER III — LA HUERTA
      ================================================================ */}
      <section id="huerta" className="relative py-32 md:py-44 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">

          {/* Chapter heading */}
          <Reveal as="div" className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end mb-20">
            <div className="md:col-span-3">
              <div className="font-display italic text-[clamp(8rem,15vw,14rem)] leading-[0.8] text-gold/10 select-none">
                III
              </div>
            </div>
            <div className="md:col-span-9 space-y-5">
              <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                <span className="text-gold">Capítulo Tercero</span>
                <span className="w-8 h-px bg-slate-deep" />
                <span>La Huerta de Altura</span>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-bone tracking-[-0.02em]">
                Los frutos{" "}
                <span className="inline-block italic text-shimmer">
                  <SplitText by="char" stagger={30}>silenciosos</SplitText>
                </span>
                <br />
                de la cordillera.
              </h2>
              <div className="ridge w-32" />
              <p className="font-display italic text-lg text-bone-muted leading-relaxed max-w-2xl">
                Vegetales orgánicos cultivados a los pies de los Andes, respetando los ciclos de la naturaleza.
              </p>
            </div>
          </Reveal>

          {/* Single editorial image */}
          <Reveal as="div" className="mb-12">
            <div className="bezel-shell group">
              <div className="bezel-core relative h-[260px] md:h-[340px] overflow-hidden">
                <Image
                  src={IMG_HUERTA}
                  alt="Vegetales de estación de los Andes"
                  fill
                  sizes="100vw"
                  loading="lazy"
                  className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-[2000ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-surface/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-surface/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-8 space-y-1">
                  <div className="text-[9px] tracking-[0.38em] uppercase text-gold/70">Huerta de Altura · 1.450m</div>
                  <p className="font-display italic text-2xl md:text-3xl text-bone/90 leading-tight">
                    De la tierra al fuego,<br />sin escalas.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 2x2 grid — cards only, no per-dish images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {HUERTA.map((dish, i) => (
              <Reveal key={dish.numeral} direction={i % 2 === 0 ? "left" : "right"} rootMargin="0px 0px -30px 0px">
                <DishCard dish={dish} delay={i * 70} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CLOSING — Quote + CTA
      ================================================================ */}
      <section className="relative py-40 md:py-52 overflow-hidden border-t border-white/[0.04]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-malbec/20 blur-[140px] rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
            <CondorMark size={800} className="text-gold" />
          </div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal as="div" mode="stagger" className="space-y-10">
            <CondorMark size={36} className="text-gold mx-auto" />

            <blockquote className="font-display italic text-3xl md:text-5xl text-bone leading-[1.15] tracking-[-0.01em]">
              &ldquo;El vino es el alma de la mesa,
              <br />
              <span className="inline-block text-shimmer">
                <SplitText by="word" stagger={80} delay={300}>
                  pero el fuego es su espíritu.
                </SplitText>
              </span>
              &rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-6">
              <span className="h-px w-24 bg-gradient-to-r from-transparent to-gold/40" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-bone-muted">
                Chef Mateo Salvatierra
              </span>
              <span className="h-px w-24 bg-gradient-to-l from-transparent to-gold/40" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button href="/cava" variant="ghost" size="lg">
                Carta de Vinos
              </Button>
              <Button href="/reservas" variant="gold" size="lg">
                Reservar Esta Noche
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
