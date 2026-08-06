import Image, { type StaticImageData } from 'next/image';

import { cn } from '@/lib/cn';

import icInstagram from '../CompanyName/assets/ic-instagram.svg';
import sectionDivider from './assets/section-divider.svg';

type WithPhonePortofolioLayoutProps = {
  name: string;
  subtitle: string;
  href: string;
  desktopFeeds: StaticImageData[];
  phoneMockup: StaticImageData;
  className?: string;
};

/** Hoisted static images (rendering-hoist-jsx / server-hoist-static-io). */
const dividerImage = (
  <Image
    src={sectionDivider}
    alt=""
    width={1415}
    height={32}
    unoptimized
    className="h-auto w-full"
  />
);

const instagramIcon = (
  <Image src={icInstagram} alt="" width={67} height={67} unoptimized className="size-full" />
);

function SectionDivider({ flip = false, className }: { flip?: boolean; className?: string }) {
  return (
    <div className={cn(flip && '-scale-y-100', className)} aria-hidden="true">
      {dividerImage}
    </div>
  );
}

function WithPhonePortofolioLayout({
  name,
  subtitle,
  href,
  desktopFeeds,
  phoneMockup,
  className,
}: WithPhonePortofolioLayoutProps) {
  return (
    <div
      className={cn(
        'flex aspect-1518/1080 h-full max-w-full shrink-0 flex-col justify-center pt-10 pb-8',
        className,
      )}
    >
      <SectionDivider className="shrink-0 grow-0" />

      <div className="mt-8 flex shrink grow overflow-hidden pb-5">
        <div className="relative flex aspect-830/754 max-h-full max-w-full shrink-0 grow-0 flex-col">
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex flex-col text-brand-dark">
              <p className="text-2xl/normal font-bold">{name}</p>
              <p className="text-xl/normal font-bold">{subtitle}</p>
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block size-16.75 shrink-0 overflow-hidden transition-opacity hover:opacity-80"
              aria-label={`Open ${name} on Instagram`}
            >
              {instagramIcon}
            </a>
          </div>

          <div className="mt-5 grid size-full  grid-cols-4 grid-rows-3 gap-x-6 gap-y-3 overflow-hidden">
            {desktopFeeds.map((src, index) => (
              <div key={index} className="relative aspect-193/241 h-full overflow-hidden">
                <Image src={src} alt="" fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-552/1275 h-full max-w-full shrink-0 grow">
          <Image
            src={phoneMockup}
            alt={`${name} Instagram feed mockup`}
            width={1104}
            height={2160}
            className="size-full object-contain"
            priority
            unoptimized
          />
        </div>
      </div>

      <div className="mt-auto shrink-0">
        <SectionDivider flip />
      </div>
    </div>
  );
}

export default WithPhonePortofolioLayout;
