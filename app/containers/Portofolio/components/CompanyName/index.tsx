import Image from 'next/image';

import { cn } from '@/lib/cn';

import icInstagram from './assets/ic-instagram.svg';

interface CompanyNameProps {
  name: string;
  subtitle: string;
  href: string;
  className?: string;
}

/** Hoisted utility strings (rendering-hoist-jsx). */
const ROOT_CLASS = 'flex w-full items-center justify-between';
const TEXT_CLASS = 'flex flex-col items-start gap-0.5 text-brand-dark';
const NAME_CLASS = 'text-[14px] leading-normal font-bold whitespace-nowrap';
const SUBTITLE_CLASS = 'text-[10px] leading-normal font-bold whitespace-nowrap';
const LINK_CLASS =
  'relative block size-12 shrink-0 overflow-hidden transition-opacity hover:opacity-80';

/** Hoisted static image (rendering-hoist-jsx / server-hoist-static-io). */
const instagramIcon = (
  <Image src={icInstagram} alt="" width={48} height={48} unoptimized className="size-full" />
);

function CompanyName({ name, subtitle, href, className }: CompanyNameProps) {
  return (
    <div className={cn(ROOT_CLASS, className)}>
      <div className={TEXT_CLASS}>
        <p className={NAME_CLASS}>{name}</p>
        <p className={SUBTITLE_CLASS}>{subtitle}</p>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
        aria-label={`Open ${name} on Instagram`}
      >
        {instagramIcon}
      </a>
    </div>
  );
}

export default CompanyName;
