import { useState } from 'react'
import { createPortal } from 'react-dom'

import { useViewport } from '../../providers/ViewportProvider'
import MobileNavbarMenu from './MobileNavbarMenu'

function HamburgerIcon() {
  return (
    <svg
      width="27"
      height="16"
      viewBox="0 0 27 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0"
        y1="1.5"
        x2="26.85"
        y2="1.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="0"
        y1="8"
        x2="26.85"
        y2="8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="0"
        y1="14.5"
        x2="26.85"
        y2="14.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isDesktop } = useViewport()

  const navbarContent = (
    <nav
      className="desktop:justify-center bg-brand-tan px-side desktop:h-full desktop:w-[72px] desktop:items-start desktop:px-0 desktop:fixed sticky top-0 left-0 z-(--znavbar) flex h-[49px] w-full items-center justify-end"
      aria-label="Navigation"
    >
      <button
        type="button"
        className="desktop:absolute desktop:bg-brand-tan desktop:-top-2 desktop:left-4 desktop:py-[56px] desktop:w-[128px] desktop:rounded-r-[50px] relative flex flex-col items-center justify-center text-white transition-opacity hover:opacity-80"
        aria-label="Open menu"
        onClick={() => setIsMenuOpen(true)}
      >
        <HamburgerIcon />
      </button>

      <MobileNavbarMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </nav>
  )

  return isDesktop ? createPortal(navbarContent, document.body) : navbarContent
}

export default MobileNavbar
