const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** Whether the user prefers reduced motion (client-only). */
export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
