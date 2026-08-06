import type { StaticImageData } from 'next/image';

import gebrakMockup from '../assets/gebrak/phone-mockup.png';
import kuiskabarMockup from '../assets/kuiskabar/phone-mockup.png';
import masindoMockup from '../assets/masindo/phone-mockup.png';
import {
  DESKTOP_GEBRAK_FEEDS,
  DESKTOP_KUISKABAR_FEEDS,
  DESKTOP_MASINDO_FEEDS,
} from './desktopSlider';
import { GEBRAK_FEEDS, KUISKABAR_FEEDS, MASINDO_FEEDS } from './slider';

export type FeaturedCompanyBlock = {
  name: string;
  subtitle: string;
  href: string;
  mobileFeeds: StaticImageData[];
  desktopFeeds: StaticImageData[];
  phoneMockup: StaticImageData;
};

export const MASINDO_PORTOFOLIO: FeaturedCompanyBlock = {
  name: '@masindo.id',
  subtitle: 'social media design',
  href: 'https://www.instagram.com/masindo.id/',
  mobileFeeds: MASINDO_FEEDS,
  desktopFeeds: DESKTOP_MASINDO_FEEDS,
  phoneMockup: masindoMockup,
};

export const KUISKABAR_PORTOFOLIO: FeaturedCompanyBlock = {
  name: '@koalisibebas_tar',
  subtitle: 'social media design',
  href: 'https://www.instagram.com/koalisibebas_tar/',
  mobileFeeds: KUISKABAR_FEEDS,
  desktopFeeds: DESKTOP_KUISKABAR_FEEDS,
  phoneMockup: kuiskabarMockup,
};

export const GEBRAK_PORTOFOLIO: FeaturedCompanyBlock = {
  name: '@gerakanbebastar',
  subtitle: 'social media design',
  href: 'https://www.instagram.com/gerakanbebastar/',
  mobileFeeds: GEBRAK_FEEDS,
  desktopFeeds: DESKTOP_GEBRAK_FEEDS,
  phoneMockup: gebrakMockup,
};

export const SOCIAL_MEDIA_DESIGNS_PORTOFOLIO: FeaturedCompanyBlock[] = [
  MASINDO_PORTOFOLIO,
  KUISKABAR_PORTOFOLIO,
  GEBRAK_PORTOFOLIO,
];
