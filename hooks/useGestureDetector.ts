'use client';

import { useEffect, useEffectEvent, type RefObject } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

export type SwipeDirection = 'left' | 'right';

type SwipeTarget =
  | RefObject<Element | null>
  | Element
  | Window
  | Document
  | null
  | undefined;

export type UseGestureDetectorOptions = {
  /** Element to watch. Defaults to `document.body`. */
  target?: SwipeTarget;
  /** When false, the observer is not created. Defaults to true. */
  enabled?: boolean;
  /** Min px of horizontal movement before a swipe fires. Defaults to 50. */
  tolerance?: number;
  /**
   * Observer input types. Defaults to `"touch,pointer"` so wheel/scroll
   * (used by the horizontal scrub) do not count as swipes.
   */
  type?: string;
  /** Prefer horizontal vs vertical once the gesture axis locks. */
  lockAxis?: boolean;
  /** Fires for either direction with a normalized `direction` flag. */
  onSwipe?: (direction: SwipeDirection, self: Observer) => void;
};

function resolveTarget(target: SwipeTarget): Element | Window | Document | null {
  if (target === undefined) {
    return typeof document !== 'undefined' ? document.body : null;
  }
  if (target == null) return null;
  if ('current' in target) return target.current;
  return target;
}

/**
 * Map horizontal pointer delta to vertical scroll 1:1 (same as the wheel
 * path). Observer reports left as negative deltaX; wheel left is positive —
 * negate so drag matches wheel/scrub.
 */
function scrollByDragDeltaX(deltaX: number) {
  if (deltaX === 0) return;
  window.scrollBy({ top: -deltaX, left: 0, behavior: 'instant' });
}

/**
 * Detect horizontal drag / swipe (touch + pointer) via GSAP Observer,
 * plus wheel remap and ArrowLeft / ArrowRight.
 *
 * Horizontal input maps 1:1 onto vertical scroll (same axis flip as trackpad
 * wheel) so ScrollTrigger scrub feels identical. Optional `onSwipe` fires when
 * a discrete left/right swipe crosses `tolerance`.
 *
 * Handlers are wrapped in `useEffectEvent` so callback identity does not
 * recreate the Observer.
 */
export function useGestureDetector({
  target,
  enabled = true,
  tolerance = 50,
  type = 'touch,pointer',
  lockAxis = true,
  onSwipe,
}: UseGestureDetectorOptions = {}): void {
  const handleLeft = useEffectEvent((self: Observer) => {
    onSwipe?.('left', self);
  });

  const handleRight = useEffectEvent((self: Observer) => {
    onSwipe?.('right', self);
  });

  useEffect(() => {
    if (!enabled) return;

    const el = resolveTarget(target);
    if (!el) return;

    // Track pointer x ourselves so each onDrag applies only the incremental
    // movement (Observer's deltaX accumulates until `tolerance` is met).
    let lastX = 0;

    const observer = Observer.create({
      target: el,
      type,
      tolerance,
      lockAxis,
      // Native <img> drag steals pointer events; take over the gesture instead.
      preventDefault: true,
      allowClicks: true,
      onPress: (self) => {
        lastX = self.x ?? 0;
      },
      onDrag: (self) => {
        if (self.axis === 'y') {
          lastX = self.x ?? lastX;
          return;
        }
        const x = self.x ?? lastX;
        const dx = x - lastX;
        lastX = x;
        scrollByDragDeltaX(dx);
      },
      onLeft: (self) => handleLeft(self),
      onRight: (self) => handleRight(self),
    });

    // Belt-and-suspenders: cancel browser image/link drag ghost.
    const onDragStart = (event: Event) => {
      event.preventDefault();
    };
    const dragRoot: Document | Element = el instanceof Element ? el : document;
    dragRoot.addEventListener('dragstart', onDragStart, { capture: true });

    // Horizontal trackpad → vertical scroll (same input path scrub already follows).
    // left (deltaX > 0) scrolls down; right scrolls up — 1:1 like a normal wheel.
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      if (event.deltaX === 0) return;

      window.scrollBy({ top: event.deltaX, left: 0, behavior: 'instant' });
    };
    window.addEventListener('wheel', onWheel, { passive: false, capture: true });

    // Arrow keys: left → scroll up, right → scroll down (content moves with the key).
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

      const active = document.activeElement;
      if (
        active instanceof HTMLElement &&
        (active.isContentEditable ||
          active.tagName === 'INPUT' ||
          active.tagName === 'TEXTAREA' ||
          active.tagName === 'SELECT')
      ) {
        return;
      }

      event.preventDefault();
      const step = window.innerWidth * 0.35;
      window.scrollBy({
        top: event.key === 'ArrowLeft' ? -step : step,
        left: 0,
        behavior: 'smooth',
      });
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true });
      window.removeEventListener('keydown', onKeyDown);
      dragRoot.removeEventListener('dragstart', onDragStart, { capture: true });
      observer.kill();
    };
  }, [enabled, target, tolerance, type, lockAxis]);
}
