import { DesktopOnly } from '@/components/DesktopOnly';
import { cn } from '@/lib/cn';
import Flower from '../Flower';

const BODY_CLASS = cn('text-brand-cream', 'text-portofolio-body');

/** Hoisted static JSX (rendering-hoist-jsx). DesktopOnly owns the viewport gate. */
const flowerNearTitle = (
  <Flower className="top-0 left-87.25 aspect-107/100 w-[calc(107/534*100%)] group-hover:aspect-104/97 group-hover:w-[calc(104/1695*100%)] group-hover:translate-x-250 group-hover:translate-y-[40vh]" />
);

const desktopSummaryCopy = (
  <div className="absolute top-0 left-0 mb-12 max-w-133.5 pt-about-title-translate transition-opacity duration-300 ease-in group-hover:opacity-0">
    <p className={cn(BODY_CLASS, 'pt-8')}>
      I’m a graphic designer with five years of experience across related creative fields, with
      primary expertise in social media design. Highly motivated to explore and develop new ideas,
      while remaining adaptable and open to new challenges for continuous self-improvement.
    </p>
    <p className={cn(BODY_CLASS, 'mt-6 font-semibold')}>
      Experienced in managing multiple projects efficiently, with strong time management skills to
      ensure deadlines and quality are consistently met.
    </p>
  </div>
);

const desktopSummary = (
  <>
    {flowerNearTitle}
    {desktopSummaryCopy}
  </>
);

export default function DesktopSummaryPreview() {
  return <DesktopOnly>{desktopSummary}</DesktopOnly>;
}
