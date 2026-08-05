'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import TypographyArt from '@/components/TypographyArt';
import { prefersReducedMotion } from '@/helpers/prefersReducedMotion';

interface MobileNavbarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'experiences', href: '#experiences' },
  {
    label: 'portfolio',
    href: '#portofolio',
    subItems: [
      { label: 'social media design', href: '#social-media' },
      { label: 'UI/UX design', href: '#uiux' },
      { label: 'illustration', href: '#illustration' },
      { label: 'packaging design', href: '#packaging' },
    ],
  },
  { label: 'contact', href: '#contact' },
] as const;

const ANIM_DURATION = 0.2;

/** Hoisted static JSX (rendering-hoist-jsx). */
const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    fill="none"
    aria-hidden="true"
  >
    <path
      stroke="#fff"
      strokeWidth="3"
      d="M26.446 8.831 8.831 26.446M8.784 8.831 26.4 26.446"
    />
  </svg>
);

const typographyArt = <TypographyArt text="stefanny’s" rotate={-7.03} left={51} />;

function MobileNavbarMenu({ isOpen, onClose }: MobileNavbarMenuProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Mount on open during render — avoids cascading setState-in-effect (rerender-derived-state-no-effect).
  if (isOpen && !shouldRender) {
    setShouldRender(true);
  }

  const killTimeline = () => {
    timelineRef.current?.kill();
    timelineRef.current = null;
  };

  const animateIn = useEffectEvent(() => {
    const menu = menuRef.current;
    const overlay = overlayRef.current;
    if (!menu || !overlay) return;

    if (prefersReducedMotion()) {
      menu.style.transform = 'none';
      overlay.style.opacity = '0.5';
      return;
    }

    killTimeline();
    gsap.set(menu, { yPercent: -100 });
    gsap.set(overlay, { opacity: 0 });
    timelineRef.current = gsap
      .timeline()
      .to(menu, {
        yPercent: 0,
        duration: ANIM_DURATION,
        ease: 'none',
      })
      .to(
        overlay,
        {
          opacity: 0.5,
          duration: ANIM_DURATION,
          ease: 'none',
        },
        0,
      );
  });

  const animateOut = useEffectEvent(() => {
    const menu = menuRef.current;
    const overlay = overlayRef.current;

    if (!menu || !overlay || prefersReducedMotion()) {
      setShouldRender(false);
      return;
    }

    killTimeline();
    timelineRef.current = gsap
      .timeline({
        onComplete: () => setShouldRender(false),
      })
      .to(menu, {
        yPercent: -100,
        duration: ANIM_DURATION,
        ease: 'none',
      })
      .to(
        overlay,
        {
          opacity: 0,
          duration: ANIM_DURATION,
          ease: 'none',
        },
        0,
      );
  });

  useEffect(() => {
    if (!shouldRender || !isOpen) return;
    animateIn();
    return killTimeline;
  }, [shouldRender, isOpen]);

  useEffect(() => {
    if (isOpen || !shouldRender) return;
    animateOut();
    return killTimeline;
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  return createPortal(
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-(--znavbar) bg-black opacity-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={menuRef}
        className="fixed inset-x-0 top-0 z-(--znavbar) w-full rounded-b-[30px] bg-brand-tan pb-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-5 text-white transition-opacity hover:opacity-80"
          aria-label="Close menu"
        >
          {closeIcon}
        </button>

        <button
          type="button"
          onClick={() => {
            onClose();
            window.scrollTo({ top: 0 });
          }}
          className="flex w-full cursor-pointer justify-center pt-10 transition-opacity hover:opacity-80"
          aria-label="About me"
        >
          {typographyArt}
        </button>

        <nav className="mt-8 flex flex-col items-center" aria-label="Mobile">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="mb-5 flex flex-col items-center last:mb-0"
            >
              <a
                href={item.href}
                onClick={onClose}
                className="font-sora text-base font-bold text-white transition-opacity hover:opacity-80"
              >
                {item.label}
              </a>
              {'subItems' in item ? (
                <div className="mt-2 flex flex-col items-center">
                  {item.subItems.map((subItem) => (
                    <a
                      key={subItem.label}
                      href={subItem.href}
                      onClick={onClose}
                      className="mb-2 font-sora text-xs font-bold text-white transition-opacity last:mb-0 hover:opacity-80"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      </div>
    </>,
    document.body,
  );
}

export default MobileNavbarMenu;
