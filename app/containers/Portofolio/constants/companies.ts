import type { StaticImageData } from 'next/image';

import gebrakMockup from '../assets/gebrak/phone-mockup.webp';
import { GEBRAK_FEEDS, KUISKABAR_FEEDS, MASINDO_FEEDS } from './slider';

export type CompanyBlock = {
  name: string;
  subtitle: string;
  href: string;
  feeds: StaticImageData[];
  gebrakPhoneMockup?: StaticImageData;
};

export type FeaturedCompanyBlock = CompanyBlock & {
  gebrakPhoneMockup: StaticImageData;
};

/** @gerakanbebastar two-column showcase (Figma Frame 5). */
export const GEBRAK_PORTOFOLIO: FeaturedCompanyBlock = {
  name: '@gerakanbebastar',
  subtitle: 'social media design',
  href: 'https://www.instagram.com/gerakanbebastar/',
  feeds: GEBRAK_FEEDS,
  gebrakPhoneMockup: gebrakMockup,
};

export const COMPANIES: CompanyBlock[] = [
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
  GEBRAK_PORTOFOLIO,
];
