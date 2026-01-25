interface BrandLogoProps {
  text: string
  rotate?: number
  left?: number
  className?: string
}

function BrandLogo({
  text,
  rotate = -7.03,
  left = 74,
  className = '',
}: BrandLogoProps) {
  return (
    <span
      className={`relative font-sora text-[28px] font-semibold text-brand-dark desktop:text-[48px] desktop:leading-[1.26] after:absolute after:bottom-0 after:left-(--brand-left) after:translate-y-[27%] after:rotate-(--brand-rotate) after:font-script after:text-[25px] after:text-white after:content-(--brand-text) desktop:after:text-[40px] ${className}`}
      style={
        {
          '--brand-text': `'${text}'`,
          '--brand-rotate': `${rotate}deg`,
          '--brand-left': `${left}%`,
        } as React.CSSProperties
      }
    >
      {text}
    </span>
  )
}

export default BrandLogo
