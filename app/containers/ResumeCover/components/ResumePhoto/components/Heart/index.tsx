'use client';

import Image from 'next/image';
import type { Gsap } from '@/hooks/loadGsap';
import AnimatedDecoration from '../AnimatedDecoration';
import icHeart from './assets/ic-heart.svg';

interface HeartProps {
  className?: string;
  sizeClassName?: string;
}

const DEFAULT_SIZE_CLASS_NAME = 'h-6 w-5';

/** Hoisted static image (rendering-hoist-jsx). */
const heartImage = (
  <Image src={icHeart} alt="" fill unoptimized className="object-contain" />
);

/** Hoisted animate fn — stable prop identity for AnimatedDecoration. */
function animateHeart(gsap: Gsap, el: HTMLDivElement) {
  gsap
    .timeline({ repeat: -1 })
    .to(el, {
      scale: 1.4,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
    })
    .to(el, {
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
    });
}

function Heart({
  className,
  sizeClassName = DEFAULT_SIZE_CLASS_NAME,
}: HeartProps) {
  return (
    <AnimatedDecoration
      className={className}
      sizeClassName={sizeClassName}
      image={heartImage}
      animate={animateHeart}
    />
  );
}

export default Heart;
