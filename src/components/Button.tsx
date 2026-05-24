import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "gold" | "minimal";
  size?: "sm" | "md" | "lg";
  /** Show the nested arrow island on the right side. */
  arrow?: boolean;
  className?: string;
};

/**
 * Premium button with Button-in-Button trailing arrow island.
 * Hover physics: button compresses slightly, arrow translates +
 * scales inside its own enclosure (kinetic tension).
 *
 * Transitions use --ease-cinematic for Apple/Linear-tier mass.
 */

const baseClasses = [
  "btn-magnetic group/btn relative inline-flex items-center justify-center",
  "font-body font-semibold uppercase whitespace-nowrap select-none",
  "rounded-full overflow-hidden",
  "transition-[transform,background,border-color,color,box-shadow] duration-700",
  "ease-[cubic-bezier(0.32,0.72,0,1)]",
  "active:scale-[0.97]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-surface",
].join(" ");

const sizeClasses = {
  sm: "h-10 pl-5 pr-1.5 text-[10px] tracking-[0.2em] gap-3",
  md: "h-12 pl-6 pr-1.5 text-[11px] tracking-[0.22em] gap-4",
  lg: "h-14 pl-8 pr-2 text-[12px] tracking-[0.25em] gap-5",
};

const sizeNoArrow = {
  sm: "h-10 px-6 text-[10px] tracking-[0.2em]",
  md: "h-12 px-8 text-[11px] tracking-[0.22em]",
  lg: "h-14 px-10 text-[12px] tracking-[0.25em]",
};

const variantClasses = {
  primary: [
    "bg-malbec text-bone border border-malbec",
    "hover:bg-malbec-soft hover:border-malbec-glow",
    "hover:shadow-[0_8px_40px_-12px_rgba(255,179,173,0.45),inset_0_1px_0_rgba(255,179,173,0.18)]",
    "shadow-[inset_0_1px_0_rgba(255,179,173,0.1),inset_0_-1px_0_rgba(0,0,0,0.3)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-bone",
    "border border-slate-deep/80",
    "hover:border-gold hover:text-gold",
    "hover:bg-gold/5",
  ].join(" "),
  gold: [
    "bg-gold text-on-malbec border border-gold-deep",
    "hover:bg-gold-bright",
    "hover:shadow-[0_8px_40px_-12px_rgba(234,195,73,0.55),inset_0_1px_0_rgba(255,255,255,0.25)]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.15)]",
  ].join(" "),
  minimal: [
    "bg-transparent text-bone border border-transparent",
    "hover:text-gold",
  ].join(" "),
};

const islandClasses = {
  primary: "bg-malbec-glow/15 ring-1 ring-malbec-glow/30 text-bone",
  ghost: "bg-bone/5 ring-1 ring-slate-deep group-hover/btn:bg-gold/15 group-hover/btn:ring-gold/40 group-hover/btn:text-gold",
  gold: "bg-on-malbec/15 ring-1 ring-on-malbec/25 text-on-malbec",
  minimal: "bg-transparent ring-0",
};

const islandSizes = {
  sm: "w-8 h-8",
  md: "w-9 h-9",
  lg: "w-10 h-10",
};

function ArrowIsland({
  variant,
  size,
}: {
  variant: NonNullable<CommonProps["variant"]>;
  size: NonNullable<CommonProps["size"]>;
}) {
  return (
    <span
      className={`shrink-0 rounded-full flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/btn:scale-105 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px ${islandSizes[size]} ${islandClasses[variant]}`}
      aria-hidden="true"
    >
      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/btn:translate-x-px">
        <path d="M1 5H11M11 5L7 1M11 5L7 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

type ButtonProps = CommonProps & ComponentPropsWithoutRef<"button"> & { href?: undefined };
type LinkButtonProps = CommonProps & { href: string };

export function Button(props: ButtonProps | LinkButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    arrow = true,
    className = "",
    ...rest
  } = props;

  const sizeCls = arrow ? sizeClasses[size] : sizeNoArrow[size];
  const classes = `${baseClasses} ${sizeCls} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && <ArrowIsland variant={variant} size={size} />}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href } = rest;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    if (isExternal) {
      return (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className={classes}>
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {content}
    </button>
  );
}
