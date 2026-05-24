/**
 * Hand-tuned SVG iconography for Alma Cóndor.
 * Sharp terminals, hairline strokes — matches the
 * "editorial luxury" voice. No emoji, no fontello.
 */

type IconProps = {
  size?: number;
  className?: string;
};

/** Mountain peaks — used for "Terraza" seating */
export function MountainIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 18.5L9 8L13 14L16 11L21 18.5H3Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="6" r="1.2" fill="currentColor" />
    </svg>
  );
}

/** Flame — used for "Hogar" seating */
export function FlameIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21c-3.5 0-6-2.4-6-5.8 0-2.5 1.5-4.5 3-6.2.5.8 1 1.3 1.7 1.3 1 0 1.3-1 1.3-2.5 0-1.2-.4-2.5-1-3.8 2.5 1 6 3.8 6 8 0 4-2.5 9-5 9z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Crystal / diamond — used for "Cava Privada" */
export function CrystalIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 9l6-6 6 6-6 12-6-12z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M6 9h12M12 3v18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small star / spark — used for badges and ornaments */
export function SparkIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

/** Hexagon (insignia-style ornament) */
export function HexagonIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2L21 7v10l-9 5-9-5V7l9-5z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Slim arrow — for inline links */
export function ArrowRightIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 12h14M14 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
