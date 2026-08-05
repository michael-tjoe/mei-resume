import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';

interface BrandLogoProps {
  text: string;
  rotate?: number;
  left?: number;
  className?: string;
}

const DEFAULT_ROTATE = -7.03;
const DEFAULT_LEFT = 74;

/** Hoisted base classes — avoid reallocating the long utility string (rendering-hoist-jsx). */
const brandLogoClassName =
  'relative font-sora text-[28px] font-semibold text-brand-dark after:absolute after:bottom-0 after:left-(--brand-left) after:translate-y-[27%] after:rotate-(--brand-rotate) after:font-script after:text-[25px] after:text-white after:content-(--brand-text) desktop:text-[48px] desktop:leading-[1.26] desktop:after:text-[40px]';

function BrandLogo({
  text,
  rotate = DEFAULT_ROTATE,
  left = DEFAULT_LEFT,
  className,
}: BrandLogoProps) {
  const style = {
    '--brand-text': `'${text}'`,
    '--brand-rotate': `${rotate}deg`,
    '--brand-left': `${left}%`,
  } as CSSProperties;

  return (
    <span className={cn(brandLogoClassName, className)} style={style}>
      {text}
    </span>
  );
}

export default BrandLogo;
