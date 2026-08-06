'use client';

import { useState } from 'react';

import HamburgerIcon from './HamburgerIcon';
import MobileNavbarMenu from './MobileNavbarMenu';

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        onClick={() => setIsMenuOpen(true)}
      >
        <HamburgerIcon />
      </button>

      <MobileNavbarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav>
  );
}
