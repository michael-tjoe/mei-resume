interface DividerProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  color?: 'brand-dark' | 'brand-tan' | 'brand-brown' | 'brand-gray'
  variant?: 'line' | 'circles'
}

const colorMap = {
  'brand-dark': 'var(--color-brand-dark)',
  'brand-tan': 'var(--color-brand-tan)',
  'brand-brown': 'var(--color-brand-brown)',
  'brand-gray': 'var(--color-brand-gray)',
}

function Divider({
  className,
  orientation = 'horizontal',
  color = 'brand-dark',
  variant = 'line',
}: DividerProps) {
  const bgColor = colorMap[color]
  const sizeClass =
    orientation === 'horizontal' ? 'w-full h-[2px]' : 'h-full w-px'
  const baseClass = sizeClass
  const combinedClass = className ? `${baseClass} ${className}` : baseClass
  const showCircles = variant === 'circles' && orientation === 'horizontal'

  return (
    <div
      className={combinedClass}
      style={{
        background: bgColor,
        ...(showCircles && { position: 'relative' as const }),
      }}
      aria-hidden="true"
    >
      {showCircles && (
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-row items-center">
          <div className="bg-brand-cream flex items-center justify-center px-4">
            <span
              className="shrink-0 rounded-full"
              style={{
                width: 8,
                height: 8,
                background: bgColor,
                marginRight: 14,
              }}
            />
            <span
              className="shrink-0 rounded-full"
              style={{
                width: 8,
                height: 8,
                background: bgColor,
                marginRight: 14,
              }}
            />
            <span
              className="shrink-0 rounded-full"
              style={{
                width: 8,
                height: 8,
                background: bgColor,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Divider
