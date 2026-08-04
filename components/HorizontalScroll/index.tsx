'use client';

import { useViewport } from '@/providers/ViewportProvider';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

export default function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const { isDesktop } = useViewport();
  const { spacerRef, containerRef, panelsRef } = useHorizontalScroll(isDesktop);

  return (
    <div ref={spacerRef}>
      <main ref={containerRef} className="desktop:h-svh desktop:overflow-hidden">
        <div ref={panelsRef} className="relative flex flex-col desktop:h-full desktop:flex-row">
          {children}
        </div>
      </main>
    </div>
  );
}
