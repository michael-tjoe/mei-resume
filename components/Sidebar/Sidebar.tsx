'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import TypographyArt from '@/components/TypographyArt';
import { useHorizontalScrollApi } from '@/components/HorizontalScroll';
import { prefersReducedMotion } from '@/helpers/prefersReducedMotion';
import { loadGsap } from '@/hooks/loadGsap';
import { cn } from '@/lib/cn';
import gloves from './assets/gloves.png';
import icClose from './assets/ic-close.svg';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  /** Dark-brown chrome (matches inverted desktop nav). */
  invert?: boolean;
  /** TypographyArt brand/title text. */
  text?: string;
}

const navItems = [
  { label: 'experiences', href: '#experiences', scrollY: 2420 },
  { label: 'portfolio', href: '#portfolio' },
  { label: 'contact', href: '#contact' },
] as const;

const ANIM_DURATION = 0.2;

/** Hoisted static JSX (rendering-hoist-jsx). */
const closeImage = (
  <Image src={icClose} alt="" width={52} height={52} unoptimized className="size-full" />
);

const glovesImage = (
  <Image src={gloves} alt="" width={198} height={180} className="size-full" aria-hidden />
);

function Sidebar({ isOpen, onClose, invert = false, text = 'stefanny’s' }: SidebarProps) {
  const { scrollTo } = useHorizontalScrollApi();
  const [shouldRender, setShouldRender] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<{ kill: () => void } | null>(null);
  const surfaceClass = invert ? 'bg-brand-dark' : 'bg-brand-tan';

  // Mount on open during render — avoids cascading setState-in-effect (rerender-derived-state-no-effect).
  if (isOpen && !shouldRender) {
    setShouldRender(true);
  }

  const killTimeline = () => {
    timelineRef.current?.kill();
    timelineRef.current = null;
  };

  const animateIn = useEffectEvent(async () => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    if (prefersReducedMotion()) {
      panel.style.transform = 'none';
      overlay.style.opacity = '0.5';
      return;
    }

    const gsap = await loadGsap();
    if (!panelRef.current || !overlayRef.current) return;

    killTimeline();
    gsap.set(panel, { xPercent: -100 });
    gsap.set(overlay, { opacity: 0 });
    timelineRef.current = gsap
      .timeline()
      .to(panel, {
        xPercent: 0,
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

  const animateOut = useEffectEvent(async () => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;

    if (!panel || !overlay || prefersReducedMotion()) {
      setShouldRender(false);
      return;
    }

    const gsap = await loadGsap();
    if (!panelRef.current || !overlayRef.current) {
      setShouldRender(false);
      return;
    }

    killTimeline();
    timelineRef.current = gsap
      .timeline({
        onComplete: () => setShouldRender(false),
      })
      .to(panel, {
        xPercent: -100,
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

  // Animate in after portal nodes mount (bundle-conditional GSAP via loadGsap).
  useEffect(() => {
    if (!shouldRender || !isOpen) return;

    let cancelled = false;

    void (async () => {
      await animateIn();
      if (cancelled) killTimeline();
    })();

    return () => {
      cancelled = true;
      killTimeline();
    };
  }, [shouldRender, isOpen]);

  // Animate out on close; unmount only after the timeline completes.
  useEffect(() => {
    if (isOpen || !shouldRender) return;
    void animateOut();
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

      {/* Width includes close-tab overhang (499 + 71). */}
      <div ref={panelRef} className="fixed top-0 left-0 z-(--znavbar) h-full w-142.5 max-w-[90vw]">
        <div
          className={cn(
            'relative h-full w-124.75 max-w-full transition-colors duration-300',
            surfaceClass,
          )}
        >
          <div
            className={cn(
              'absolute top-0 left-110.5 flex h-34.75 w-32 items-center justify-center rounded-r-[50px] transition-colors duration-300',
              surfaceClass,
            )}
          >
            <button
              type="button"
              onClick={onClose}
              className="relative size-13 rotate-45 cursor-pointer transition-opacity hover:opacity-80"
              aria-label="Close menu"
            >
              {closeImage}
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              scrollTo(0);
              onClose();
            }}
            className="cursor-pointer pt-12 pl-16 transition-opacity hover:opacity-80"
            aria-label="Back to top"
          >
            <TypographyArt
              text={text}
              rotate={-7.03}
              left={51}
              className={invert ? 'text-brand-tan' : undefined}
            />
          </button>

          <nav
            className="mt-[calc(100vh*64/1080)] flex flex-col gap-[calc(100vh*36/1080)] pl-16"
            aria-label="Sidebar"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) => {
                  if ('scrollY' in item) {
                    event.preventDefault();
                    scrollTo(item.scrollY);
                  }
                  onClose();
                }}
                className="font-sora text-[32px] leading-normal font-bold text-white transition-opacity hover:opacity-80"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div
            className="pointer-events-none absolute bottom-12 right-14 h-45 w-[198.5px]"
            aria-hidden
          >
            {glovesImage}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}

export default Sidebar;
