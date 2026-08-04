'use client';

import Image from 'next/image';
import type { Gsap } from '@/hooks/loadGsap';
import AnimatedDecoration from '../AnimatedDecoration';
import icKeynote from './assets/ic-keynote.svg';

interface KeynoteProps {
  className?: string;
  sizeClassName?: string;
}

const DEFAULT_SIZE_CLASS_NAME = 'h-7 w-6.5';

/** Hoisted static image (rendering-hoist-jsx). */
const keynoteImage = (
  <Image src={icKeynote} alt="" fill unoptimized className="object-contain" />
);

/** Hoisted animate fn — stable prop identity for AnimatedDecoration. */
function animateKeynote(gsap: Gsap, el: HTMLDivElement) {
  gsap
    .timeline({ repeat: -1 })
    .to(el, {
      rotation: -22.04,
      duration: 0.5,
      ease: 'power1.in',
    })
    .to(el, {
      rotation: 0,
      duration: 0.5,
      ease: 'power1.in',
    });
}

function Keynote({
  className,
  sizeClassName = DEFAULT_SIZE_CLASS_NAME,
}: KeynoteProps) {
  return (
    <AnimatedDecoration
      className={className}
      sizeClassName={sizeClassName}
      image={keynoteImage}
      animate={animateKeynote}
    />
  );
}

export default Keynote;
