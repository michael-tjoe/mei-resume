"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import Sidebar from "@/components/Sidebar/Sidebar";
import { useViewport } from "@/providers/ViewportProvider";
import HamburgerIcon from "./HamburgerIcon";
import MobileNavbarMenu from "./MobileNavbarMenu";

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const { isDesktop } = useViewport();

  const closeMenu = () => setIsMenuOpen(false);

  const navbarContent = (
    <nav
      className="sticky top-0 left-0 z-(--znavbar) flex h-12.25 w-full items-center justify-end bg-brand-tan px-side desktop:fixed desktop:h-full desktop:w-18 desktop:items-start desktop:justify-center desktop:px-0"
      aria-label="Navigation"
    >
      <button
        type="button"
        className="relative flex cursor-pointer flex-col items-center justify-center text-white transition-opacity desktop:absolute desktop:-top-2 desktop:z-(--znavbar) desktop:h-34.75 desktop:w-54 desktop:rounded-r-[50px] desktop:bg-brand-tan"
        aria-label="Open menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(true)}
      >
        <HamburgerIcon className="desktop:ml-11" />
      </button>

      {isDesktop ? (
        <Sidebar isOpen={isMenuOpen} onClose={closeMenu} />
      ) : (
        <MobileNavbarMenu isOpen={isMenuOpen} onClose={closeMenu} />
      )}
    </nav>
  );

  return isDesktop && mounted
    ? createPortal(navbarContent, document.body)
    : navbarContent;
}

export default MobileNavbar;
