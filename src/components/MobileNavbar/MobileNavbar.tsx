import { useState } from 'react'
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

  return (
    <nav
      className="sticky top-0 z-(--znavbar) flex h-[49px] w-full items-center justify-end bg-brand-tan px-side"
      aria-label="Mobile navigation"
    >
      <button
        type="button"
        className="text-white transition-opacity hover:opacity-80"
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
}

export default MobileNavbar
