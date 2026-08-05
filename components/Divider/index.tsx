import { cn } from '@/lib/cn'
import singleCenteredCircleOrnament from './assets/single-centered-circle.svg'

type DividerColor = 'brand-dark' | 'brand-tan' | 'brand-brown' | 'brand-gray'
type DividerVariant =
  | 'line'
  | 'circles'
  | 'single-centered-circle'
  | 'three-centered-circles'
type DividerOrientation = 'horizontal' | 'vertical'

interface DividerProps {
  className?: string
  orientation?: DividerOrientation
  color?: DividerColor
  variant?: DividerVariant
}

/** Prefer theme classes over inline style writes (js-batch-dom-css). */
const COLOR_CLASS: Record<DividerColor, string> = {
  'brand-dark': 'bg-brand-dark',
  'brand-tan': 'bg-brand-tan',
  'brand-brown': 'bg-brand-brown',
  'brand-gray': 'bg-brand-gray',
}

/** Hoisted mask styles — stable object identity (rendering-hoist-jsx). */
const ORNAMENT_MASK_STYLE = {
  maskImage: `url(${singleCenteredCircleOrnament})`,
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskImage: `url(${singleCenteredCircleOrnament})`,
  WebkitMaskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
} as const

interface ColoredDividerProps {
  className?: string
  colorClass: string
}

/** Module-level child (rerender-no-inline-components). */
function DividerDot({
  colorClass,
  className,
}: {
  colorClass: string
  className?: string
}) {
  return (
    <span className={cn('size-2 shrink-0 rounded-full', colorClass, className)} />
  )
}

/** Module-level child — organic Figma blob via CSS mask. */
function DividerOrnament({ colorClass }: { colorClass: string }) {
  return (
    <span
      className={cn('size-2.75 shrink-0', colorClass)}
      style={ORNAMENT_MASK_STYLE}
    />
  )
}

/** Module-level child — three organic ornaments (rerender-no-inline-components). */
function ThreeCirclesOrnament({
  colorClass,
  className,
  gapClassName = 'gap-10',
}: {
  colorClass: string
  className?: string
  /** Center trio uses ~40px; side trios in Figma are tighter (~14px). */
  gapClassName?: string
}) {
  return (
    <div className={cn('flex shrink-0 items-center', gapClassName, className)}>
      <DividerOrnament colorClass={colorClass} />
      <DividerOrnament colorClass={colorClass} />
      <DividerOrnament colorClass={colorClass} />
    </div>
  )
}

/**
 * Side wing from Figma Group 679: short line (465) | trio | long line (814).
 * `reverse` mirrors for the right wing.
 */
function ThreeCirclesWing({
  colorClass,
  reverse = false,
}: {
  colorClass: string
  reverse?: boolean
}) {
  const shortLine = (
    <div className={cn('h-0.5 min-w-0 flex-465', colorClass)} />
  )
  const longLine = (
    <div className={cn('h-0.5 min-w-0 flex-814', colorClass)} />
  )
  const ornaments = (
    <ThreeCirclesOrnament
      colorClass={colorClass}
      className="mx-6"
      gapClassName="gap-3.5"
    />
  )

  return (
    <div className="flex min-w-0 flex-1 items-center">
      {reverse ? (
        <>
          {longLine}
          {ornaments}
          {shortLine}
        </>
      ) : (
        <>
          {shortLine}
          {ornaments}
          {longLine}
        </>
      )}
    </div>
  )
}

/** Module-level child (rerender-no-inline-components). */
function CirclesOrnament({ colorClass }: { colorClass: string }) {
  return (
    <div className="absolute top-1/2 left-1/2 flex -translate-1/2 flex-row items-center">
      <div className="flex items-center justify-center bg-brand-cream px-4">
        <DividerDot colorClass={colorClass} className="mr-3.5" />
        <DividerDot colorClass={colorClass} className="mr-3.5" />
        <DividerDot colorClass={colorClass} />
      </div>
    </div>
  )
}

/** Module-level variant (rerender-no-inline-components). */
function LineDivider({
  className,
  colorClass,
  orientation,
}: ColoredDividerProps & { orientation: DividerOrientation }) {
  return (
    <div
      className={cn(
        orientation === 'horizontal' ? 'h-0.5 w-full' : 'h-full w-px',
        colorClass,
        className,
      )}
      aria-hidden="true"
    />
  )
}

/** Module-level variant (rerender-no-inline-components). */
function CirclesDivider({ className, colorClass }: ColoredDividerProps) {
  return (
    <div
      className={cn('relative h-0.5 w-full', colorClass, className)}
      aria-hidden="true"
    >
      <CirclesOrnament colorClass={colorClass} />
    </div>
  )
}

/** Module-level variant (rerender-no-inline-components). */
function SingleCenteredCircleDivider({
  className,
  colorClass,
}: ColoredDividerProps) {
  return (
    <div
      className={cn('flex h-2.75 w-full items-center', className)}
      aria-hidden="true"
    >
      <div className={cn('h-0.5 min-w-0 flex-1', colorClass)} />
      <div className="mx-10 flex shrink-0 items-center">
        <DividerOrnament colorClass={colorClass} />
      </div>
      <div className={cn('h-0.5 min-w-0 flex-1', colorClass)} />
    </div>
  )
}

/**
 * Figma Group 679: left wing + center trio + right wing
 * (rerender-no-inline-components).
 */
function ThreeCenteredCirclesDivider({
  className,
  colorClass,
}: ColoredDividerProps) {
  return (
    <div
      className={cn('flex h-2.75 w-full items-center', className)}
      aria-hidden="true"
    >
      <ThreeCirclesWing colorClass={colorClass} />
      <ThreeCirclesOrnament colorClass={colorClass} className="mx-8" />
      <ThreeCirclesWing colorClass={colorClass} reverse />
    </div>
  )
}

function Divider({
  className,
  orientation = 'horizontal',
  color = 'brand-dark',
  variant = 'line',
}: DividerProps) {
  const colorClass = COLOR_CLASS[color]

  // Early exit by variant (js-early-exit). Ornament variants are horizontal-only.
  if (variant === 'single-centered-circle' && orientation === 'horizontal') {
    return (
      <SingleCenteredCircleDivider className={className} colorClass={colorClass} />
    )
  }

  if (variant === 'three-centered-circles' && orientation === 'horizontal') {
    return (
      <ThreeCenteredCirclesDivider className={className} colorClass={colorClass} />
    )
  }

  if (variant === 'circles' && orientation === 'horizontal') {
    return <CirclesDivider className={className} colorClass={colorClass} />
  }

  return (
    <LineDivider
      className={className}
      colorClass={colorClass}
      orientation={orientation}
    />
  )
}

export default Divider
