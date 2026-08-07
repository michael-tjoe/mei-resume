'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import HamburgerIcon from './HamburgerIcon';
import { scheduleAfterLoad } from '@/hooks/scheduleIdle';

// One import() call site so idle preload and next/dynamic share the same chunk.
const loadMobileNavbarMenu = () => import('./MobileNavbarMenu');

// Defer menu chunk until first open (bundle-dynamic-imports / bundle-conditional).
const MobileNavbarMenu = dynamic(loadMobileNavbarMenu, {
  ssr: false,
  loading: () => null,
});

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Keep mounted after first open so close transition can finish.
  const [hasOpened, setHasOpened] = useState(false);

  // Prefetch after all page resources load, then on idle (bundle-preload).
  useEffect(() => {
    return scheduleAfterLoad(() => {
      void loadMobileNavbarMenu();
    });
  }, []);

  return (
    <nav
      className="sticky top-0 left-0 z-(--znavbar) flex h-12.25 w-full items-center justify-end bg-brand-tan px-side"
      aria-label="Navigation"
    >
      <button
        type="button"
        className="relative flex cursor-pointer flex-col items-center justify-center text-white transition-opacity"
        aria-label="Open menu"
        aria-expanded={isMenuOpen}
        onPointerEnter={loadMobileNavbarMenu}
        onFocus={loadMobileNavbarMenu}
        onClick={() => {
          setHasOpened(true);
          setIsMenuOpen(true);
        }}
      >
        <HamburgerIcon />
      </button>

      {hasOpened ? (
        <MobileNavbarMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      ) : null}
    </nav>
  );
}
