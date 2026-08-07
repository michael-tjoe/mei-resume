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

/**
 * Run after `window` `load` (all subresources finished), then on idle.
 * Returns a cancel function for effect cleanup.
 */
export function scheduleAfterLoad(cb: () => void): () => void {
  let idleId: number | undefined;
  let cancelled = false;

  const run = () => {
    if (cancelled) return;
    idleId = scheduleIdle(cb);
  };

  if (document.readyState === 'complete') {
    run();
  } else {
    window.addEventListener('load', run);
  }

  return () => {
    cancelled = true;
    window.removeEventListener('load', run);
    if (idleId !== undefined) cancelIdle(idleId);
  };
}
