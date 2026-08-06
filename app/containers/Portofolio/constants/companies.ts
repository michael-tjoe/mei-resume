import type { StaticImageData } from 'next/image';

import gebrakMockup from '../assets/gebrak/phone-mockup.png';
import masindoMockup from '../assets/masindo/phone-mockup.png';
import { DESKTOP_GEBRAK_FEEDS, DESKTOP_MASINDO_FEEDS } from './desktopSlider';
import { GEBRAK_FEEDS, KUISKABAR_FEEDS, MASINDO_FEEDS } from './slider';

export type CompanyBlock = {
  name: string;
  subtitle: string;
  href: string;
  feeds: StaticImageData[];
};

export type FeaturedCompanyBlock = {
  name: string;
  subtitle: string;
  href: string;
  mobileFeeds: StaticImageData[];
  desktopFeeds: StaticImageData[];
  phoneMockup: StaticImageData;
};

/** @masindo.id two-column showcase (Figma Frame 5). */
export const MASINDO_PORTOFOLIO: FeaturedCompanyBlock = {
  name: '@masindo.id',
  subtitle: 'social media design',
  href: 'https://www.instagram.com/masindo.id/',
  mobileFeeds: MASINDO_FEEDS,
  desktopFeeds: DESKTOP_MASINDO_FEEDS,
  phoneMockup: masindoMockup,
};

/** @gerakanbebastar two-column showcase (Figma Frame 5). */
export const GEBRAK_PORTOFOLIO: FeaturedCompanyBlock = {
  name: '@gerakanbebastar',
  subtitle: 'social media design',
  href: 'https://www.instagram.com/gerakanbebastar/',
  mobileFeeds: GEBRAK_FEEDS,
  desktopFeeds: DESKTOP_GEBRAK_FEEDS,
  phoneMockup: gebrakMockup,
};

export const COMPANIES: CompanyBlock[] = [
  {
    name: '@masindo.id',
    subtitle: 'social media design',
    href: 'https://www.instagram.com/masindo.id/',
    feeds: MASINDO_PORTOFOLIO.mobileFeeds,
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
    href: 'https://www.instagram.com/gerakanbebastar/',
    feeds: GEBRAK_PORTOFOLIO.mobileFeeds,
  },
];
