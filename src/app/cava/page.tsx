import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CondorMark } from "@/components/CondorMark";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { SplitText } from "@/components/SplitText";

export const metadata: Metadata = {
  title: "La Cava · Espíritus Ancestrales",
  description:
    "La cava subterránea de Alma Cóndor. Malbec de altura, blancos de montaña y cosechas únicas del Valle de Uco.",
};

const IMG_CAVA_1      = "/images/cava-hero.jpg";
const IMG_CAVA_2      = "/images/cava-2.jpg";
const IMG_CAVA_3      = "/images/cava-3.jpg";
const IMG_CAVA_4      = "/images/cava-4.jpg";

const IMG_CELLAR_HERO = IMG_CAVA_3;

const IMG_MALBEC_POUR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD29JHVeCaGJluAJfACW8CF3vWqomVhnzXTqlteH-Z3-HVR46y6Dd1mDnY9G0CqbXfH40gfmm_1H4qsb5NTvStNv-oC-WGKgoNKrDpaUDXbuCTGjt9yNVThfnWo7wTB45ChbjqZRvjI6yHgF74nkzzqm9nFO0yM_6oF2doRpT_MwhsID8eh8IIJpxbpqW6FXo4WZ-gQjzt1EEWRPrIuKIniuqkdddqc_lGxk_Dr__xhNuxrFXOLNIF_O1VafhT0oiuUZ5R7J9KT2CoD";

const IMG_BOTTLE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCaKrcVuRRFWO0MyrrLTRgYXWTw23O7OoRs5E5byckNPDnWYYurBYwqZX8kgAJvqCeLejSTIWerQ0awIjbpJ62qw2rCQ_x6mW9r_deQNxh1y4KMiNsQ1EcK20Ukgtyw2cOrQL0cwa6rbAjUoSikWqjyi4GIUonybSN1LY3qtVetJHgnXRcvRs2_dObCjhHFj5eWoKVhwV4yT8ovnCK1xyE4X0050vVJDz8s4nKuv4Wc1RFuy4LCmxxL8k-6He8DFFMQGNtnPpHP-i4Z";

const IMG_WHITE_CHARDONNAY =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDGXswh4RywYQuFVl2X_KAfkwkU-ynfYijlrZfvcEqvukZ6BzK--cmX47XunPJ26J_wxSNczyM0zvTBDGWKdWA7xSlRRkpz1xYcy_thrQiIN_EqtVvrHyb7GG0tYArExLTS8mazOYm_YA2s4uYVmVAmN03GuPNrRhg6ppNi6PM2wnrFyxGY4indJ2qb4JvHcO-OxkTRW8jlXzyAehWjm9x4JpqCOwyrS6Hcu6UUGQSMGmaEVZL20KVd6afSGaYgltzwyWE9hpzFqHRW";

const IMG_WHITE_TORRONTES =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC00JgyPU2vYQX9MZefXg1WrKsHgWLUtZpihewfYExTRY2T-pudvARACbeMEH73wI2G97KX62D1GXSI6kkHqkxZaFsXzc4SE2OHVIzzWHiZaAaTUZoFIQsD4dUeX7GvuYqWbCy_cT0VRCk_GPAAkdjQMqrKhOpiVVuCbDzcGj_wQeb34jpfqvUT79HY-bLgXGBM0GRWWdiqlOvR2dzg3zn_Pu8VXnVLmxlknG9DoGyJbU1Pd-VFSZodSiwE5CMCmhFUc_awzVLBgrFi";

const IMG_WHITE_SEMILLON =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCtJl1dM8ZSD_HfB_rTIX8qWT6I3P7n7A8tkM2b8PiS_oYHSGwxo7ticDJLVViH43-XBMLC-RVB6dmdC1oWldRSnZudMGV8M9fpe8YL_cOcM9epQAvKJGeY7eWW0FIuPkEP5P7w-xNurkIlmOSw4wD99S66CDj7re121eyX_bLoKDTXaocSJxbt22psTy8P9LVhF7qKXOchDKDlEd4RzLN06g1sBVOHH9fr6LesZWc_LCZDAkk8b2jbrPKN_HwkV1-3iS-CTyQSmaei";

