import type { StaticImageData } from 'next/image';

import collectionFrameGebrak from '../assets/gebrakUiDesign/collectionFrame.png';
import collectionFrameIceBsd from '../assets/iceBsdUiDesign/collectionFrame.png';
import gebrakDesktop1 from '../assets/gebrakUiDesign/desktop/gebrak-desktop-1.png';
import gebrakDesktop2 from '../assets/gebrakUiDesign/desktop/gebrak-desktop-2.png';
import gebrakDesktop3 from '../assets/gebrakUiDesign/desktop/gebrak-desktop-3.png';
import iceBsdDesktop1 from '../assets/iceBsdUiDesign/desktop/ice-bsd-desktop-1.png';
import iceBsdDesktop2 from '../assets/iceBsdUiDesign/desktop/ice-bsd-desktop-2.png';
import iceBsdDesktop3 from '../assets/iceBsdUiDesign/desktop/ice-bsd-desktop-3.png';
import type { NotebookCompanyBlock } from '../types';

const GEBRAK_UI_FEEDS: StaticImageData[] = [gebrakDesktop1, gebrakDesktop2, gebrakDesktop3];
const ICE_BSD_UI_FEEDS: StaticImageData[] = [iceBsdDesktop1, iceBsdDesktop2, iceBsdDesktop3];

export const GEBRAK_UI_PORTOFOLIO: NotebookCompanyBlock = {
  name: '@gerakanbebastar',
  subtitle: 'ui design',
  href: 'https://www.instagram.com/gerakanbebastar/',
  hrefType: 'website',
  mobileFeeds: GEBRAK_UI_FEEDS,
  desktopFeeds: GEBRAK_UI_FEEDS,
  desktopFeedAspectRatios: ['810/1644', '814/2160', '2018/2160'],
  collectionFrame: collectionFrameGebrak,
  collectionFrameAspectRatio: '2280/2042',
};

export const ICE_BSD_UI_PORTOFOLIO: NotebookCompanyBlock = {
  name: 'ICE BSD',
  subtitle: 'ui design',
  href: 'https://ice-indonesia.com/en/event/event_calendar',
  hrefType: 'website',
  mobileFeeds: ICE_BSD_UI_FEEDS,
  desktopFeeds: ICE_BSD_UI_FEEDS,
  desktopFeedAspectRatios: ['790/1648', '792/2160', '2022/2160'],
  collectionFrame: collectionFrameIceBsd,
  collectionFrameAspectRatio: '2548/2160',
};

export const UI_DESIGNS_PORTOFOLIO: NotebookCompanyBlock[] = [
  GEBRAK_UI_PORTOFOLIO,
  ICE_BSD_UI_PORTOFOLIO,
];
