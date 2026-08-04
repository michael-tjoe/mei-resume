'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import gsap from 'gsap';
import icClose from './assets/ic-close.svg';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'experiences', href: '#experiences' },
  { label: 'portfolio', href: '#portfolio' },
  { label: 'contact', href: '#contact' },
] as const;

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else if (shouldRender) {
      const tl = gsap.timeline({
        onComplete: () => setShouldRender(false),
      });

      tl.to(panelRef.current, {
        xPercent: -100,
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
      );
    }
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (shouldRender && isOpen && overlayRef.current && panelRef.current) {
      gsap.set(panelRef.current, { xPercent: -100 });
      gsap.set(overlayRef.current, { opacity: 0 });

      const tl = gsap.timeline();

      tl.to(panelRef.current, {
        xPercent: 0,
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
      );
    }
  }, [shouldRender, isOpen]);

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
      <div
        ref={panelRef}
        className="fixed top-0 left-0 z-(--znavbar) h-full w-142.5 max-w-[90vw]"
      >
        <div className="relative h-full w-124.75 max-w-full bg-brand-tan">
          <div className="absolute top-0 left-110.5 flex h-34.75 w-32 items-center justify-center rounded-r-[50px] bg-brand-tan">
            <button
              type="button"
              onClick={onClose}
              className="relative size-13 rotate-45 cursor-pointer transition-opacity hover:opacity-80"
              aria-label="Close menu"
            >
              <Image
                src={icClose}
                alt=""
                width={52}
                height={52}
                unoptimized
                className="size-full"
              />
            </button>
          </div>

          <nav
            className="flex flex-col gap-[calc(8.33vh-4px)] pt-[calc(16.67%+11px)] pl-15.25"
            aria-label="Sidebar"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="font-sora text-[32px] leading-normal font-bold text-white transition-opacity hover:opacity-80"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>,
    document.body,
  );
}

export default Sidebar;