const MALBECS = [
  {
    name: "Altos Las Hormigas",
    region: "Gualtallary Terroir Series",
    year: "2019",
    altitude: "1.350 m",
    notes: "Estructura mineral profunda con notas de violeta y especias andinas.",
    image: IMG_BOTTLE,
    tag: "Selección del Chef",
  },
  {
    name: "Zuccardi Concreto",
    region: "Paraje Altamira",
    year: "2020",
    altitude: "1.100 m",
    notes: "Expresión pura del suelo calcáreo. Fermentación en concreto.",
    price: "$95",
  },
  {
    name: "Catena Zapata",
    region: "Adrianna Vineyard",
    year: "2018",
    altitude: "1.500 m",
    notes: "El terruño más prestigioso de Mendoza. Altitud extrema.",
    price: "$180",
  },
];

const BLANCOS = [
  {
    name: "Chardonnay White Bones",
    region: "Adrianna Vineyard",
    notes: "Mineral, cítrico, con un final seco que refleja su suelo de huesos calcáreos.",
    image: IMG_WHITE_CHARDONNAY,
  },
  {
    name: "Torrontés Reserva",
    region: "Salta Highlands",
    notes: "Explosión aromática de jazmín y piel de naranja. El alma del norte argentino.",
    image: IMG_WHITE_TORRONTES,
  },
  {
    name: "Semillon Old Vines",
    region: "Mendoza River Bed",
    notes: "Textura cerosa con notas melosas. Una variedad rara, renacida con elegancia.",
    image: IMG_WHITE_SEMILLON,
  },
];

const COSECHAS_ESPECIALES = [
  { number: "01", name: "El Enemigo · Gran Enemigo Gualtallary", detail: "Edición limitada · 300 botellas", year: "2013" },
  { number: "02", name: "Cheval des Andes", detail: "Fusión Bordeaux–Mendoza", year: "2015" },
  { number: "03", name: "Viña Cobos · 'Niche' Malbec", detail: "Selección Paul Hobbs", year: "2018" },
  { number: "04", name: "Bodega Aleanna · El Gran Enemigo", detail: "Cabernet Franc de Altura", year: "2017" },
];

