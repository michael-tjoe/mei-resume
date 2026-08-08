import type { StaticImageData } from 'next/image';

import illClientProject1 from '../assets/illusClientProjects/desktop/ill-client-project-1.png';
import illClientProject2 from '../assets/illusClientProjects/desktop/ill-client-project-2.png';
import illClientProject3 from '../assets/illusClientProjects/desktop/ill-client-project-3.png';
import ill1 from '../assets/illusUniversityProjects/desktop/ill-1.png';
import ill2 from '../assets/illusUniversityProjects/desktop/ill-2.png';
import ill3 from '../assets/illusUniversityProjects/desktop/ill-3.png';
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

const UNIVERSITY_PROJECTS_ILLUSTRATION_FEEDS: StaticImageData[] = [ill1, ill2, ill3];

export const UNIVERSITY_PROJECTS_ILLUSTRATIONS: NotebookCompanyBlock = {
  name: 'University Projects',
  subtitle: 'illustration',
  href: '',
  hrefType: '',
  mobileFeeds: [],
  desktopFeeds: UNIVERSITY_PROJECTS_ILLUSTRATION_FEEDS,
  desktopFeedAspectRatios: ['1380/1738', '1310/2160', '1252/2156'],
  aspectRatio: '2188/1080',
  className: 'pl-0 [&>div:first-of-type>div:first-of-type]:pl-[calc(72/1080*100vh)]',
};

export const ILLUSTRATIONS_PORTOFOLIO: NotebookCompanyBlock[] = [
  CLIENT_PROJECTS_ILLUSTRATIONS,
  UNIVERSITY_PROJECTS_ILLUSTRATIONS,
];
