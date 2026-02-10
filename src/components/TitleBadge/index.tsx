import cn from 'classnames'

interface TitleBadgeProps {
  title?: string
  className?: string
}

function TitleBadge({
  title = 'graphic designer',
  className,
}: TitleBadgeProps) {
  return (
    <div
      className={cn(
        'mt-2 flex max-h-[46px] w-fit max-w-[81px] items-center justify-center overflow-hidden rounded-[10px] border border-brand-dark px-3 py-2 min-[400px]:max-w-none',
        className,
      )}
    >
      <p className="text-center text-portofolio-title-badge text-brand-dark min-[400px]:whitespace-nowrap">
        {title}
      </p>
    </div>
  )
}

export default TitleBadge
