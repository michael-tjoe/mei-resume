'use client';

import { useHorizontalScrollApi } from '@/components/HorizontalScroll';
import { PORTOFOLIO_SCROLL_Y } from '@/constants/desktopNavScroll';
import { cn } from '@/lib/cn';

interface ViewWorksButtonProps {
  className?: string;
}

/**
 * CTA matching Figma Component 9 (node 830:600) — 210×70, 15px radius.
 */
export default function ViewWorksButton({ className }: ViewWorksButtonProps) {
  const { scrollTo } = useHorizontalScrollApi();

  return (
    <a
      href="#portfolio"
      onClick={(event) => {
        event.preventDefault();
        scrollTo(PORTOFOLIO_SCROLL_Y);
      }}
      className={cn(
        'mx-auto mt-auto mb-[calc(64/1920*100vh)] flex h-17.5 w-52.5 shrink-0 items-center justify-center rounded-[15px] border border-brand-dark bg-brand-cream text-[22px] leading-normal font-normal text-brand-dark transition-colors duration-300 ease-in-out hover:bg-brand-dark hover:text-white active:bg-brand-dark active:text-white timeline-h-1080:mb-[calc(64/1080*100vh)]',
        className,
      )}
    >
      view works
    </a>
  );
}
