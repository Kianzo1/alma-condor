import Image from "next/image";
import type { Metadata } from "next";
import { CondorMark } from "@/components/CondorMark";
import { ReservationForm } from "@/components/ReservationForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Reservas · El Hogar Ancestral",
  description:
    "Asegurá tu lugar junto al fuego. Reservas limitadas para preservar la intimidad de la experiencia Alma Cóndor.",
};

const IMG_INTERIOR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAEhK4kCv7oGWl_ujUNikwFvB3Ra_rvXy_QQ2HBky23Ezs_20d8K8qvvuNGHB0M8vVoaqENWq28Pf8FVdf2-AMBQxezVA8HDEgDplGHyzOBjP_FKbzljBflZvgTf_7K1RTIDnuW75iRqjotONHHgt4mAnHTI2DMihiWFsABHCYsz67keidgXiI98MHMFZ9R00rYC00zeonUpA8ZJBXYPbz8_ReYVbVm-HaPViZLGo5fTBo4I-1j56RjSGA9jg-JQEhxXe_CSTu2BYBS";

const IMG_VINTAGE_CELLAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDtpZHHI_ISpY-DiHQzhcfJWJ3wVIFXqEd9l7CX3roytqcpKtRKWmYqjksOj4vxHpmRMzHNaa53jOxz3eQLIDjXwAi7ZgjXaGxlezekhMGtqcrEqVrLew_Hpqn-oqVQrrK2IXOPjOofTWGHzkenKUzXPQf01LzY4WHUvO0rbf46_0FpDz_xKpFZzqI5XbFw9dLfak4Kt8h-1bqkRK_djjacLfWfLyO7IgdVk2sOWKgjPgjj08F9cXwk7YvHwwJHhphjNlbFo88eSPI0";

const IMG_VINEYARD =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCKXtg84vC1HCVeV09zJgMr2QOZo2xtAOWdNzCBw8Q4zHxFKm6mKf9AWxZFjyVR7KMv4p_s3D5DX3EpQLUyYzzRU1oq6ckaRaEhH5ANv-2aqpsBNxb3vjRwchFx4BbQG1XoL8Vs3WL9EF9I_ZVKdKYiPdIuzTOSQZk9kIFtPA9fNKtexVej9VpMSMmeyRPZI6Ly7JaMiisgN6fDTZeNgO283As69EZJxuKni7JlJ_Jm1br0yMasqInA8dPCYMfyJyJHwkia2vBskHc6";

const EXPERIENCE_ITEMS = [
  { value: "2.5h", label: "Duración", detail: "Para el ritual completo del fuego y maridaje" },
  { value: "12+", label: "Edad mínima", detail: "Experiencia diseñada para mayores de 12 años" },
  { value: "06", label: "Tiempos", detail: "Curados por el Chef Mateo Salvatierra" },
];

