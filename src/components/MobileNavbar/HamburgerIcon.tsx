import cn from 'classnames'

import { useViewport } from '../../providers/ViewportProvider'

const HAMBURGER_SIZE_MAP = {
  sm: {
    width: 27,
    height: 20,
    viewBox: '0 0 27 20',
    paths: [
      'M0 1.5H26.8529',
      'M0 9.50877H26.8529',
      'M0 17.5175H26.8529',
    ],
    strokeWidth: 3,
  },
  md: {
    width: 52,
    height: 37,
    viewBox: '0 0 52 37',
    paths: [
      'M0 2.5H52',
      'M0 18.0088H52',
      'M0 33.5175H52',
    ],
    strokeWidth: 5,
  },
} as const

interface HamburgerIconProps {
  className?: string
}

function HamburgerIcon({ className = '' }: HamburgerIconProps) {
  const { isDesktop } = useViewport()
  const size = isDesktop ? HAMBURGER_SIZE_MAP.md : HAMBURGER_SIZE_MAP.sm

  return (
    <svg
      width={size.width}
      height={size.height}
      viewBox={size.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('stroke-white desktop:stroke-brand-cream', className)}
    >
      {size.paths.map((d) => (
        <path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={size.strokeWidth}
        />
      ))}
    </svg>
  )
}

export default HamburgerIcon
