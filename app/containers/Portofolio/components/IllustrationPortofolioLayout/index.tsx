import Image from 'next/image';

import { cn } from '@/lib/cn';

import type { NotebookCompanyBlock } from '../../types';
import PortofolioTypeItem from '../PortofolioTypeItem';

type IllustrationPortofolioLayoutProps = NotebookCompanyBlock & {
  className?: string;
};

const DEFAULT_ASPECT_RATIO = '1965/1080';
const DEFAULT_COLLECTION_FRAME_POSITION = { right: 0, bottom: 0 } as const;

function IllustrationPortofolioLayout({
  name,
  subtitle,
  href,
  hrefType,
  desktopFeeds,
  desktopFeedAspectRatios,
  aspectRatio = DEFAULT_ASPECT_RATIO,
  collectionFrame,
  collectionFrameAspectRatio,
  collectionFramePosition,
  className,
}: IllustrationPortofolioLayoutProps) {
  const [firstFeed, ...restFeeds] = desktopFeeds.slice(0, 3);
  const [firstAspectRatio, ...restAspectRatios] = desktopFeedAspectRatios;
  const frameRight = collectionFramePosition?.right ?? DEFAULT_COLLECTION_FRAME_POSITION.right;
  const frameBottom = collectionFramePosition?.bottom ?? DEFAULT_COLLECTION_FRAME_POSITION.bottom;

  return (
    <div
      className={cn(
        'relative flex h-full max-w-full shrink-0 grow-0 flex-row items-center overflow-hidden',
        className,
      )}
      style={{ aspectRatio }}
    >
      <div className="relative flex h-full shrink-0 grow-0 flex-col overflow-hidden">
        <PortofolioTypeItem
          className="shrink-0 grow-0 pt-[calc(134/1920*100vh)] pb-[calc(32/1080*100vh)]"
          name={name}
          subtitle={subtitle}
          href={href}
          hrefType={hrefType}
        />

        <div
          className="relative mt-auto h-full max-w-full shrink-0 grow overflow-hidden"
          style={{ aspectRatio: firstAspectRatio }}
        >
          <Image
            src={firstFeed}
            alt={`${name} illustration 1`}
            fill
            className="h-full max-w-full object-cover object-center"
            unoptimized
          />
        </div>
      </div>

      {restFeeds.map((feed, index) => {
        return (
          <div
            key={index}
            className={cn('relative h-full shrink-0 grow-0 overflow-hidden')}
            style={{ aspectRatio: restAspectRatios[index] }}
          >
            <Image
              src={feed}
              alt={`${name} illustration ${index + 2}`}
              fill
              className="h-full max-w-full object-cover object-top-left"
              unoptimized
            />
          </div>
        );
      })}

      {collectionFrame && collectionFrameAspectRatio ? (
        <div
          className="pointer-events-none absolute z-20 h-full"
          style={{
            aspectRatio: collectionFrameAspectRatio,
            right: frameRight,
            bottom: frameBottom,
          }}
        >
          <Image
            src={collectionFrame}
            alt={`${name} collection frame`}
            fill
            className="object-center-right object-contain"
            unoptimized
          />
        </div>
      ) : null}
    </div>
  );
}

export default IllustrationPortofolioLayout;
