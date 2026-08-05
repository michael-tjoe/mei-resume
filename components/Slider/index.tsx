import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface SliderProps {
  children: ReactNode;
  /** How many items fit in the viewport (fractional peeks allowed). Default 1.6. */
  visibleItems?: number;
  /** Overrides visibleItems from 480px up. */
  visibleItems480?: number;
  /** Overrides visibleItems from 600px up. */
  visibleItems600?: number;
  /** Overrides from the tablet breakpoint (600px) up. Wins over visibleItems600 when both are set. */
  visibleItemsTablet?: number;
  /** Gap between items in px; counted inside the visibleItems budget. Default 20. */
  gap?: number;
  className?: string;
}

/**
 * Responsive visible-count must live in a stylesheet (not inline style).
 * Inline --slider-visible always beats a media-query class.
 * Cascade: base → 480 → 600 → tablet (tablet and 600 share 600px; tablet wins).
 */
const SLIDER_CSS = `
[data-slider] {
  --slider-visible: var(--slider-visible-base);
  --slider-gaps: var(--slider-gaps-base);
}
@media (min-width: 480px) {
  [data-slider][data-slider-480] {
    --slider-visible: var(--slider-visible-480);
    --slider-gaps: var(--slider-gaps-480);
  }
}
@media (min-width: 600px) {
  [data-slider][data-slider-600] {
    --slider-visible: var(--slider-visible-600);
    --slider-gaps: var(--slider-gaps-600);
  }
  [data-slider][data-slider-tablet] {
    --slider-visible: var(--slider-visible-tablet);
    --slider-gaps: var(--slider-gaps-tablet);
  }
}
`;

/** Hoisted utility strings (rendering-hoist-jsx). */
const ROOT_CLASS =
  '@container w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';
const TRACK_CLASS = 'flex';
/** 100cqw = slider viewport so basis stays correct while the track grows with items. */
const ITEM_CLASS =
  'min-w-0 shrink-0 grow-0 basis-[calc((100cqw-var(--slider-gap)*var(--slider-gaps))/var(--slider-visible))]';

function Slider({
  children,
  visibleItems = 1.6,
  visibleItems480,
  visibleItems600,
  visibleItemsTablet,
  gap = 20,
  className,
}: SliderProps) {
  const style = {
    '--slider-visible-base': visibleItems,
    '--slider-gaps-base': Math.floor(visibleItems),
    '--slider-gap': `${gap}px`,
    ...(visibleItems480 != null && {
      '--slider-visible-480': visibleItems480,
      '--slider-gaps-480': Math.floor(visibleItems480),
    }),
    ...(visibleItems600 != null && {
      '--slider-visible-600': visibleItems600,
      '--slider-gaps-600': Math.floor(visibleItems600),
    }),
    ...(visibleItemsTablet != null && {
      '--slider-visible-tablet': visibleItemsTablet,
      '--slider-gaps-tablet': Math.floor(visibleItemsTablet),
    }),
  } as CSSProperties;

  return (
    <>
      <style href="slider-visible" precedence="slider">
        {SLIDER_CSS}
      </style>
      <div
        data-slider=""
        data-slider-480={visibleItems480 != null ? '' : undefined}
        data-slider-600={visibleItems600 != null ? '' : undefined}
        data-slider-tablet={visibleItemsTablet != null ? '' : undefined}
        className={cn(ROOT_CLASS, className)}
        style={style}
      >
        <div className={TRACK_CLASS} style={{ gap: `${gap}px` }}>
          {Children.map(children, (child) => {
            if (!isValidElement(child)) return child;
            const el = child as ReactElement<{ className?: string }>;
            return cloneElement(el, {
              className: cn(ITEM_CLASS, el.props.className),
            });
          })}
        </div>
      </div>
    </>
  );
}

export default Slider;
