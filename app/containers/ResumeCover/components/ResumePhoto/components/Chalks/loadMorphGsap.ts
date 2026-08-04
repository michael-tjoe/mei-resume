import { loadGsap, type Gsap } from '@/hooks/loadGsap';

export type { Gsap };

/** Module-level cache — MorphSVG loads once across Game/Mic/Paint (js-cache-function-results). */
let morphGsapPromise: Promise<Gsap> | null = null;

/**
 * Lazy-load GSAP + MorphSVGPlugin only when a chalk first morphs (bundle-conditional).
 * Registers MorphSVG once for the whole Chalks chunk.
 */
export function loadMorphGsap(): Promise<Gsap> {
  morphGsapPromise ??= Promise.all([
    loadGsap(),
    import('gsap/MorphSVGPlugin'),
  ]).then(([gsap, { MorphSVGPlugin }]) => {
    gsap.registerPlugin(MorphSVGPlugin);
    return gsap;
  });
  return morphGsapPromise;
}
