import gebrakMockup from '../assets/gebrak/phone-mockup.png';
import kuiskabarMockup from '../assets/kuiskabar/phone-mockup.png';
import masindoMockup from '../assets/masindo/phone-mockup.png';
import type { FeaturedCompanyBlock } from '../types';
import {
  DESKTOP_GEBRAK_FEEDS,
  DESKTOP_KUISKABAR_FEEDS,
  DESKTOP_MASINDO_FEEDS,
} from './desktopSlider';
import { GEBRAK_FEEDS, KUISKABAR_FEEDS, MASINDO_FEEDS } from './mobileSliders';

export const MASINDO_PORTOFOLIO: FeaturedCompanyBlock = {
  name: '@masindo.id',
  subtitle: 'social media design',
  href: 'https://www.instagram.com/masindo.id/',
  hrefType: 'ig',
  mobileFeeds: MASINDO_FEEDS,
  desktopFeeds: DESKTOP_MASINDO_FEEDS,
  collectionFrame: masindoMockup,
};

export const KUISKABAR_PORTOFOLIO: FeaturedCompanyBlock = {
  name: '@koalisibebas_tar',
  subtitle: 'social media design',
  href: 'https://www.instagram.com/koalisibebas_tar/',
  hrefType: 'ig',
  mobileFeeds: KUISKABAR_FEEDS,
  desktopFeeds: DESKTOP_KUISKABAR_FEEDS,
  collectionFrame: kuiskabarMockup,
};

export const GEBRAK_PORTOFOLIO: FeaturedCompanyBlock = {
  name: '@gerakanbebastar',
  subtitle: 'social media design',
  href: 'https://www.instagram.com/gerakanbebastar/',
  hrefType: 'ig',
  mobileFeeds: GEBRAK_FEEDS,
  desktopFeeds: DESKTOP_GEBRAK_FEEDS,
  collectionFrame: gebrakMockup,
};

export const SOCIAL_MEDIA_DESIGNS_PORTOFOLIO: FeaturedCompanyBlock[] = [
  MASINDO_PORTOFOLIO,
  KUISKABAR_PORTOFOLIO,
  GEBRAK_PORTOFOLIO,
];
