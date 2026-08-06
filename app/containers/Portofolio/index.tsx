import Image, { type StaticImageData } from 'next/image';

import { DesktopOnly } from '@/components/DesktopOnly';
import { MobileOnly } from '@/components/MobileOnly';
import SectionTitle from '@/components/SectionTitle';
import Slider from '@/components/Slider';

import CompanyName from './components/CompanyName';
import WithPhonePortofolioLayout from './components/WithPhonePortofolioLayout';
import { COMPANIES, GEBRAK_PORTOFOLIO } from './constants/companies';
import DesktopNavbar from '@/components/PortofolioNavigation/DesktopNavbar';
import { PORTOFOLIO_NAV_RAIL_ID } from '@/providers/NavigationProvider';

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
        <div className="flex h-full shrink-0 grow flex-col pl-35.5">
          <WithPhonePortofolioLayout {...GEBRAK_PORTOFOLIO} />
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
