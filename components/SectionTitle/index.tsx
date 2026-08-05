import { cn } from '@/lib/cn';

interface SectionTitleProps {
  text: string;
  className?: string;
  invert?: boolean;
  id?: string;
}

/** Prefer theme classes over inline style writes (js-batch-dom-css). */
const COLOR_CLASS = {
  default: 'text-brand-dark',
  invert: 'text-brand-cream',
} as const;

/** Hoisted base classes — avoid reallocating the utility string (rendering-hoist-jsx). */
const BASE_CLASS = 'text-left text-portofolio-title';

function SectionTitle({ text, className, invert = false, id }: SectionTitleProps) {
  return (
    <h1
      id={id}
      className={cn(BASE_CLASS, invert ? COLOR_CLASS.invert : COLOR_CLASS.default, className)}
    >
      {text}
    </h1>
  );
}

export default SectionTitle;
