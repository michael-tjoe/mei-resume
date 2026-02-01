interface SectionTitleProps {
  text: string
  className?: string
  invert?: boolean
}

function SectionTitle({ text, className, invert = false }: SectionTitleProps) {
  const colorClass = invert ? 'text-brand-cream' : 'text-brand-dark'
  const baseClass = `${colorClass} text-left text-portofolio-title font-bold`
  const combinedClass = className ? `${baseClass} ${className}` : baseClass

  return <h1 className={combinedClass}>{text}</h1>
}

export default SectionTitle
