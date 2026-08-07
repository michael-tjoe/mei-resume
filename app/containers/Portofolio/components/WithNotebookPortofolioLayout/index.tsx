import Image from 'next/image';

import { cn } from '@/lib/cn';

import type { NotebookCompanyBlock } from '../../types';
import PortofolioTypeItem from '../PortofolioTypeItem';

type WithNotebookPortofolioLayoutProps = NotebookCompanyBlock & {
  className?: string;
};

const DEFAULT_ASPECT_RATIO = '1965/1080';
const DEFAULT_COLLECTION_FRAME_POSITION = { right: 0, bottom: 0 } as const;

function WithNotebookPortofolioLayout({
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
}: WithNotebookPortofolioLayoutProps) {
  const [firstFeed, ...restFeeds] = desktopFeeds.slice(0, 3);
  const [firstAspectRatio, ...restAspectRatios] = desktopFeedAspectRatios;
  const frameRight = collectionFramePosition?.right ?? DEFAULT_COLLECTION_FRAME_POSITION.right;
  const frameBottom = collectionFramePosition?.bottom ?? DEFAULT_COLLECTION_FRAME_POSITION.bottom;

  return (
    <div
      className={cn(
        'relative flex h-full max-w-full shrink-0 flex-row items-center gap-6 overflow-hidden',
        className,
      )}
      style={{ aspectRatio }}
    >
      <div className="relative flex h-full shrink-0 grow-0 flex-col overflow-hidden">
        <PortofolioTypeItem
          className="pt-[calc(92/1920*100vh)] pb-[calc(94/1080*100vh)] shrink-0 grow-0"
          name={name}
          subtitle={subtitle}
          href={href}
          hrefType={hrefType}
        />

        <div
          className="relative max-w-full h-full mt-auto shrink-0 grow overflow-hidden"
          style={{ aspectRatio: firstAspectRatio }}
        >
          <Image
            src={firstFeed}
            alt={`${name} UI design 1`}
            fill
            className="h-full max-w-full object-cover object-center"
            unoptimized
          />
        </div>
      </div>

      {restFeeds.map((feed, index) => {
        const isLast = index === restFeeds.length - 1;

        return (
          <div
            key={index}
            className={cn(
              'relative h-full overflow-hidden',
              isLast ? 'shrink grow' : 'shrink-0 grow-0',
            )}
            style={{ aspectRatio: restAspectRatios[index] }}
          >
            <Image
              src={feed}
              alt={`${name} UI design ${index + 2}`}
              fill
              className="h-full max-w-full object-cover object-top-left"
              unoptimized
            />
          </div>
        );
      })}

      {collectionFrame && collectionFrameAspectRatio ? (
        <div
          className="z-20 pointer-events-none absolute h-full"
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
            className="object-contain object-center-right"
            unoptimized
          />
        </div>
      ) : null}
    </div>
  );
}

export default WithNotebookPortofolioLayout;
