'use client';

import { useEffect, useEffectEvent, type RefObject } from 'react';

type ListenerTarget =
  | EventTarget
  | RefObject<EventTarget | null>
  | (() => EventTarget | null | undefined)
  | null
  | undefined;

export type UseEventListenerOptions = AddEventListenerOptions & {
  /** Defaults to `window`. Pass a ref, element, or getter. */
  target?: ListenerTarget;
  /** When false, the listener is not attached. Defaults to true. */
  enabled?: boolean;
};

function resolveTarget(target: ListenerTarget): EventTarget | null {
  if (target === undefined) {
    return typeof window !== 'undefined' ? window : null;
  }
  if (target == null) return null;
  if (typeof target === 'function') return target() ?? null;
  if ('current' in target) return target.current;
  return target;
}

/**
 * Subscribe to a DOM/window event with a stable handler (via useEffectEvent)
 * so callback identity does not re-bind the listener.
 *
 * Prefer `{ passive: true }` for resize/scroll/touch/wheel when you never call
 * preventDefault().
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: UseEventListenerOptions,
): void;
export function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  options?: UseEventListenerOptions,
): void;
export function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  options: UseEventListenerOptions = {},
): void {
  const { target, enabled = true, capture, once, passive, signal } = options;

  const onEvent = useEffectEvent(handler);

  useEffect(() => {
    if (!enabled) return;

    const element = resolveTarget(target);
    if (!element) return;

    const listener: EventListener = (event) => {
      onEvent(event);
    };

    element.addEventListener(eventName, listener, {
      capture,
      once,
      passive,
      signal,
    });

    return () => {
      element.removeEventListener(eventName, listener, capture);
    };
  }, [eventName, enabled, target, capture, once, passive, signal]);
}
