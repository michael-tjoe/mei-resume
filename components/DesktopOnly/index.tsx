'use client';

import { useViewport } from '@/providers/ViewportProvider';

export function DesktopOnly({ children }: { children: React.ReactNode }) {
  const { isDesktop } = useViewport();
  if (!isDesktop) return null;
  return children;
}
