import { cn } from '@/lib/cn';

interface TitleBadgeProps {
  title?: string;
  className?: string;
}

function TitleBadge({ title = 'graphic designer', className }: TitleBadgeProps) {
  return (
    <div
      className={cn(
        'mt-2 flex max-h-11.5 w-fit max-w-20.25 items-center justify-center overflow-hidden rounded-[10px] border border-brand-dark bg-transparent px-3 py-2 text-brand-dark min-[400px]:max-w-none desktop:cursor-pointer desktop:bg-brand-cream desktop:transition-colors desktop:duration-300 desktop:ease-in-out desktop:hover:bg-brand-dark desktop:hover:text-white desktop:active:bg-brand-dark desktop:active:text-white',
        className,
      )}
    >
      <p className="text-center text-portofolio-title-badge text-current min-[400px]:whitespace-nowrap">
        {title}
      </p>
    </div>
  );
}

export default TitleBadge;
