import Image, { type StaticImageData } from 'next/image';

import { cn } from '@/lib/cn';

import PortofolioTypeItem from '../PortofolioTypeItem';
import sectionDivider from './assets/section-divider.svg';

type WithPhonePortofolioLayoutProps = {
  name: string;
  subtitle: string;
  href: string;
  hrefType: 'ig' | 'website' | '';
  desktopFeeds: StaticImageData[];
  collectionFrame: StaticImageData;
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
  hrefType,
  desktopFeeds,
  collectionFrame,
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
          <PortofolioTypeItem name={name} subtitle={subtitle} href={href} hrefType={hrefType} />

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
            src={collectionFrame}
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
