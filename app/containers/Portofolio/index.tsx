import Image, { type StaticImageData } from 'next/image';

import { DesktopOnly } from '@/components/DesktopOnly';
import { MobileOnly } from '@/components/MobileOnly';
import DesktopNavbar from '@/components/PortofolioNavigation/DesktopNavbar';
import SectionTitle from '@/components/SectionTitle';
import Slider from '@/components/Slider';
import { cn } from '@/lib/cn';
import { PORTOFOLIO_NAV_RAIL_ID } from '@/providers/NavigationProvider';

import IllustrationPortofolioLayout from './components/IllustrationPortofolioLayout';
import PortofolioTypeItem from './components/PortofolioTypeItem';
import WithNotebookPortofolioLayout from './components/WithNotebookPortofolioLayout';
import WithPhonePortofolioLayout from './components/WithPhonePortofolioLayout';
import { ILLUSTRATIONS_PORTOFOLIO } from './constants/illustrations';
import { SOCIAL_MEDIA_DESIGNS_PORTOFOLIO } from './constants/socialMediaDesigns';
import { UI_DESIGNS_PORTOFOLIO } from './constants/uiDesigns';

const CARD_CLASS = 'relative aspect-[206/258] overflow-hidden';
const IMAGE_CLASS = 'object-cover';

function FeedSlider({ feeds }: { feeds: StaticImageData[] }) {
  return (
    <Slider
      visibleItems={1.6}
      visibleItems480={2.5}
      visibleItems600={3.2}
      visibleItemsTablet={3.8}
      gap={20}
      className="mt-3"
    >
      {feeds.map((src, index) => (
        <div key={index} className={CARD_CLASS}>
          <Image src={src} alt="" fill sizes="65vw" className={IMAGE_CLASS} />
        </div>
      ))}
    </Slider>
  );
}

export default function Portofolio() {
  return (
    <section className="relative z-30 w-full pb-14 desktop:h-svh desktop:shrink-0 desktop:pb-0">
      <DesktopOnly>
        <div id={PORTOFOLIO_NAV_RAIL_ID} className="absolute inset-y-0 left-0 z-(--znavbar) w-18">
          <DesktopNavbar sticky invert text="portofolio" />
        </div>

        <div className="flex h-full shrink-0 grow-0 flex-col items-start pl-35.5">
          <div className="flex h-full pl-[calc(72/1080*100vh)]">
            {SOCIAL_MEDIA_DESIGNS_PORTOFOLIO.map((portfolio, index) => (
              <WithPhonePortofolioLayout
                key={portfolio.name}
                {...portfolio}
                className={cn(
                  index % 2 === 1 && 'bg-white',
                  index > 0 && 'pl-[calc(72/1080*100vh)]',
                )}
              />
            ))}
            {UI_DESIGNS_PORTOFOLIO.map((portfolio, index) => {
              const globalIndex = SOCIAL_MEDIA_DESIGNS_PORTOFOLIO.length + index;

              return (
                <WithNotebookPortofolioLayout
                  key={portfolio.name}
                  {...portfolio}
                  className={cn(
                    globalIndex % 2 === 1 && 'bg-white',
                    globalIndex > 0 && 'pl-[calc(72/1080*100vh)]',
                  )}
                />
              );
            })}
            {ILLUSTRATIONS_PORTOFOLIO.map((portfolio, index) => {
              const globalIndex =
                SOCIAL_MEDIA_DESIGNS_PORTOFOLIO.length + UI_DESIGNS_PORTOFOLIO.length + index;

              return (
                <IllustrationPortofolioLayout
                  key={portfolio.name}
                  {...portfolio}
                  className={cn(
                    globalIndex % 2 === 1 && 'bg-white',
                    globalIndex > 0 && 'pl-[calc(72/1080*100vh)]',
                    portfolio.className,
                  )}
                />
              );
            })}
          </div>
        </div>
      </DesktopOnly>

      <MobileOnly>
        <SectionTitle
          id="portofolio"
          text="portfolio"
          invert
          className="scroll-mt-[calc(var(--spacing)*12.25-20px)] px-side pt-10 pb-5"
        />
        <div className="pt-3 [&>div:not(:last-child)]:mb-7">
          {SOCIAL_MEDIA_DESIGNS_PORTOFOLIO.map((portfolio) => (
            <div key={portfolio.name}>
              <PortofolioTypeItem
                name={portfolio.name}
                subtitle={portfolio.subtitle}
                href={portfolio.href}
                hrefType={portfolio.hrefType}
                className="px-side"
              />
              <FeedSlider feeds={portfolio.mobileFeeds} />
            </div>
          ))}
        </div>
      </MobileOnly>
    </section>
  );
}
