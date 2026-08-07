import type { StaticImageData } from 'next/image';

import collectionFrameGebrak from '../assets/gebrakUiDesign/collectionFrame.png';
import collectionFrameIceBsd from '../assets/iceBsdUiDesign/collectionFrame.png';
import collectionFramePtAurogen from '../assets/ptAurogenUiDesign/collectionFrame.png';
import collectionFramePtZentrumGraphicsAsia from '../assets/ptZentrumGraphicsAsiaUiDesign/collectionFrame.png';
import gebrakDesktop1 from '../assets/gebrakUiDesign/desktop/gebrak-desktop-1.png';
import gebrakDesktop2 from '../assets/gebrakUiDesign/desktop/gebrak-desktop-2.png';
import gebrakDesktop3 from '../assets/gebrakUiDesign/desktop/gebrak-desktop-3.png';
import iceBsdDesktop1 from '../assets/iceBsdUiDesign/desktop/ice-bsd-desktop-1.png';
import iceBsdDesktop2 from '../assets/iceBsdUiDesign/desktop/ice-bsd-desktop-2.png';
import iceBsdDesktop3 from '../assets/iceBsdUiDesign/desktop/ice-bsd-desktop-3.png';
import ptAurogenDesktop1 from '../assets/ptAurogenUiDesign/desktop/pt-aurogen-desktop-1.png';
import ptAurogenDesktop2 from '../assets/ptAurogenUiDesign/desktop/pt-aurogen-desktop-2.png';
import ptAurogenDesktop3 from '../assets/ptAurogenUiDesign/desktop/pt-aurogen-desktop-3png.png';
import ptZentrumGraphicsAsiaDesktop1 from '../assets/ptZentrumGraphicsAsiaUiDesign/desktop/pt-zentrum-graphics-asia-desktop-1.png';
import ptZentrumGraphicsAsiaDesktop2 from '../assets/ptZentrumGraphicsAsiaUiDesign/desktop/pt-zentrum-graphics-asia-desktop-2.png';
import ptZentrumGraphicsAsiaDesktop3 from '../assets/ptZentrumGraphicsAsiaUiDesign/desktop/pt-zentrum-graphics-asia-desktop-3.png';
import type { NotebookCompanyBlock } from '../types';

const GEBRAK_UI_FEEDS: StaticImageData[] = [gebrakDesktop1, gebrakDesktop2, gebrakDesktop3];
const ICE_BSD_UI_FEEDS: StaticImageData[] = [iceBsdDesktop1, iceBsdDesktop2, iceBsdDesktop3];
const PT_AUROGEN_UI_FEEDS: StaticImageData[] = [
  ptAurogenDesktop1,
  ptAurogenDesktop2,
  ptAurogenDesktop3,
];
const PT_ZENTRUM_GRAPHICS_ASIA_UI_FEEDS: StaticImageData[] = [
  ptZentrumGraphicsAsiaDesktop1,
  ptZentrumGraphicsAsiaDesktop2,
  ptZentrumGraphicsAsiaDesktop3,
];

export const GEBRAK_UI_PORTOFOLIO: NotebookCompanyBlock = {
  name: '@gerakanbebastar',
  subtitle: 'ui design',
  href: 'https://www.instagram.com/gerakanbebastar/',
  hrefType: 'website',
  mobileFeeds: GEBRAK_UI_FEEDS,
  desktopFeeds: GEBRAK_UI_FEEDS,
  desktopFeedAspectRatios: ['810/1644', '814/2160', '2018/2160'],
  aspectRatio: '1965/1080',
  collectionFrame: collectionFrameGebrak,
  collectionFrameAspectRatio: '2280/2042',
  collectionFramePosition: { right: 0, bottom: 0 },
};

export const ICE_BSD_UI_PORTOFOLIO: NotebookCompanyBlock = {
  name: 'ICE BSD',
  subtitle: 'ui design',
  href: 'https://ice-indonesia.com/en/event/event_calendar',
  hrefType: 'website',
  mobileFeeds: ICE_BSD_UI_FEEDS,
  desktopFeeds: ICE_BSD_UI_FEEDS,
  desktopFeedAspectRatios: ['790/1648', '792/2160', '2022/2160'],
  aspectRatio: '1965/1080',
  collectionFrame: collectionFrameIceBsd,
  collectionFrameAspectRatio: '2548/2160',
  collectionFramePosition: { right: 0, bottom: 0 },
};

export const PT_AUROGEN_UI_PORTOFOLIO: NotebookCompanyBlock = {
  name: 'PT Aurogen',
  subtitle: 'ui design',
  href: 'https://aurogen.co.id/',
  hrefType: 'website',
  mobileFeeds: [],
  desktopFeeds: PT_AUROGEN_UI_FEEDS,
  desktopFeedAspectRatios: ['610/1056', '1220/2160', '2016/2160'],
  aspectRatio: '2414/1080',
  collectionFrame: collectionFramePtAurogen,
  collectionFrameAspectRatio: '1131/984',
  collectionFramePosition: { right: '42%', bottom: '-15%' },
};

export const PT_ZENTRUM_GRAPHICS_ASIA_UI_PORTOFOLIO: NotebookCompanyBlock = {
  name: 'PT Zentrum Graphics Asia',
  subtitle: 'ui design',
  href: 'https://zengra.com/en',
  hrefType: 'website',
  mobileFeeds: [],
  desktopFeeds: PT_ZENTRUM_GRAPHICS_ASIA_UI_FEEDS,
  desktopFeedAspectRatios: ['617/1052', '617/1375', '1008/2038'],
  aspectRatio: '2414/1080',
  collectionFrame: collectionFramePtZentrumGraphicsAsia,
  collectionFrameAspectRatio: '1617/1114',
  collectionFramePosition: { right: '0%', bottom: '-15%' },
};

export const UI_DESIGNS_PORTOFOLIO: NotebookCompanyBlock[] = [
  GEBRAK_UI_PORTOFOLIO,
  ICE_BSD_UI_PORTOFOLIO,
  PT_AUROGEN_UI_PORTOFOLIO,
  PT_ZENTRUM_GRAPHICS_ASIA_UI_PORTOFOLIO,
];
