import { cn } from '@/lib/cn';

/**
 * Card matching Figma node 428-80 (Group 689).
 * 34×34px, 5px corner radius.
 */
interface SoftwareAppCardProps {
  children: React.ReactNode;
  className?: string;
}

function SoftwareAppCard({ children, className }: SoftwareAppCardProps) {
  return (
    <div
      className={cn(
        'mr-1.5 flex size-8.5  shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[5px] border-2 border-brand-dark bg-brand-cream transition-colors duration-300 ease-in-out last:mr-0 hover:bg-brand-dark active:bg-brand-dark desktop:size-19.5  [&_path]:transition-[fill] [&_path]:duration-300 [&_path]:ease-in-out hover:[&_path]:fill-white active:[&_path]:fill-white',
        className,
      )}
      aria-hidden
    >
      {children}
    </div>
  );
}

export default SoftwareAppCard;
