type CondorMarkProps = {
  className?: string;
  size?: number;
  /** Color of the silhouette. Defaults to currentColor. */
  color?: string;
};

/**
 * Alma Cóndor — Brand mark.
 *
 * A stylized condor in flight, designed to read at any size.
 * Silhouette is sharp-terminaled (per DESIGN.md: "Icons and motifs
 * should maintain sharp, precise terminals to reflect craftsmanship").
 */
export function CondorMark({ className, size = 32, color }: CondorMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill={color ?? "currentColor"}
      className={className}
      aria-hidden="true"
    >
      {/* Body */}
      <path d="M32 30c-1.6 0-3 1.3-3 2.9 0 1.3.8 2.3 2 2.7v3.8c0 .6.5 1.1 1 1.1s1-.5 1-1.1v-3.8c1.2-.4 2-1.5 2-2.7 0-1.6-1.4-2.9-3-2.9z" />
      {/* Head + beak */}
      <path d="M32 24.5c-1.3 0-2.4 1-2.4 2.3 0 1 .6 1.8 1.4 2.1l-.5 1.4 1.5-.6 1.5.6-.5-1.4c.8-.3 1.4-1.1 1.4-2.1 0-1.3-1.1-2.3-2.4-2.3z" />
      {/* Left wing — large editorial sweep */}
      <path d="M30 32.5C26 28 19 26 11 28c-2 .5-3 1.5-3 2 0 .6 1 .8 2.5.5C16 29.2 22 30.5 26 33c1.5 1 2.5 2 3 3 .5-.8 1-1.6 1-3.5z" />
      {/* Right wing */}
      <path d="M34 32.5C38 28 45 26 53 28c2 .5 3 1.5 3 2 0 .6-1 .8-2.5.5C48 29.2 42 30.5 38 33c-1.5 1-2.5 2-3 3-.5-.8-1-1.6-1-3.5z" />
      {/* Tail */}
      <path d="M32 40v3l-1.5 2h3z" />
    </svg>
  );
}
