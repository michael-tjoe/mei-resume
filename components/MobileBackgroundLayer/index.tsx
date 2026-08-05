import { cn } from '@/lib/cn';

interface MobileBackgroundLayerProps {
  className?: string;
}

export default function MobileBackgroundLayer({ className }: MobileBackgroundLayerProps) {
  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 h-44.5 w-full translate-y-7 rounded-[30px] bg-brand-cream tablet:bg-brand-dark desktop:hidden',
        className,
      )}
    />
  );
}
