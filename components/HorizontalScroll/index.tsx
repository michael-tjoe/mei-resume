'use client';

import { createContext, useContext, useMemo } from 'react';
import { useViewport } from '@/providers/ViewportProvider';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { useGestureDetector } from '@/hooks/useGestureDetector';

type HorizontalScrollContextValue = {
  scrollTo: (scrollY: number) => void;
};

const HorizontalScrollContext = createContext<HorizontalScrollContextValue | null>(null);

export function useHorizontalScrollApi(): HorizontalScrollContextValue {
  return useContext(HorizontalScrollContext) ?? { scrollTo: () => {} };
}

export default function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const { isDesktop } = useViewport();
  const { spacerRef, containerRef, panelsRef, scrollTo } = useHorizontalScroll(isDesktop);

  useGestureDetector({ enabled: isDesktop });

  const value = useMemo(() => ({ scrollTo }), [scrollTo]);

  return (
    <HorizontalScrollContext.Provider value={value}>
      <div ref={spacerRef}>
        <main ref={containerRef} className="desktop:h-svh desktop:overflow-hidden">
          <div ref={panelsRef} className="relative flex flex-col desktop:h-full desktop:flex-row">
            {children}
          </div>
        </main>
      </div>
    </HorizontalScrollContext.Provider>
  );
}
