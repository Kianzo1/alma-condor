"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CondorMark } from "./CondorMark";
import { Button } from "./Button";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "La Carta" },
  { href: "/cava", label: "La Cava" },
  { href: "/reservas", label: "Reservar" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeOverlay = () => setOpen(false);

  return (
    <>
      {/* ============ Floating Island Nav ============ */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled ? "top-4" : "top-6"
        }`}
      >
        {/* Outer shell (Double-Bezel) */}
        <div
          className={`relative rounded-full p-1 border border-white/[0.06] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? "bg-white/[0.03] backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]"
              : "bg-transparent"
          }`}
        >
          {/* Inner core */}
          <div className="flex items-center gap-2 rounded-full">
            {/* Brand mark */}
            <Link
              href="/"
              className="group/brand flex items-center gap-2.5 pl-4 pr-2 py-2 rounded-full transition-colors duration-500"
              aria-label="Alma Cóndor"
            >
              <CondorMark
                size={22}
                className="text-bone transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/brand:text-gold group-hover/brand:rotate-[-8deg]"
              />
              <span className="hidden sm:flex flex-col leading-none">
                <span className="font-display text-[13px] tracking-[0.22em] uppercase text-bone group-hover/brand:text-gold transition-colors duration-500">
                  Alma Cóndor
                </span>
              </span>
            </Link>

            {/* Hairline divider */}
            <span className="hidden lg:block h-6 w-px bg-white/[0.08]" />

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 px-1">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group/link relative px-3.5 py-2 rounded-full text-[10.5px] font-semibold tracking-[0.22em] uppercase transition-colors duration-500 ${
                      active ? "text-gold" : "text-bone-muted hover:text-bone"
                    }`}
                  >
                    {/* Active dot */}
                    {active && (
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gold" />
                    )}
                    <span className={active ? "pl-2" : ""}>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-1.5 pl-1 pr-1">
              <div className="hidden md:block">
                <Button
                  href="/reservas"
                  variant="primary"
                  size="sm"
                  arrow
                  className="!h-9"
                >
                  Reservar
                </Button>
              </div>

              {/* Hamburger — morphs to X */}
              <button
                onClick={() => setOpen((v) => !v)}
                className="relative w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center transition-colors duration-500"
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={open}
              >
                <span className="relative w-4 h-4 flex items-center justify-center">
                  <span
                    className={`absolute h-px bg-bone transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      open ? "w-4 rotate-45" : "w-4 -translate-y-1.5"
                    }`}
                  />
                  <span
                    className={`absolute h-px bg-bone transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      open ? "w-0 opacity-0" : "w-4 opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute h-px bg-bone transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      open ? "w-4 -rotate-45" : "w-3 translate-y-1.5"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ============ Full-screen Overlay Menu ============ */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-surface/85 backdrop-blur-3xl" />

        {/* Ambient malbec glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-malbec/20 rounded-full blur-[140px]" />

        {/* Subtle condor centerpiece */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <CondorMark size={720} className="text-gold" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-6">
          <span
            className={`eyebrow no-line mb-12 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: open ? "120ms" : "0ms" }}
          >
            Navegación
          </span>

          <nav className="flex flex-col items-center gap-2 md:gap-3">
            {NAV_LINKS.map((link, i) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeOverlay}
                  className={`group/nav font-display italic text-5xl md:text-7xl leading-none transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  } ${
                    active
                      ? "text-gold"
                      : "text-bone hover:text-gold-bright"
                  }`}
                  style={{
                    transitionDelay: open
                      ? `${200 + i * 80}ms`
                      : "0ms",
                  }}
                >
                  <span className="relative inline-flex items-center gap-6">
                    <span className="text-[10px] not-italic font-body font-semibold tracking-[0.3em] text-gold/60 self-start mt-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold scale-x-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/nav:scale-x-100" />
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Footer line in overlay */}
          <div
            className={`absolute bottom-12 left-0 right-0 px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.3em] uppercase text-slate transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: open ? "600ms" : "0ms" }}
          >
            <span>Ruta 7 · Luján de Cuyo · Mendoza</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Hogar encendido · 19:00 → 00:00
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
