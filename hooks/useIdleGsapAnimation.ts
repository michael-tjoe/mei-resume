'use client';

import { useEffect, useEffectEvent, useRef } from 'react';
import { prefersReducedMotion } from '@/helpers/prefersReducedMotion';
import { loadGsap, type Gsap } from '@/hooks/loadGsap';
import { cancelIdle, scheduleIdle } from '@/hooks/scheduleIdle';

export type IdleGsapAnimate = (gsap: Gsap, el: HTMLDivElement) => void;

/**
 * Runs a GSAP setup on idle after mount.
 * - Skips when prefers-reduced-motion
 * - Loads GSAP once via cached dynamic import (bundle-conditional)
 * - Uses useEffectEvent so animate identity does not re-run the effect (advanced-use-latest)
 */
export function useIdleGsapAnimation(animate: IdleGsapAnimate) {
  const ref = useRef<HTMLDivElement>(null);
  const onAnimate = useEffectEvent(animate);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    const idleId = scheduleIdle(() => {
      void loadGsap().then((gsap) => {
        if (cancelled || !ref.current) return;

        const ctx = gsap.context(() => {
          onAnimate(gsap, ref.current!);
        }, ref);

        revert = () => ctx.revert();
      });
    });

    return () => {
      cancelled = true;
      cancelIdle(idleId);
      revert?.();
    };
  }, []);

  return ref;
}