export default function CavaPage() {
  return (
    <>
      {/* ================================================================
          COVER
      ================================================================ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={IMG_CELLAR_HERO}
            alt="Cava subterránea con velas"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/70 via-surface/20 to-surface" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(12,10,9,0.85)_100%)]" />
          <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-malbec/20 blur-[160px] rounded-full animate-pulse-slow" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <Reveal as="div" className="flex items-center justify-center gap-4 text-[10px] tracking-[0.4em] uppercase text-bone-muted">
              <span className="h-px w-12 bg-gold" />
              <span className="text-gold">Vol. II — La Cava Subterránea</span>
              <span className="h-px w-12 bg-gold" />
            </Reveal>

            <h1 className="font-display text-[clamp(3rem,11vw,9rem)] leading-[0.88] text-bone tracking-[-0.04em]">
              <SplitText by="char" stagger={40}>Espíritus</SplitText>
              <br />
              <span className="italic font-normal text-gold/95 text-[clamp(2rem,7vw,5.5rem)]">
                <SplitText by="char" stagger={35} delay={500}>ancestrales.</SplitText>
              </span>
            </h1>

            <Reveal as="p" className="font-display italic text-xl md:text-2xl text-bone-muted leading-relaxed max-w-2xl mx-auto">
              Bajo las raíces de piedra de los Andes, curamos una selección que respira la altitud y el fuego de Mendoza.
            </Reveal>

            <Reveal as="div" className="flex items-center justify-center gap-6 pt-4">
              <span className="h-px w-24 bg-gradient-to-r from-transparent to-gold/40" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-bone-muted">
                720 etiquetas · 47 productores
              </span>
              <span className="h-px w-24 bg-gradient-to-l from-transparent to-gold/40" />
            </Reveal>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] tracking-[0.4em] uppercase text-bone">Descender</span>
          <span className="w-px h-12 bg-gradient-to-b from-bone via-bone/30 to-transparent" />
        </div>
      </section>

      {/* Marquee divider */}
      <section className="relative border-y border-white/[0.04] bg-surface-low/40 py-7">
        <Marquee
          speed={100}
          items={[
            "MALBEC DE ALTURA",
            "—",
            "TORRONTÉS DEL NORTE",
            "—",
            "BONARDA HISTÓRICA",
            "—",
            "CABERNET FRANC",
            "—",
            "SEMILLON OLD VINES",
            "—",
          ].map((p, i) => (
            <span key={i} className="font-display italic text-2xl md:text-3xl text-bone-muted/60 flex items-center gap-12">
              {p}
            </span>
          ))}
        />
      </section>

      {/* ================================================================
          I · SOMMELIER'S CHOICE (hero double-bezel)
      ================================================================ */}
      <section className="relative py-32 md:py-44 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal as="div" className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end mb-20">
            <div className="md:col-span-3">
              <div className="font-display italic text-[clamp(8rem,15vw,14rem)] leading-[0.8] text-gold/15 select-none">
                I
              </div>
            </div>
            <div className="md:col-span-9 space-y-5">
              <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                <span className="text-gold">Selección del Sommelier</span>
                <span className="w-8 h-px bg-slate-deep" />
                <span>Una sola botella, una sola noche</span>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-bone tracking-[-0.02em]">
                Gran Reserva{" "}
                <span className="italic text-gold/95">
                  <SplitText by="word" stagger={80}>Cóndor de los Andes</SplitText>
                </span>{" "}
                2017.
              </h2>
            </div>
          </Reveal>

          <Reveal as="div" className="bezel-shell">
            <div className="bezel-core grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 md:p-10 lg:p-14">
              {/* Image */}
              <div className="lg:col-span-5 relative group/img">
                <div className="absolute -inset-6 bg-gold/15 blur-3xl rounded-full opacity-50 group-hover/img:opacity-80 transition-opacity duration-1000" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={IMG_MALBEC_POUR}
                    alt="Malbec rubí intenso en copa de cristal"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover grayscale group-hover/img:grayscale-0 img-reveal"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-8">
                <div className="space-y-6">
                  <blockquote className="font-display italic text-2xl md:text-3xl text-bone-muted leading-relaxed">
                    &ldquo;Un testimonio a la altitud extrema del Valle de Uco. Esta cosecha ofrece una estructura profunda, equilibrando la complejidad de frutas oscuras con la mineralidad de la piedra de montaña.&rdquo;
                  </blockquote>
                  <div className="ridge w-32" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div>
                    <div className="eyebrow no-line text-[9.5px] mb-3">
                      Notas de Cata
                    </div>
                    <p className="text-sm text-bone-muted/90 font-light leading-relaxed">
                      Ciruela negra, hoja de tabaco y vainilla ahumada. Taninos aterciopelados con final de pizarra persistente.
                    </p>
                  </div>
                  <div>
                    <div className="eyebrow no-line text-[9.5px] mb-3">
                      Maridaje Insignia
                    </div>
                    <p className="text-sm text-bone-muted/90 font-light leading-relaxed">
                      Servir junto al Ojo de Bife Alma Cóndor, sellado sobre fuego de quebracho.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-white/[0.05]">
                  <span className="text-[9.5px] tracking-[0.3em] uppercase text-slate">
                    Cosecha
                  </span>
                  <span className="font-display text-3xl text-gold">2017</span>
                  <span className="w-px h-6 bg-slate-deep" />
                  <span className="text-[9.5px] tracking-[0.3em] uppercase text-slate">
                    Botellas
                  </span>
                  <span className="font-display text-3xl text-gold">012</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          II · MALBECS DE ALTURA
      ================================================================ */}
      <section className="relative py-32 md:py-44 px-6 md:px-10 bg-surface-low border-y border-white/[0.04] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-malbec/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto">
          <Reveal as="div" className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end mb-20">
            <div className="md:col-span-9 md:order-1 space-y-5">
              <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                <span className="text-gold">Cosechas de Altura</span>
                <span className="w-8 h-px bg-slate-deep" />
                <span>1.100 m → 1.500 m</span>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-bone tracking-[-0.02em]">
                Donde el{" "}
                <span className="italic text-gold/95">
                  <SplitText by="char" stagger={30}>Malbec</SplitText>
                </span>
                <br />
                respira con dificultad.
              </h2>
              <div className="ridge w-32" />
              <p className="font-display italic text-lg text-bone-muted leading-relaxed max-w-2xl">
                La colección definitiva de Malbec del Valle de Uco. Suelos calcáreos, noches frías, días intensos.
              </p>
            </div>
            <div className="md:col-span-3 md:order-2 text-right">
              <div className="font-display italic text-[clamp(8rem,15vw,14rem)] leading-[0.8] text-gold/15 select-none">
                II
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MALBECS.map((wine, i) => (
              <Reveal key={wine.name} direction={i === 0 ? "left" : i === 1 ? "up" : "right"} rootMargin="0px 0px -40px 0px">
                <article className="bezel-shell group/wine h-full">
                  <div className="bezel-core p-8 md:p-10 h-full flex flex-col gap-6 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/wine:bg-surface-high relative overflow-hidden">

                    {/* Animated gold left border */}
                    <div className="absolute left-0 top-0 w-[2px] h-0 bg-gradient-to-b from-gold via-gold/60 to-transparent group-hover/wine:h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />

                    {/* Year — big display */}
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display italic text-[4.5rem] leading-none text-gold/15 group-hover/wine:text-gold/25 transition-colors duration-700 select-none tabular-nums">
                        {wine.year}
                      </span>
                      {wine.tag && (
                        <span className="text-[9px] tracking-[0.25em] uppercase text-gold border border-gold/30 bg-gold/5 px-2.5 py-1 rounded-full shrink-0 mt-1">
                          {wine.tag}
                        </span>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-gold/30 via-white/[0.04] to-transparent group-hover/wine:from-gold/60 transition-all duration-700" />

                    {/* Name */}
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl md:text-3xl text-bone leading-tight group-hover/wine:text-shimmer transition-all duration-500">
                        {wine.name}
                      </h3>
                      <p className="font-display italic text-sm text-gold/60">
                        {wine.region}
                      </p>
                    </div>

                    {/* Notes */}
                    <p className="font-display italic text-sm text-bone-muted/80 leading-relaxed flex-1">
                      {wine.notes}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] mt-auto">
                      <span className="flex items-center gap-2 text-[9.5px] tracking-[0.25em] uppercase text-slate">
                        <span className="w-1 h-1 rounded-full bg-gold/50" />
                        {wine.altitude ?? "Valle de Uco"}
                      </span>
                      {wine.price ? (
                        <span className="font-display text-2xl text-gold tabular-nums">
                          {wine.price}
                        </span>
                      ) : (
                        <CondorMark size={14} className="text-gold/40 group-hover/wine:text-gold transition-colors duration-500" />
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          EDITORIAL BREAK — cava gallery
      ================================================================ */}
      <section className="relative py-24 md:py-36 px-6 md:px-10 border-y border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-malbec/10 blur-[160px] rounded-full" />
        </div>

        <div className="relative max-w-[1400px] mx-auto space-y-10">
          {/* Eyebrow */}
          <Reveal as="div" className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
            <span className="h-px w-8 bg-gold/50" />
            <span className="text-gold">La Cava · Alma Cóndor</span>
            <span className="h-px w-8 bg-gold/50" />
          </Reveal>

          {/* Main grid: large left + two stacked right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 items-stretch">

            {/* Large — cava-2 */}
            <Reveal as="div" direction="left" className="md:col-span-7">
              <div className="bezel-shell group h-full">
                <div className="bezel-core relative h-[400px] md:h-[600px] overflow-hidden">
                  <Image
                    src={IMG_CAVA_2}
                    alt="La cava subterránea de Alma Cóndor"
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    loading="lazy"
                    className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-[2200ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-surface/60 backdrop-blur-md border border-white/[0.08] px-3.5 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    <span className="text-[9px] tracking-[0.28em] uppercase text-bone/80">Subterránea</span>
                  </div>
                  <div className="absolute bottom-6 left-6 space-y-1">
                    <p className="text-[10px] tracking-[0.35em] uppercase text-gold/60">Mendoza · 1.450m</p>
                    <p className="font-display italic text-2xl md:text-3xl text-bone/95 leading-tight">
                      Donde el silencio<br />se vuelve vino.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Two stacked — cava-2 y cava-3 */}
            <div className="md:col-span-5 flex flex-col gap-4 md:gap-5">
              <Reveal as="div" direction="right">
                <div className="bezel-shell group">
                  <div className="bezel-core relative h-[190px] md:h-[290px] overflow-hidden">
                    <Image
                      src={IMG_CAVA_1}
                      alt="Cava de vinos Alma Cóndor"
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      loading="lazy"
                      className="object-cover object-center group-hover:scale-[1.05] transition-transform duration-[2000ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 right-4">
                      <span className="font-display italic text-gold/50 text-4xl select-none">01</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal as="div" direction="right" rootMargin="0px 0px -30px 0px">
                <div className="bezel-shell group">
                  <div className="bezel-core relative h-[190px] md:h-[290px] overflow-hidden">
                    <Image
                      src={IMG_CAVA_3}
                      alt="Botellas en la cava de Alma Cóndor"
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      loading="lazy"
                      className="object-cover object-center group-hover:scale-[1.05] transition-transform duration-[2000ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 right-4">
                      <span className="font-display italic text-gold/50 text-4xl select-none">02</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>

          {/* Caption */}
          <Reveal as="div" className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
            <p className="font-display italic text-bone/30 text-sm">
              720 etiquetas · curadas en cava propia · temperatura controlada.
            </p>
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold/40 shrink-0">
              Valle de Uco
            </span>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          III · BLANCOS DE MONTAÑA
      ================================================================ */}
      <section className="relative py-32 md:py-44 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal as="div" className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end mb-20">
            <div className="md:col-span-3">
              <div className="font-display italic text-[clamp(8rem,15vw,14rem)] leading-[0.8] text-gold/15 select-none">
                III
              </div>
            </div>
            <div className="md:col-span-9 space-y-5">
              <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                <span className="text-gold">Tierras Altas</span>
                <span className="w-8 h-px bg-slate-deep" />
                <span>Aguas del deshielo</span>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-bone tracking-[-0.02em]">
                Blancos
                <br />
                <span className="italic text-gold/95">de montaña.</span>
              </h2>
              <div className="ridge w-32" />
              <p className="font-display italic text-lg text-bone-muted leading-relaxed max-w-2xl">
                Las noches frías y las aguas del deshielo producen blancos de una frescura y elegancia extraordinarias.
              </p>
            </div>
          </Reveal>

          <Reveal as="div" mode="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLANCOS.map((wine) => (
              <article key={wine.name} className="group/blanco bezel-shell">
                <div className="bezel-core overflow-hidden">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={wine.image}
                      alt={wine.name}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/blanco:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
                  </div>
                  <div className="p-7 space-y-4">
                    <h3 className="font-display text-2xl text-bone leading-tight">
                      {wine.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold">
                      <span className="w-3 h-px bg-gold" />
                      {wine.region}
                    </div>
                    <p className="text-sm text-bone-muted leading-relaxed font-light">
                      {wine.notes}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          IV · COSECHAS ESPECIALES (editorial list)
      ================================================================ */}
      <section className="relative py-32 md:py-44 px-6 md:px-10 bg-surface-low border-y border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto">
          <Reveal as="div" className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end mb-20">
            <div className="md:col-span-9 md:order-1 space-y-5">
              <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                <span className="text-gold">Vault</span>
                <span className="w-8 h-px bg-slate-deep" />
                <span>Cosechas raras · acceso restringido</span>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-bone tracking-[-0.02em]">
                Cosechas
                <br />
                <span className="italic text-gold/95">especiales.</span>
              </h2>
            </div>
            <div className="md:col-span-3 md:order-2 text-right">
              <div className="font-display italic text-[clamp(8rem,15vw,14rem)] leading-[0.8] text-gold/15 select-none">
                IV
              </div>
            </div>
          </Reveal>

          <Reveal as="div" mode="stagger" className="bezel-shell">
            <div className="bezel-core divide-y divide-white/[0.05]">
              {COSECHAS_ESPECIALES.map((wine) => (
                <a
                  key={wine.number}
                  href="#"
                  className="group/row block px-6 md:px-10 py-7 hover:bg-surface-high transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-6 md:gap-10">
                      <span className="font-display italic text-2xl text-gold/40 tabular-nums">
                        {wine.number}
                      </span>
                      <h3 className="font-display text-xl md:text-3xl text-bone group-hover/row:text-gold transition-colors duration-500">
                        {wine.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-6 md:gap-10 ml-12 md:ml-0">
                      <span className="text-[10px] md:text-xs italic text-bone-muted hidden md:inline">
                        {wine.detail}
                      </span>
                      <span className="font-display text-2xl md:text-3xl text-gold tabular-nums">
                        {wine.year}
                      </span>
                      <span className="text-gold transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/row:translate-x-2">
                        →
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] md:hidden tracking-[0.25em] uppercase text-bone-muted mt-2 ml-12">
                    {wine.detail}
                  </p>
                </a>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================================================================
          CLOSING — Cinematic invitation
      ================================================================ */}
      <section className="relative py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-malbec/20 blur-[140px] rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
            <CondorMark size={900} className="text-gold" />
          </div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal as="div" mode="stagger" className="space-y-10">
            <CondorMark size={36} className="text-gold mx-auto" />

            <blockquote className="font-display italic text-3xl md:text-5xl text-bone leading-[1.15]">
              &ldquo;Cada copa cuenta la historia
              <br />
              <span className="text-gold/95">
                de una montaña.&rdquo;
              </span>
            </blockquote>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button href="/menu" variant="ghost" size="lg">
                Ver Carta
              </Button>
              <Button href="/reservas" variant="gold" size="lg">
                Reservar Mesa
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
