'use client';

import { useCallback, useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEventListener } from '@/hooks/useEventListener';

gsap.registerPlugin(ScrollTrigger);

const DEBUG_HORIZONTAL_SCROLL = process.env.NODE_ENV !== 'production';

type UseHorizontalScrollResult = {
  spacerRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  panelsRef: RefObject<HTMLDivElement | null>;
  /** Jump the scroller so ScrollTrigger `self.scroll()` equals `scrollY` (e.g. 1640). */
  scrollTo: (scrollY: number) => void;
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
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const scrollTo = useCallback((scrollY: number) => {
    const st = scrollTriggerRef.current;
    if (st) {
      st.scroll(scrollY);
      return;
    }
    window.scrollTo({ top: scrollY, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const spacerEl = spacerRef.current;
    const panelsEl = panelsRef.current;
    const container = containerRef.current;

    if (!spacerEl || !panelsEl || !container) return;

    let tween: gsap.core.Tween | null = null;
    let hud: HTMLDivElement | null = null;

    const teardown = () => {
      if (tween) {
        tween.scrollTrigger?.kill(true);
        tween.kill();
        tween = null;
      }
      scrollTriggerRef.current = null;
      hud?.remove();
      hud = null;
      gsap.set(panelsEl, { clearProps: 'transform' });
      gsap.set(container, { clearProps: 'transform,zIndex,margin,maxWidth,width,height,boxSizing,position,top,left,right,bottom' });
    };

    if (!enabled) {
      teardown();
      return teardown;
    }

    const getScrollDistance = () => Math.max(0, panelsEl.scrollWidth - window.innerWidth);

    if (DEBUG_HORIZONTAL_SCROLL) {
      hud = document.createElement('div');
      hud.style.cssText =
        'position:fixed;bottom:12px;right:12px;z-index:99999;padding:8px 10px;border-radius:8px;background:#1c1d1b;color:#faf3e7;font:12px/1.4 ui-monospace,monospace;white-space:pre;pointer-events:none;';
      document.body.appendChild(hud);
    }

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
        markers: DEBUG_HORIZONTAL_SCROLL,
        onUpdate: DEBUG_HORIZONTAL_SCROLL
          ? (self) => {
              const maxX = getScrollDistance();
              const x = -(self.progress * maxX);
              const scrolledInTrigger = self.scroll() - self.start;
              const triggerRange = self.end - self.start;
              const text = [
                `progress  ${(self.progress * 100).toFixed(1)}%`,
                `scrollY   ${self.scroll().toFixed(0)}`,
                `in trigger ${scrolledInTrigger.toFixed(0)} / ${triggerRange.toFixed(0)}`,
                `x         ${x.toFixed(0)} / ${(-maxX).toFixed(0)}`,
              ].join('\n');
              if (hud) hud.textContent = text;
            }
          : undefined,
      },
    });
    scrollTriggerRef.current = tween.scrollTrigger ?? null;

    return teardown;
  }, [enabled]);

  useEventListener(
    'resize',
    () => {
      ScrollTrigger.refresh();
    },
    { passive: true, enabled },
  );

  return { spacerRef, containerRef, panelsRef, scrollTo };
}
