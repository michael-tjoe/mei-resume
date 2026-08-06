import Image, { type StaticImageData } from 'next/image';

import { DesktopOnly } from '@/components/DesktopOnly';
import { MobileOnly } from '@/components/MobileOnly';
import SectionTitle from '@/components/SectionTitle';
import Slider from '@/components/Slider';

import CompanyName from './components/CompanyName';
import { COMPANIES } from './constants/companies';
import DesktopNavbar from '@/components/PortofolioNavigation/DesktopNavbar';

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
    <section className="relative z-30 min-h-[2000px] w-full pb-14 desktop:min-w-[4000px]">
      <DesktopOnly>
        <div className="absolute inset-y-0 left-0 z-(--znavbar) w-18">
          <DesktopNavbar sticky invert />
        </div>
      </DesktopOnly>

      <DesktopOnly>
        <SectionTitle id="portofolio" invert className="px-side pt-10 pb-5" text="portfolio" />
      </DesktopOnly>
      <MobileOnly>
        <SectionTitle
          id="portofolio"
          text="portfolio"
          invert
          className="scroll-mt-[calc(var(--spacing)*12.25-20px)] px-side pt-10 pb-5"
        />
      </MobileOnly>

      <MobileOnly>
        <div className="pt-3 [&>div:not(:last-child)]:mb-7">
          {COMPANIES.map((company, index) => (
            <div key={index}>
              <CompanyName
                name={company.name}
                subtitle={company.subtitle}
                href={company.href}
                className="px-side"
              />
              <FeedSlider feeds={company.feeds} />
            </div>
          ))}
        </div>
      </MobileOnly>
    </section>
  );
}
