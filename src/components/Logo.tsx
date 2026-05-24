import Link from "next/link";
import { CondorMark } from "./CondorMark";

type LogoProps = {
  variant?: "default" | "compact";
  className?: string;
};

export function Logo({ variant = "default", className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Alma Cóndor — Inicio"
    >
      <CondorMark
        size={variant === "compact" ? 28 : 36}
        className="text-bone transition-colors duration-500 group-hover:text-gold"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-[0.18em] uppercase text-bone transition-colors duration-500 group-hover:text-gold">
          Alma Cóndor
        </span>
        {variant === "default" && (
          <span className="mt-1 font-body text-[10px] tracking-[0.3em] uppercase text-slate">
            Mendoza · Argentina
          </span>
        )}
      </span>
    </Link>
  );
}
