import type { StaticImageData } from 'next/image';

import { GEBRAK_FEEDS, KUISKABAR_FEEDS, MASINDO_FEEDS } from './slider';

export type CompanyBlock = {
  name: string;
  subtitle: string;
  href: string;
  feeds: StaticImageData[];
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
  {
    name: '@gerakanbebastar',
    subtitle: 'social media design',
    href: 'https://www.instagram.com/masindo.id/',
    feeds: GEBRAK_FEEDS,
  },
];