export default function ReservasPage() {
  return (
    <>
      {/* ================================================================
          HERO — Editorial split
      ================================================================ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-malbec/15 blur-[160px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/[0.08] blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left — typography */}
            <Reveal as="div" mode="stagger" className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                <span className="text-gold">III</span>
                <span className="w-8 h-px bg-slate-deep" />
                <span>Reserva Privada</span>
              </div>

              <h1 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.88] text-bone tracking-[-0.03em]">
                Tu lugar
                <br />
                <span className="italic font-normal text-gold/95">
                  junto al hogar
                </span>
                <br />
                ancestral.
              </h1>

              <p className="font-display italic text-lg md:text-xl text-bone-muted leading-relaxed max-w-xl">
                Viví el ritual del fuego y el vino en el corazón de Mendoza. Ya sea contemplando los picos andinos o junto a nuestra parrilla catedral, cada reserva es una invitación a un legado de sabor.
              </p>

              {/* Live availability indicator */}
              <div className="inline-flex items-center gap-3 rounded-full bezel-shell">
                <div className="bezel-core px-5 py-2.5 rounded-full">
                  <span className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase">
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    <span className="text-bone-muted">3 mesas disponibles esta noche</span>
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Right — interior image */}
            <Reveal as="div" className="lg:col-span-5 relative">
              <div className="bezel-shell">
                <div className="bezel-core relative aspect-[4/5]">
                  <Image
                    src={IMG_INTERIOR}
                    alt="Interior del restaurante con vista a los Andes"
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/40 to-transparent" />
                  {/* Floating label */}
                  <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-surface/85 backdrop-blur-md border border-white/[0.06] p-4">
                    <div className="flex items-center gap-3">
                      <CondorMark size={20} className="text-gold shrink-0" />
                      <div>
                        <div className="text-[9.5px] tracking-[0.3em] uppercase text-bone-muted">
                          La Catedral del Fuego
                        </div>
                        <div className="font-display italic text-base text-bone">
                          22 cubiertos por noche
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating year tag */}
              <div className="absolute -top-4 -right-4 bezel-shell rotate-[4deg] hidden md:block">
                <div className="bezel-core px-4 py-2.5">
                  <span className="font-display italic text-base text-gold">
                    Est. MMXXV
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          EXPERIENCE STATS strip
      ================================================================ */}
      <section className="relative px-6 md:px-10 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal as="div" mode="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {EXPERIENCE_ITEMS.map((item) => (
              <article key={item.label} className="bezel-shell">
                <div className="bezel-core p-7 flex items-start gap-5">
                  <span className="font-display text-4xl md:text-5xl text-gold tabular-nums leading-none">
                    {item.value}
                  </span>
                  <div className="space-y-2 mt-1">
                    <div className="eyebrow no-line text-[9.5px]">
                      {item.label}
                    </div>
                    <p className="text-sm text-bone-muted/90 leading-relaxed font-light">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          RESERVATION FORM — Giant double-bezel container
      ================================================================ */}
      <section id="reserva" className="relative px-6 md:px-10 pb-32 md:pb-44">
        <div className="max-w-[1400px] mx-auto">
          <Reveal as="div" className="bezel-shell">
            <div className="bezel-core grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
              {/* Left context panel */}
              <aside className="bg-surface-high p-10 md:p-14 flex flex-col justify-between gap-12 border-b lg:border-b-0 lg:border-r border-white/[0.04]">
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <CondorMark size={28} className="text-gold" />
                    <h3 className="font-display text-2xl text-bone">
                      La Experiencia
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="eyebrow no-line text-[9.5px] mb-2">
                        Vestimenta
                      </div>
                      <p className="text-sm text-bone-muted/90 font-light leading-relaxed">
                        Smart casual de montaña. Cálido, cómodo, sin requisitos formales.
                      </p>
                    </div>
                    <div>
                      <div className="eyebrow no-line text-[9.5px] mb-2">
                        Política de cancelación
                      </div>
                      <p className="text-sm text-bone-muted/90 font-light leading-relaxed">
                        Cancelación gratuita hasta 24 horas antes. Garantía con tarjeta.
                      </p>
                    </div>
                    <div>
                      <div className="eyebrow no-line text-[9.5px] mb-2">
                        Ambientes disponibles
                      </div>
                      <p className="text-sm text-bone-muted/90 font-light leading-relaxed">
                        Terraza panorámica · Catedral del Fuego · Cava Privada.
                      </p>
                    </div>
                  </div>
                </div>

                <blockquote className="pt-8 border-t border-white/[0.05] space-y-3">
                  <p className="font-display italic text-lg text-bone-muted leading-relaxed">
                    &ldquo;El fuego es el alma de la montaña; el vino, su latido.&rdquo;
                  </p>
                  <footer className="text-[10px] tracking-[0.3em] uppercase text-slate">
                    — Chef Mateo Salvatierra
                  </footer>
                </blockquote>
              </aside>

              {/* Right form */}
              <div className="lg:col-span-2 p-8 md:p-12 lg:p-14">
                <header className="mb-10 space-y-3">
                  <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
                    <span className="text-gold">Reservar</span>
                    <span className="w-8 h-px bg-slate-deep" />
                    <span>~ 2 min</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl text-bone leading-tight tracking-[-0.02em]">
                    Asegurá{" "}
                    <span className="italic text-gold/95">tu mesa</span>
                  </h2>
                  <p className="text-sm text-bone-muted/90 font-light">
                    Te confirmamos por email en menos de 24hs.
                  </p>
                </header>
                <ReservationForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          EL VIAJE DEL TERROIR — bento with double-bezel
      ================================================================ */}
      <section className="relative py-32 md:py-44 px-6 md:px-10 bg-surface-low border-y border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none">
          <CondorMark size={800} className="text-bone" />
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          <Reveal as="div" className="text-center mb-20 space-y-5">
            <div className="flex items-center justify-center gap-4 text-[10px] tracking-[0.3em] uppercase text-bone-muted">
              <span className="text-gold">Incluido</span>
              <span className="w-8 h-px bg-slate-deep" />
              <span>Con tu reserva</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-bone tracking-[-0.02em]">
              El viaje del{" "}
              <span className="italic text-gold/95">terroir.</span>
            </h2>
            <div className="ridge w-32 mx-auto" />
          </Reveal>

          <Reveal as="div" mode="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-5 md:auto-rows-[minmax(0,1fr)] md:h-[520px]">
            {/* Card 1: Vintage Cellar */}
            <article className="group bezel-shell">
              <div className="bezel-core relative h-full min-h-[280px] overflow-hidden">
                <Image
                  src={IMG_VINTAGE_CELLAR}
                  alt="Cava de cosechas raras"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-[1500ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-surface/30 to-transparent" />
                <div className="absolute inset-0 p-7 flex flex-col justify-end space-y-3">
                  <span className="eyebrow text-[9.5px]">Acceso Exclusivo</span>
                  <h4 className="font-display text-3xl text-bone leading-tight">
                    Cava de 1924
                  </h4>
                  <p className="text-xs text-bone-muted leading-relaxed">
                    Acceso libre a nuestra reserva histórica durante tu visita.
                  </p>
                </div>
              </div>
            </article>

            {/* Card 2: Vineyard — large */}
            <article className="md:col-span-2 group bezel-shell">
              <div className="bezel-core relative h-full min-h-[280px] overflow-hidden">
                <Image
                  src={IMG_VINEYARD}
                  alt="Viñedo al pie de los Andes"
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-cover opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-[1500ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-surface/20 to-transparent" />

                <div className="absolute top-6 right-6">
                  <span className="rounded-full bg-gold text-on-malbec text-[10px] font-semibold tracking-[0.25em] uppercase px-4 py-2">
                    Maridaje Insignia
                  </span>
                </div>

                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end space-y-4 max-w-2xl">
                  <h4 className="font-display italic text-3xl md:text-5xl text-bone leading-[1.05]">
                    Mountain Sourced.
                  </h4>
                  <p className="text-base text-bone-muted/90 font-light leading-relaxed max-w-md">
                    Nuestros chefs colaboran con agricultores de altura para traer los sabores más puros de la región a tu mesa.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
