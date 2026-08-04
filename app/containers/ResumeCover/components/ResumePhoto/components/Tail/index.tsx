'use client';

import Image from 'next/image';
import type { Gsap } from '@/hooks/loadGsap';
import AnimatedDecoration from '../AnimatedDecoration';
import tail from './assets/tail.svg';

interface TailProps {
  className?: string;
  sizeClassName?: string;
}

const DEFAULT_SIZE_CLASS_NAME = 'h-4.25 w-6.75';

/** Hoisted static image (rendering-hoist-jsx). */
const tailImage = (
  <Image src={tail} alt="" fill unoptimized className="object-contain" />
);

/** Hoisted animate fn — Figma slow-in ease needs GSAP (not CSS). */
function animateTail(gsap: Gsap, el: HTMLDivElement) {
  const duration = 0.6; // 1200ms total for full cycle (0.6s each way)

  gsap
    .timeline({ repeat: -1 })
    .to(el, {
      rotation: -30,
      duration,
      delay: 0.2,
      ease: 'slow(0.9,1,false)',
      transformOrigin: 'center right',
    })
    .to(el, {
      rotation: 0,
      duration,
      delay: 0.2,
      ease: 'slow(0.9,1,false)',
      transformOrigin: 'center right',
    });
}

function Tail({
  className,
  sizeClassName = DEFAULT_SIZE_CLASS_NAME,
}: TailProps) {
  return (
    <AnimatedDecoration
      className={className}
      sizeClassName={sizeClassName}
      image={tailImage}
      animate={animateTail}
    />
  );
}

export default Tail;
