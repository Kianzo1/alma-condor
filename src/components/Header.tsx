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

// Desktop nav only shows these (no Reservar — that lives in hamburger + mobile)
const DESKTOP_NAV = NAV_LINKS.filter((l) => l.href !== "/reservas");

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ============================================================
          HEADER — Full-width editorial, collapses on scroll
      ============================================================ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled
            ? "bg-[#080605]/90 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        {/* Inner container */}
        <div
          className={`max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled ? "h-[60px]" : "h-[80px] md:h-[96px]"
          }`}
        >
          {/* ---- BRAND ---- */}
          <Link
            href="/"
            className="group flex items-center gap-3.5 select-none"
            aria-label="Alma Cóndor — Inicio"
          >
            <CondorMark
              size={scrolled ? 18 : 24}
              className="text-bone group-hover:text-gold shrink-0 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            />
            <div className="overflow-hidden flex flex-col justify-center">
              {/* Name */}
              <span
                className={`font-body font-bold uppercase tracking-[0.3em] text-bone group-hover:text-gold leading-none transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  scrolled ? "text-[10.5px]" : "text-[12.5px] md:text-[13.5px]"
                }`}
              >
                Alma Cóndor
              </span>
              {/* Sub-label — fades away on scroll */}
              <span
                className={`font-body font-light uppercase tracking-[0.22em] text-bone/35 leading-none mt-1 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  scrolled
                    ? "opacity-0 -translate-y-2 h-0 mt-0 pointer-events-none"
                    : "opacity-100 translate-y-0 text-[8px] md:text-[8.5px]"
                }`}
              >
                Parrilla · Cava · Mendoza
              </span>
            </div>
          </Link>

          {/* ---- DESKTOP NAV — clean text only, no Reservar, no indicators ---- */}
          <nav
            className="hidden lg:flex items-center"
            aria-label="Navegación principal"
          >
            {DESKTOP_NAV.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-3 text-[10.5px] font-semibold tracking-[0.24em] uppercase transition-colors duration-500 ${
                    active
                      ? "text-bone"
                      : "text-bone/70 hover:text-bone"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ---- RIGHT ACTIONS — hamburger only on desktop ---- */}
          <div className="flex items-center gap-2">
            {/* Hamburger — only on mobile/tablet, hidden on desktop */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="w-10 h-10 flex items-center justify-center ml-1 lg:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              <span className="relative w-[22px] h-4 flex flex-col justify-between">
                {/* Top line */}
                <span
                  className={`block h-px w-full bg-bone transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${
                    open ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                {/* Middle line */}
                <span
                  className={`block h-px bg-bone transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    open ? "w-0 opacity-0 self-center" : "w-[14px] opacity-100 self-end"
                  }`}
                />
                {/* Bottom line */}
                <span
                  className={`block h-px w-full bg-bone transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${
                    open ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Hairline separator — materializes on scroll */}
        <div
          aria-hidden="true"
          className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-700 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.18) 20%, rgba(255,255,255,0.06) 50%, rgba(212,175,55,0.18) 80%, transparent 100%)",
          }}
        />
      </header>

      {/* ============================================================
          FULL-SCREEN OVERLAY MENU
      ============================================================ */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#080605]/92 backdrop-blur-3xl" />

        {/* Malbec glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-malbec/20 rounded-full blur-[160px] pointer-events-none" />

        {/* Giant condor watermark */}
        <div className="absolute inset-0 flex items-center justify-end pr-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <CondorMark size={800} className="text-gold -mr-32" />
        </div>

        {/* Grid layout — left index + right big links */}
        <div className="relative h-full max-w-[1440px] mx-auto px-8 md:px-14 flex flex-col justify-center">

          {/* Top strip */}
          <div
            className={`flex items-center gap-4 mb-16 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: open ? "80ms" : "0ms" }}
          >
            <span className="w-6 h-px bg-gold/40" />
            <span className="eyebrow no-line text-[9px]">Menú de Navegación</span>
          </div>

          {/* Nav links — staggered curtain rise */}
          <nav className="flex flex-col gap-1 md:gap-0">
            {NAV_LINKS.map((link, i) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`group/nav relative w-fit transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    open
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-14"
                  }`}
                  style={{
                    transitionDelay: open ? `${180 + i * 70}ms` : "0ms",
                  }}
                >
                  {/* Index number */}
                  <span className="absolute left-0 top-[0.65em] text-[9px] font-body tracking-[0.25em] text-gold/40 -translate-x-8 hidden md:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Link text */}
                  <span
                    className={`font-display italic text-[clamp(3rem,9vw,8rem)] leading-[1.0] tracking-[-0.02em] transition-colors duration-500 ${
                      active
                        ? "text-gold"
                        : "text-bone/80 group-hover/nav:text-bone"
                    }`}
                  >
                    {link.label}
                  </span>
                  {/* Hover underline */}
                  <span className="absolute bottom-1 left-0 right-0 h-px bg-gold/30 scale-x-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/nav:scale-x-100" />
                </Link>
              );
            })}
          </nav>

          {/* Bottom strip */}
          <div
            className={`mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/[0.05] pt-8 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: open ? "560ms" : "0ms" }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-bone/30">
              Ruta 7 · Luján de Cuyo · Mendoza · Argentina
            </span>
            <span className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-bone/30">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-pulse shrink-0" />
              Hogar encendido · 19:00 → 00:00
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
