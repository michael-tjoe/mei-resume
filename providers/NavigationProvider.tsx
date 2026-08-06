'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { useEventListener } from '@/hooks/useEventListener';

/** Sticky invert rail in Portofolio — observed by the body-portaled nav. */
export const PORTOFOLIO_NAV_RAIL_ID = 'portofolio-nav-rail';

/** Subpixel tolerance for GSAP translate (perfect overlap ≈ left 0). */
const OVERLAP_EPSILON_PX = 1;

/** Dense thresholds so GSAP horizontal translate keeps the observer firing. */
const RAIL_OVERLAP_THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

interface NavigationContextValue {
  /** True when the sticky portfolio rail is flush with the fixed nav at viewport left. */
  perfectlyOverlapped: boolean;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

/** True when the sticky rail is flush with (or past) the fixed nav at viewport left. */
function isRailPerfectlyOverlapped() {
  const rail = document.getElementById(PORTOFOLIO_NAV_RAIL_ID);
  if (!rail) return false;
  return rail.getBoundingClientRect().left <= OVERLAP_EPSILON_PX;
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [perfectlyOverlapped, setPerfectlyOverlapped] = useState(false);

  useEffect(() => {
    const rail = document.getElementById(PORTOFOLIO_NAV_RAIL_ID);
    if (!rail) return;

    const sync = () => setPerfectlyOverlapped(isRailPerfectlyOverlapped());
    const io = new IntersectionObserver(sync, { threshold: RAIL_OVERLAP_THRESHOLDS });
    io.observe(rail);
    sync();

    return () => io.disconnect();
  }, []);

  useEventListener(
    'scroll',
    () => {
      setPerfectlyOverlapped(isRailPerfectlyOverlapped());
    },
    { passive: true },
  );

  useEventListener(
    'resize',
    () => {
      setPerfectlyOverlapped(isRailPerfectlyOverlapped());
    },
    { passive: true },
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
