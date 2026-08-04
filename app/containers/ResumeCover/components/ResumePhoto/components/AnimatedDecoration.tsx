'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import {
  useIdleGsapAnimation,
  type IdleGsapAnimate,
} from '@/hooks/useIdleGsapAnimation';

interface AnimatedDecorationProps {
  className?: string;
  /** Size classes for the animated wrapper (rendering-animate-svg-wrapper). */
  sizeClassName: string;
  /** Prefer a module-hoisted static image node (rendering-hoist-jsx). */
  image: ReactNode;
  /** Prefer a module-hoisted animate fn so the prop stays referentially stable. */
  animate: IdleGsapAnimate;
}

/**
 * Shared shell for ResumePhoto decorative icons:
 * outer positioning wrapper + GPU-friendly animated inner wrapper.
 */
function AnimatedDecoration({
  className,
  sizeClassName,
  image,
  animate,
}: AnimatedDecorationProps) {
  const ref = useIdleGsapAnimation(animate);

  return (
    <div className={cn(className)} aria-hidden>
      <div
        ref={ref}
        className={cn('relative flex will-change-transform', sizeClassName)}
      >
        {image}
      </div>
    </div>
  );
}

export default AnimatedDecoration;
