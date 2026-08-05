import type { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import aboutImage1 from '../../assets/ic-about-1.svg';
import aboutImage2 from '../../assets/ic-about-2.svg';
import aboutImage3 from '../../assets/ic-about-3.svg';
import aboutImage4 from '../../assets/ic-about-4.svg';
import aboutImage5 from '../../assets/ic-about-5.svg';

const IMG_CLASS =
  'desktop:mr-8 mr-4 h-[56px] w-[56px] object-cover desktop:h-[98px] desktop:w-[98px]';
const BODY_CLASS = cn('text-brand-cream', 'text-portofolio-body');

function AboutPoint({
  src,
  children,
  className,
}: {
  src: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center desktop:mr-0', className)}>
      <Image src={src} alt="" width={98} height={98} unoptimized className={IMG_CLASS} />
      <p className={BODY_CLASS}>{children}</p>
    </div>
  );
}

/** Hoisted static JSX (rendering-hoist-jsx). */
const aboutPoints = (
  <div className="flex flex-col flex-wrap overflow-hidden pt-5 transition-opacity duration-300 ease-in tablet:flex-row desktop:hidden desktop:gap-x-4 desktop:pt-8 desktop:opacity-0 desktop:group-hover:flex desktop:group-hover:flex-row desktop:group-hover:opacity-100">
    <AboutPoint
      src={aboutImage1}
      className="mb-6 tablet:mr-6 tablet:mb-6 tablet:w-[calc((100%-3rem)/3)] desktop:mb-8 desktop:w-[calc((100%-1rem)/2)]"
    >
      Stefanny is a graphic designer & illustrator.
    </AboutPoint>
    <AboutPoint
      src={aboutImage2}
      className="mb-6 tablet:mr-6 tablet:mb-6 tablet:w-[calc((100%-3rem)/3)] desktop:mb-8 desktop:w-[calc((100%-1rem)/2)]"
    >
      Has been designing for <b>five years</b>, across related creative fields.
    </AboutPoint>
    <AboutPoint
      src={aboutImage3}
      className="mb-6 tablet:mr-0 tablet:mb-6 tablet:w-[calc((100%-3rem)/3)] desktop:mb-8 desktop:w-[calc((100%-1rem)/2)]"
    >
      Her primary expertise is in <b>social media design.</b>
    </AboutPoint>
    <AboutPoint
      src={aboutImage4}
      className="mb-6 tablet:mr-6 tablet:mb-0 tablet:w-[calc((100%-3rem)/3)] desktop:mb-8 desktop:w-[calc((100%-1rem)/2)]"
    >
      Highly motivated to <b>explore and develop new ideas</b>, while remaining adaptable and{' '}
      <b>open to new challenges</b> for continuous self-improvement.
    </AboutPoint>
    <AboutPoint
      src={aboutImage5}
      className="mb-0 tablet:mr-6 tablet:mb-0 tablet:w-[calc((100%-3rem)/3)] desktop:mb-0 desktop:w-[calc((100%-1rem)/2)]"
    >
      <b>
        Experienced in managing multiple projects efficiently, with strong time management skills to
        ensure deadlines and quality are consistently met.
      </b>
    </AboutPoint>
  </div>
);

export default function AboutPoints() {
  return aboutPoints;
}
