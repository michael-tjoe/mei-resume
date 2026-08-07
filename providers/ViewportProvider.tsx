"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

const DESKTOP_MEDIA = "(min-width: 1080px)";

interface ViewportContextValue {
  isDesktop: boolean;
}

const ViewportContext = createContext<ViewportContextValue | null>(null);

function subscribe(onStoreChange: () => void) {
  const mql = window.matchMedia(DESKTOP_MEDIA);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(DESKTOP_MEDIA).matches;
}

export function ViewportProvider({
  children,
  initialIsDesktop,
}: {
  children: React.ReactNode;
  initialIsDesktop: boolean;
}) {
  const isDesktop = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => initialIsDesktop,
  );

  return (
    <ViewportContext.Provider value={{ isDesktop }}>
      {children}
    </ViewportContext.Provider>
  );
}

export function useViewport(): ViewportContextValue {
  return useContext(ViewportContext) ?? { isDesktop: false };
}
