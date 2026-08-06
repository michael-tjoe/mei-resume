'use client';

import { useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import Sidebar from '@/components/Sidebar/Sidebar';
import { cn } from '@/lib/cn';
import HamburgerIcon from './HamburgerIcon';

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

interface DesktopNavbarProps {
  className?: string;
  /** Stick within the parent section instead of fixed + body portal. */
  sticky?: boolean;
  /** Dark-brown chrome (for dark portfolio surfaces). */
  invert?: boolean;
}

export default function DesktopNavbar({
  className,
  sticky = false,
  invert = false,
}: DesktopNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const surfaceClass = invert ? 'bg-brand-dark' : 'bg-brand-tan';

  const navbarContent = (
    <nav
      className={cn(
        'z-(--znavbar) flex items-start justify-center',
        surfaceClass,
        sticky ? 'sticky top-0 h-dvh w-full' : 'fixed top-0 left-0 h-full w-18',
        className,
      )}
      aria-label="Navigation"
    >
      <button
        type="button"
        className={cn(
          'absolute top-0 left-0 z-(--znavbar) flex h-34.75 cursor-pointer flex-col items-center justify-center rounded-r-[50px] pr-11.5 pl-7.5 text-white transition-opacity desktop:translate-x-3.5',
          surfaceClass,
        )}
        aria-label="Open menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(true)}
      >
        <HamburgerIcon className="ml-11 desktop:ml-0" />
      </button>

      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav>
  );

  if (sticky) return navbarContent;

  return mounted ? createPortal(navbarContent, document.body) : navbarContent;
}
