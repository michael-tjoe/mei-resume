export type Gsap = typeof import('gsap').default;

/** Module-level cache so every decoration shares one dynamic import (js-cache-function-results). */
let gsapPromise: Promise<Gsap> | null = null;

/** Lazy-load GSAP only when an animation starts (bundle-conditional). */
export function loadGsap(): Promise<Gsap> {
  gsapPromise ??= import('gsap').then((mod) => mod.default);
  return gsapPromise;
}
