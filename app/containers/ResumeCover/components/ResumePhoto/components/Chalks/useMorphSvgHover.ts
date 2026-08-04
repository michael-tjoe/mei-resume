'use client';

import { useEffect, useEffectEvent, useRef } from 'react';
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
 * - useEffectEvent so morph fns stay fresh without unstable handler identity (advanced-use-latest)
 * - Kills tweens on unmount
 * - Skips when prefers-reduced-motion
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
  const tweensRef = useRef<MorphTween[]>([]);
  const animateFinalRef = useRef(animateFinal);
  const animateOriginalRef = useRef(animateOriginal);
  animateFinalRef.current = animateFinal;
  animateOriginalRef.current = animateOriginal;

  const killTweens = () => {
    for (const tween of tweensRef.current) tween.kill();
    tweensRef.current = [];
  };

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
      wrapper.querySelectorAll<SVGPathElement>(pathSelector),
    );
    return {
      wrapper,
      paths: pathsRef.current,
      svg: svgRef.current,
      group: groupRef.current,
    };
  };

  const onMouseEnter = useEffectEvent(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    void loadMorphGsap().then((gsap) => {
      const ctx = ensureCtx();
      if (!ctx || !wrapperRef.current) return;
      killTweens();
      tweensRef.current = animateFinalRef.current(gsap, ctx);
    });
  });

  const onMouseLeave = useEffectEvent(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    void loadMorphGsap().then((gsap) => {
      const ctx = ensureCtx();
      if (!ctx || !wrapperRef.current) return;
      killTweens();
      tweensRef.current = animateOriginalRef.current(gsap, ctx);
    });
  });

  return {
    wrapperRef,
    svgRef,
    groupRef,
    onMouseEnter,
    onMouseLeave,
  };
}
