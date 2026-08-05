import { cn } from '@/lib/cn';

interface MobileBackgroundLayerProps {
  className?: string;
  id?: string;
}

export default function MobileBackgroundLayer({ className, id }: MobileBackgroundLayerProps) {
  return (
    <div
      id={id}
      className={cn(
        'absolute bottom-0 left-0 h-44.5 w-full translate-y-7 rounded-[30px] bg-brand-cream tablet:bg-brand-dark desktop:hidden',
        className,
      )}
    />
  );
}
