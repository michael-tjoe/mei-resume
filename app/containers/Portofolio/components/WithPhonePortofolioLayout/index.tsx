import Image, { type StaticImageData } from 'next/image';

import { cn } from '@/lib/cn';

import icInstagram from '../CompanyName/assets/ic-instagram.svg';
import sectionDivider from './assets/section-divider.svg';

type WithPhonePortofolioLayoutProps = {
  name: string;
  subtitle: string;
  href: string;
  feeds: StaticImageData[];
  gebrakPhoneMockup: StaticImageData;
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
  feeds,
  gebrakPhoneMockup,
  className,
}: WithPhonePortofolioLayoutProps) {
  return (
    <div
      className={cn('flex size-full shrink-0 flex-col justify-center px-18 pt-10 pb-8', className)}
    >
      <SectionDivider className="shrink-0 grow-0" />

      <div className="mt-8 flex min-h-0 shrink grow items-stretch gap-6 overflow-hidden pb-6">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
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

          <div className="mt-5 grid min-h-0 flex-1 grid-cols-[repeat(3,calc((100%-2*24px)/3))] grid-rows-[repeat(3,calc((100%-2*20px)/3))] gap-x-6 gap-y-5">
            {feeds.map((src, index) => (
              <div key={index} className="relative size-full overflow-hidden">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 840px) 15vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-full shrink-0">
          <Image
            src={gebrakPhoneMockup}
            alt={`${name} Instagram feed mockup`}
            width={1104}
            height={2192}
            className="h-full w-auto max-w-none"
            priority
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
