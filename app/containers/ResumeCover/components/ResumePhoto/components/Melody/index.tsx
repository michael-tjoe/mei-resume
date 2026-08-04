'use client';

import Image from 'next/image';
import type { Gsap } from '@/hooks/loadGsap';
import AnimatedDecoration from '../AnimatedDecoration';
import icMelody from './assets/ic-melody.svg';

interface MelodyProps {
  className?: string;
  sizeClassName?: string;
}

const DEFAULT_SIZE_CLASS_NAME = 'h-7.25 w-8.5';

/** Hoisted static image (rendering-hoist-jsx). */
const melodyImage = (
  <Image src={icMelody} alt="" fill unoptimized className="object-contain" />
);

/** Hoisted animate fn — stable prop identity for AnimatedDecoration. */
function animateMelody(gsap: Gsap, el: HTMLDivElement) {
  gsap
    .timeline({ repeat: -1 })
    .to(el, {
      rotation: 30,
      duration: 0.5,
      ease: 'power1.in',
    })
    .to(el, {
      rotation: 0,
      duration: 0.5,
      ease: 'power1.in',
    });
}

function Melody({
  className,
  sizeClassName = DEFAULT_SIZE_CLASS_NAME,
}: MelodyProps) {
  return (
    <AnimatedDecoration
      className={className}
      sizeClassName={sizeClassName}
      image={melodyImage}
      animate={animateMelody}
    />
  );
}

export default Melody;
