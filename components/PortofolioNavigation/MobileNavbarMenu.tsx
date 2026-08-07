'use client';

import { useEffect, useState, type TransitionEvent } from 'react';
import { createPortal } from 'react-dom';
import TypographyArt from '@/components/TypographyArt';
import { prefersReducedMotion } from '@/helpers/prefersReducedMotion';
import { cn } from '@/lib/cn';

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

const ANIM_MS = 200;

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

/**
 * CSS transform/opacity transitions (compositor) instead of GSAP (main-thread
 * rAF) — stays smoother when the CPU is busy.
 */
const overlayClass = cn(
  'fixed inset-0 z-(--znavbar) bg-black',
  'transition-opacity duration-200 ease-out motion-reduce:transition-none',
);

const menuClass = cn(
  'fixed inset-x-0 top-0 z-(--znavbar) w-full rounded-b-[30px] bg-brand-tan pb-8',
  // translate3d keeps the layer on the GPU for the whole open/close cycle
  'transform-gpu backface-hidden',
  'transition-transform duration-200 ease-out motion-reduce:transition-none',
);

function MobileNavbarMenu({ isOpen, onClose }: MobileNavbarMenuProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [entered, setEntered] = useState(false);

  // Mount on open during render — avoids cascading setState-in-effect (rerender-derived-state-no-effect).
  if (isOpen && !shouldRender) {
    setShouldRender(true);
  }

  useEffect(() => {
    if (!shouldRender) return;

    let outerId = 0;
    let innerId = 0;
    let fallbackId = 0;

    const clear = () => {
      cancelAnimationFrame(outerId);
      cancelAnimationFrame(innerId);
      window.clearTimeout(fallbackId);
    };

    if (isOpen) {
      // Paint the closed (off-screen) frame first, then flip — otherwise the
      // open transition never runs because both states land in one paint.
      outerId = requestAnimationFrame(() => {
        if (prefersReducedMotion()) {
          setEntered(true);
          return;
        }
        innerId = requestAnimationFrame(() => setEntered(true));
      });
      return clear;
    }

    outerId = requestAnimationFrame(() => {
      if (prefersReducedMotion()) {
        setShouldRender(false);
        setEntered(false);
        return;
      }
      setEntered(false);
      // Fallback if transitionend is skipped (tab backgrounded, etc.)
      fallbackId = window.setTimeout(() => {
        setShouldRender(false);
        setEntered(false);
      }, ANIM_MS + 50);
    });

    return clear;
  }, [isOpen, shouldRender]);

  const onMenuTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== 'transform') return;
    if (isOpen) return;
    setShouldRender(false);
    setEntered(false);
  };

  if (!shouldRender) return null;

  return createPortal(
    <>
      <div
        className={cn(overlayClass, entered ? 'opacity-50' : 'opacity-0')}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn(
          menuClass,
          entered ? 'translate-y-0' : '-translate-y-full',
        )}
        onTransitionEnd={onMenuTransitionEnd}
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
