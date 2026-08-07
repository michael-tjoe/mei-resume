import type { StaticImageData } from 'next/image';

import illClientProject1 from '../assets/illusClientProjects/desktop/ill-client-project-1.png';
import illClientProject2 from '../assets/illusClientProjects/desktop/ill-client-project-2.png';
import illClientProject3 from '../assets/illusClientProjects/desktop/ill-client-project-3.png';
import type { NotebookCompanyBlock } from '../types';

const CLIENT_PROJECTS_ILLUSTRATION_FEEDS: StaticImageData[] = [
  illClientProject1,
  illClientProject2,
  illClientProject3,
];

export const CLIENT_PROJECTS_ILLUSTRATIONS: NotebookCompanyBlock = {
  name: 'Client Projects',
  subtitle: 'illustration',
  href: '',
  hrefType: '',
  mobileFeeds: [],
  desktopFeeds: CLIENT_PROJECTS_ILLUSTRATION_FEEDS,
  desktopFeedAspectRatios: ['1340/1682', '1080/2160', '1524/2154'],
  aspectRatio: '2213/1080',
};

export const ILLUSTRATIONS_PORTOFOLIO: NotebookCompanyBlock[] = [
  CLIENT_PROJECTS_ILLUSTRATIONS,
];
