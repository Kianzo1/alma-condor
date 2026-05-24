/**
 * Global film-grain overlay.
 * Fixed positioned, pointer-events-none, mounted once in root layout.
 * Gives the entire site a tactile "physical paper" feel without
 * adding GPU work to scroll containers.
 */
export function NoiseOverlay() {
  return <div className="grain-fixed" aria-hidden="true" />;
}
