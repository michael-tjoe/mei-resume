'use client';

import { createContext, useContext, useSyncExternalStore } from 'react';

/** Sticky invert rail in Portofolio — used by the body-portaled nav. */
export const PORTOFOLIO_NAV_RAIL_ID = 'portofolio-nav-rail';

/** HorizontalScroll `scrollY` at which the portfolio rail is flush with the fixed nav. */
const PORTOFOLIO_OVERLAP_SCROLL_Y = 4888;

interface NavigationContextValue {
  /** True when HorizontalScroll scrollY has reached the portfolio overlap. */
  perfectlyOverlapped: boolean;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener('scroll', onStoreChange, { passive: true });
  return () => window.removeEventListener('scroll', onStoreChange);
}

function getPortfolioOverlappedSnapshot() {
  return window.scrollY >= PORTOFOLIO_OVERLAP_SCROLL_Y;
}

function getServerPortfolioOverlappedSnapshot() {
  return false;
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const perfectlyOverlapped = useSyncExternalStore(
    subscribeScroll,
    getPortfolioOverlappedSnapshot,
    getServerPortfolioOverlappedSnapshot,
  );

  return (
    <NavigationContext.Provider value={{ perfectlyOverlapped }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextValue {
  return useContext(NavigationContext) ?? { perfectlyOverlapped: false };
}
