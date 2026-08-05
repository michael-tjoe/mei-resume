import Image, { type StaticImageData } from 'next/image';

import SectionTitle from '@/components/SectionTitle';
import Slider from '@/components/Slider';

import CompanyName from './components/CompanyName';

import masindo1 from './assets/masindo/feed-1.jpg';
import masindo2 from './assets/masindo/feed-2.jpg';
import masindo3 from './assets/masindo/feed-3.jpg';
import masindo4 from './assets/masindo/feed-4.jpg';
import masindo5 from './assets/masindo/feed-5.jpg';
import masindo6 from './assets/masindo/feed-6.jpg';
import masindo7 from './assets/masindo/feed-7.jpg';
import masindo8 from './assets/masindo/feed-8.jpg';
import masindo9 from './assets/masindo/feed-9.jpg';

import kuiskabar1 from './assets/kuiskabar/feed-1.jpg';
import kuiskabar2 from './assets/kuiskabar/feed-2.jpg';
import kuiskabar3 from './assets/kuiskabar/feed-3.jpg';
import kuiskabar4 from './assets/kuiskabar/feed-4.jpg';
import kuiskabar5 from './assets/kuiskabar/feed-5.jpg';
import kuiskabar6 from './assets/kuiskabar/feed-6.jpg';
import kuiskabar7 from './assets/kuiskabar/feed-7.jpg';
import kuiskabar8 from './assets/kuiskabar/feed-8.jpg';
import kuiskabar9 from './assets/kuiskabar/feed-9.jpg';

import gebrak1 from './assets/gebrak/feed-1.jpg';
import gebrak2 from './assets/gebrak/feed-2.jpg';
import gebrak3 from './assets/gebrak/feed-3.jpg';
import gebrak4 from './assets/gebrak/feed-4.jpg';
import gebrak5 from './assets/gebrak/feed-5.jpg';
import gebrak6 from './assets/gebrak/feed-6.jpg';
import gebrak7 from './assets/gebrak/feed-7.jpg';
import gebrak8 from './assets/gebrak/feed-8.jpg';
import gebrak9 from './assets/gebrak/feed-9.jpg';
import { MobileOnly } from '@/components/MobileOnly';
import { DesktopOnly } from '@/components/DesktopOnly';

/** Hoisted static galleries (rendering-hoist-jsx / server-hoist-static-io). */
const MASINDO_FEEDS: StaticImageData[] = [
  masindo1,
  masindo2,
  masindo3,
  masindo4,
  masindo5,
  masindo6,
  masindo7,
  masindo8,
  masindo9,
];

const KUISKABAR_FEEDS: StaticImageData[] = [
  kuiskabar1,
  kuiskabar2,
  kuiskabar3,
  kuiskabar4,
  kuiskabar5,
  kuiskabar6,
  kuiskabar7,
  kuiskabar8,
  kuiskabar9,
];

const GEBRAK_FEEDS: StaticImageData[] = [
  gebrak1,
  gebrak2,
  gebrak3,
  gebrak4,
  gebrak5,
  gebrak6,
  gebrak7,
  gebrak8,
  gebrak9,
];

const CARD_CLASS = 'relative aspect-[206/258] overflow-hidden';
const IMAGE_CLASS = 'object-cover';

type CompanyBlock = {
  name: string;
  subtitle: string;
  href: string;
  feeds: StaticImageData[];
};

const COMPANIES: CompanyBlock[] = [
  {
    name: '@masindo.id',
    subtitle: 'social media design',
    href: 'https://www.instagram.com/masindo.id/',
    feeds: MASINDO_FEEDS,
  },
  {
    name: '@koalisibebas_tar',
    subtitle: 'social media design',
    href: 'https://www.instagram.com/masindo.id/',
    feeds: KUISKABAR_FEEDS,
  },
  {
    name: '@gerakanbebastar',
    subtitle: 'social media design',
    href: 'https://www.instagram.com/masindo.id/',
    feeds: GEBRAK_FEEDS,
  },
];

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
    <section className="relative z-30 min-h-[2000px] w-full pb-14">
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
