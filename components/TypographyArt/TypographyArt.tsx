import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';

interface TypographyArtProps {
  text: string;
  rotate?: number;
  left?: number;
  className?: string;
}

const DEFAULT_ROTATE = -7.03;
const DEFAULT_LEFT = 74;

/** Hoisted base classes — avoid reallocating the long utility string (rendering-hoist-jsx). */
const typographyArtClassName =
  'relative font-sora text-[28px] font-semibold text-brand-dark after:absolute after:bottom-0 after:left-(--ta-left) after:translate-y-[27%] after:rotate-(--ta-rotate) after:font-script after:text-[25px] after:text-white after:content-(--ta-text) desktop:text-[48px] desktop:leading-[1.26] desktop:after:text-[40px]';

function TypographyArt({
  text,
  rotate = DEFAULT_ROTATE,
  left = DEFAULT_LEFT,
  className,
}: TypographyArtProps) {
  const style = {
    '--ta-text': `'${text}'`,
    '--ta-rotate': `${rotate}deg`,
    '--ta-left': `${left}%`,
  } as CSSProperties;

  return (
    <span className={cn(typographyArtClassName, className)} style={style}>
      {text}
    </span>
  );
}

export default TypographyArt;
