import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import BrandLogo from '@/components/BrandLogo'

interface MobileNavbarMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { label: 'experiences', href: '#experiences' },
  {
    label: 'portfolio',
    href: '#portfolio',
    subItems: [
      { label: 'social media design', href: '#social-media' },
      { label: 'UI/UX design', href: '#uiux' },
      { label: 'illustration', href: '#illustration' },
      { label: 'packaging design', href: '#packaging' },
    ],
  },
  { label: 'contact', href: '#contact' },
]

function MobileNavbarMenu({ isOpen, onClose }: MobileNavbarMenuProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
    } else if (shouldRender) {
      // Animate out
      const tl = gsap.timeline({
        onComplete: () => setShouldRender(false),
      })

      tl.to(menuRef.current, {
        yPercent: -100,
        duration: 0.2,
        ease: 'none',
      }).to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: 'none',
        },
        0,
      )
    }
  }, [isOpen, shouldRender])

  useEffect(() => {
    if (shouldRender && isOpen && overlayRef.current && menuRef.current) {
      // Set initial state
      gsap.set(menuRef.current, { yPercent: -100 })
      gsap.set(overlayRef.current, { opacity: 0 })

      // Animate in
      const tl = gsap.timeline()

      tl.to(menuRef.current, {
        yPercent: 0,
        duration: 0.2,
        ease: 'none',
      }).to(
        overlayRef.current,
        {
          opacity: 0.5,
          duration: 0.2,
          ease: 'none',
        },
        0,
      )
    }
  }, [shouldRender, isOpen])

  if (!shouldRender) return null

  const menuContent = (
    <>
      {/* Background overlay - fixed to viewport */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-(--znavbar) bg-black opacity-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu panel - fixed to viewport */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 right-0 z-(--znavbar) w-full rounded-b-[30px] bg-brand-tan pb-8"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-5 text-white transition-opacity hover:opacity-80"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="none"
          >
            <path
              stroke="#fff"
              strokeWidth="3"
              d="M26.446 8.831 8.831 26.446M8.784 8.831 26.4 26.446"
            />
          </svg>
        </button>

        {/* Logo / Brand name */}
        <div className="flex justify-center pt-10">
          <BrandLogo text="stefanny’s" rotate={-7.03} left={51} />
        </div>

        {/* Navigation links */}
        <nav className="mt-8 flex flex-col items-center">
          {navItems.map((item) => (
            <div key={item.label} className="mb-5 flex flex-col items-center last:mb-0">
              <a
                href={item.href}
                className="font-sora text-base font-bold text-white transition-opacity hover:opacity-80"
              >
                {item.label}
              </a>
              {item.subItems && (
                <div className="mt-2 flex flex-col items-center">
                  {item.subItems.map((subItem) => (
                    <a
                      key={subItem.label}
                      href={subItem.href}
                      className="mb-2 font-sora text-xs font-bold text-white transition-opacity last:mb-0 hover:opacity-80"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  )

  return createPortal(menuContent, document.body)
}

export default MobileNavbarMenu
