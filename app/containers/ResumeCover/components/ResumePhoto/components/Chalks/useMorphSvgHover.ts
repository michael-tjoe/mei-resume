'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/helpers/prefersReducedMotion';
import { loadMorphGsap, type Gsap } from './loadMorphGsap';

export type MorphTween = { kill: () => void };

export type MorphCtx = {
  wrapper: HTMLDivElement;
  paths: SVGPathElement[];
  svg: SVGSVGElement | null;
  group: SVGGElement | null;
};

export type MorphAnimate = (gsap: Gsap, ctx: MorphCtx) => MorphTween[];

/**
 * Shared MorphSVG hover wiring for chalk icons:
 * - Defers GSAP/MorphSVG until first hover (bundle-conditional)
 * - Caches path NodeList (avoid querySelectorAll every hover)
 * - Latest animate fns via refs synced in an effect (advanced-event-handler-refs)
 * - Ignores stale loadMorphGsap results after enter/leave races
 * - Interaction logic stays in event handlers (rerender-move-effect-to-event)
 * - Skips when prefers-reduced-motion (async-cheap-condition-before-await)
 */
export function useMorphSvgHover(
  pathSelector: string,
  animateFinal: MorphAnimate,
  animateOriginal: MorphAnimate,
) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const pathsRef = useRef<SVGPathElement[] | null>(null);
  const pathSelectorRef = useRef(pathSelector);
  const tweensRef = useRef<MorphTween[]>([]);
  const hoveredRef = useRef(false);
  const loadGenRef = useRef(0);
  const animateFinalRef = useRef(animateFinal);
  const animateOriginalRef = useRef(animateOriginal);

  useEffect(() => {
    animateFinalRef.current = animateFinal;
    animateOriginalRef.current = animateOriginal;
  }, [animateFinal, animateOriginal]);

  useEffect(() => {
    pathSelectorRef.current = pathSelector;
    pathsRef.current = null;
  }, [pathSelector]);

  useEffect(() => {
    return () => {
      for (const tween of tweensRef.current) tween.kill();
      tweensRef.current = [];
    };
  }, []);

  const ensureCtx = (): MorphCtx | null => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return null;

    pathsRef.current ??= Array.from(
      wrapper.querySelectorAll<SVGPathElement>(pathSelectorRef.current),
    );

    return {
      wrapper,
      paths: pathsRef.current,
      svg: svgRef.current,
      group: groupRef.current,
    };
  };

  const killTweens = () => {
    for (const tween of tweensRef.current) tween.kill();
    tweensRef.current = [];
  };

  const morph = (wantHover: boolean) => {
    // Cheap sync guard before kicking the MorphSVG import.
    if (prefersReducedMotion()) return;

    hoveredRef.current = wantHover;
    const gen = ++loadGenRef.current;

    void loadMorphGsap().then((gsap) => {
      // Drop stale responses from overlapping enter/leave loads.
      if (gen !== loadGenRef.current) return;
      if (hoveredRef.current !== wantHover) return;
      if (!wrapperRef.current) return;

      const ctx = ensureCtx();
      if (!ctx) return;

      killTweens();
      tweensRef.current = wantHover
        ? animateFinalRef.current(gsap, ctx)
        : animateOriginalRef.current(gsap, ctx);
    });
  };

  return {
    wrapperRef,
    svgRef,
    groupRef,
    onMouseEnter: () => morph(true),
    onMouseLeave: () => morph(false),
  };
}
