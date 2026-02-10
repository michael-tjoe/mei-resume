import { useState } from 'react'
import { createPortal } from 'react-dom'

import { useViewport } from '../../providers/ViewportProvider'
import HamburgerIcon from './HamburgerIcon'
import MobileNavbarMenu from './MobileNavbarMenu'

function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isDesktop } = useViewport()

  const navbarContent = (
    <nav
      className="sticky top-0 left-0 z-(--znavbar) flex h-[49px] w-full items-center justify-end bg-brand-tan px-side desktop:fixed desktop:h-full desktop:w-[72px] desktop:items-start desktop:justify-center desktop:px-0"
      aria-label="Navigation"
    >
      <button
        type="button"
        className="relative flex cursor-pointer flex-col items-center justify-center text-white transition-opacity desktop:absolute desktop:-top-2 desktop:z-(--znavbar) desktop:h-[139px] desktop:w-[216px] desktop:rounded-r-[50px] desktop:bg-brand-tan"
        aria-label="Open menu"
        onClick={() => setIsMenuOpen(true)}
      >
        <HamburgerIcon className="desktop:ml-11" />
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
