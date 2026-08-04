'use client';

import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEventListener } from '@/hooks/useEventListener';

gsap.registerPlugin(ScrollTrigger);

type UseHorizontalScrollResult = {
  spacerRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  panelsRef: RefObject<HTMLDivElement | null>;
};

/**
 * Pins the container and scrubs a horizontal translate of the panels track
 * based on vertical scroll distance (desktop only).
 *
 * Uses a React-owned `pinSpacer` so ScrollTrigger does not inject/remove a
 * wrapper node (which breaks React Fast Refresh with insertBefore errors).
 */
export function useHorizontalScroll(enabled: boolean): UseHorizontalScrollResult {
  const spacerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spacerEl = spacerRef.current;
    const panelsEl = panelsRef.current;
    const container = containerRef.current;

    if (!spacerEl || !panelsEl || !container) return;

    let tween: gsap.core.Tween | null = null;

    const teardown = () => {
      if (tween) {
        tween.scrollTrigger?.kill(true);
        tween.kill();
        tween = null;
      }
      gsap.set(panelsEl, { clearProps: 'transform' });
      gsap.set(container, { clearProps: 'transform,zIndex,margin,maxWidth,width,height,boxSizing,position,top,left,right,bottom' });
    };

    if (!enabled) {
      teardown();
      return teardown;
    }

    const getScrollDistance = () => Math.max(0, panelsEl.scrollWidth - window.innerWidth);

    tween = gsap.to(panelsEl, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        pinSpacer: spacerEl,
        scrub: 1,
        end: () => `+=${getScrollDistance()}`,
        invalidateOnRefresh: true,
      },
    });

    return teardown;
  }, [enabled]);

  useEventListener(
    'resize',
    () => {
      ScrollTrigger.refresh();
    },
    { passive: true, enabled },
  );

  return { spacerRef, containerRef, panelsRef };
}
