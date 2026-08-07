import type { StaticImageData } from 'next/image';

export type FeaturedCompanyBlock = {
  name: string;
  subtitle: string;
  href: string;
  hrefType: 'ig' | 'website';
  mobileFeeds: StaticImageData[];
  desktopFeeds: StaticImageData[];
  collectionFrame: StaticImageData;
};

/** Notebook UI blocks: three desktop slots with per-image CSS aspect ratios. */
export type NotebookCompanyBlock = Omit<FeaturedCompanyBlock, 'collectionFrame'> & {
  desktopFeedAspectRatios: [string, string, string];
  collectionFrame?: StaticImageData;
  /** Raw `"{width}/{height}"` pixels from `collectionFrame.png` (do not reduce). */
  collectionFrameAspectRatio?: string;
};
