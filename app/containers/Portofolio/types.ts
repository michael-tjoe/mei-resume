import type { StaticImageData } from 'next/image';

export type FeaturedCompanyBlock = {
  name: string;
  subtitle: string;
  href: string;
  hrefType: 'ig' | 'website' | '';
  mobileFeeds: StaticImageData[];
  desktopFeeds: StaticImageData[];
  collectionFrame: StaticImageData;
};

/** Notebook UI blocks: three desktop slots with per-image CSS aspect ratios. */
export type NotebookCompanyBlock = Omit<FeaturedCompanyBlock, 'collectionFrame'> & {
  desktopFeedAspectRatios: [string, string, string];
  /** Parent layout aspect ratio. Defaults to `"1965/1080"`. */
  aspectRatio?: string;
  collectionFrame?: StaticImageData;
  /** Raw `"{width}/{height}"` pixels from `collectionFrame.png` (do not reduce). */
  collectionFrameAspectRatio?: string;
  /** Absolute offset for `collectionFrame`. Defaults to `{ right: 0, bottom: 0 }`. */
  collectionFramePosition?: {
    right?: number | string;
    bottom?: number | string;
  };
};
