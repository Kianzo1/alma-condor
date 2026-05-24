import Link from "next/link";
import { CondorMark } from "./CondorMark";

const FOOTER_LINKS = {
  visitar: {
    label: "Visitar",
    links: [
      { href: "/menu", label: "La Carta" },
      { href: "/cava", label: "La Cava" },
      { href: "/reservas", label: "Reservar" },
      { href: "/nosotros", label: "Nuestra Historia" },
    ],
  },
  contacto: {
    label: "Contacto",
    links: [
      { href: "tel:+542614500000", label: "+54 261 450 0000" },
      { href: "mailto:reservas@almacondor.com.ar", label: "reservas@almacondor.com.ar" },
      { href: "https://maps.google.com", label: "Ruta 7 · Luján de Cuyo, Mendoza" },
    ],
  },
  social: {
    label: "Cultura",
    links: [
      { href: "https://instagram.com", label: "Instagram" },
      { href: "https://facebook.com", label: "Facebook" },
      { href: "/prensa", label: "Prensa & Reconocimientos" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.04] bg-surface-lowest overflow-hidden">
      {/* Top centerpiece — Cóndor mark divider */}
      <div className="absolute -top-px inset-x-0 flex items-center justify-center pointer-events-none">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-deep to-transparent" />
        <div className="px-8 py-6 bg-surface-lowest -mt-2">
          <CondorMark size={36} className="text-gold/50" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-deep to-transparent" />
      </div>

      {/* Atmospheric */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-malbec/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-16">
        {/* Top: massive brand block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Brand */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="inline-flex items-center gap-3 group/brand">
              <CondorMark
                size={36}
                className="text-bone transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/brand:text-gold group-hover/brand:rotate-[-8deg]"
              />
              <span className="font-display text-2xl tracking-[0.18em] uppercase text-bone group-hover/brand:text-gold transition-colors duration-500">
                Alma Cóndor
              </span>
            </Link>

            <p className="font-display italic text-2xl md:text-3xl text-bone-muted leading-[1.2] max-w-md tracking-[-0.01em]">
              El alma del cóndor habita en cada brasa de los Andes.
            </p>

            <div className="flex items-center gap-6 text-[10px] tracking-[0.3em] uppercase text-slate">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                Hogar encendido
              </span>
              <span className="w-px h-3 bg-slate-deep" />
              <span>19:00 → 00:00</span>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {Object.entries(FOOTER_LINKS).map(([key, section]) => (
              <div key={key} className="space-y-5">
                <h3 className="eyebrow no-line text-[9.5px]">
                  {section.label}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group/link inline-flex items-center gap-2 text-sm text-bone-muted hover:text-gold transition-colors duration-500"
                      >
                        <span className="w-0 group-hover/link:w-3 h-px bg-gold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Massive editorial signature */}
        <div className="border-y border-white/[0.04] py-12 my-12">
          <div className="font-display italic text-[clamp(3rem,12vw,10rem)] leading-[0.85] text-bone/[0.08] tracking-[-0.04em] text-center select-none">
            Alma · Cóndor
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] tracking-[0.3em] uppercase">
          <p className="text-slate">
            © {new Date().getFullYear()} Alma Cóndor · Fuego ancestral, terruño sagrado
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="text-bone-muted hover:text-gold transition-colors duration-500">
              Privacidad
            </Link>
            <span className="w-px h-3 bg-slate-deep" />
            <Link href="/terminos" className="text-bone-muted hover:text-gold transition-colors duration-500">
              Términos
            </Link>
            <span className="w-px h-3 bg-slate-deep" />
            <span className="text-bone-muted">Mendoza · AR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
