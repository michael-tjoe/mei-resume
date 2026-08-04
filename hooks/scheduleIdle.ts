/**
 * Defer non-critical work until the browser is idle (js-request-idle-callback).
 * Falls back to setTimeout where requestIdleCallback is unavailable.
 */
export function scheduleIdle(cb: () => void): number {
  if (typeof window.requestIdleCallback === 'function') {
    return window.requestIdleCallback(cb);
  }
  return window.setTimeout(cb, 1) as unknown as number;
}

export function cancelIdle(id: number) {
  if (typeof window.cancelIdleCallback === 'function') {
    window.cancelIdleCallback(id);
    return;
  }
  window.clearTimeout(id);
}
