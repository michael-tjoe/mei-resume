import Image from 'next/image';
import { cn } from '@/lib/cn';
import SectionTitle from '@/components/SectionTitle';
import icLang from '../../assets/ic-lang.svg';

const IMG_CLASS =
  'desktop:mr-8 mr-4 h-[56px] w-[56px] object-cover desktop:h-[98px] desktop:w-[98px]';
const BODY_CLASS = cn('text-brand-cream', 'text-portofolio-body');

/** Hoisted static JSX (rendering-hoist-jsx). */
const aboutLanguages = (
  <>
    <SectionTitle
      text="languages"
      className="mb-4 pt-4 transition-[padding] duration-300 ease-out desktop:mb-8 desktop:pt-about-title-translate desktop:group-hover:pt-0"
      invert
    />
    <p
      className={cn(
        BODY_CLASS,
        'absolute top-[calc(var(--spacing-about-title-translate)+82px)] left-0 hidden opacity-100 desktop:block desktop:group-hover:opacity-0',
      )}
    >
      Bahasa Indonesia & English
    </p>
    <div className="relative flex items-center transition-opacity duration-300 ease-in desktop:hidden desktop:opacity-0 desktop:group-hover:flex desktop:group-hover:opacity-100">
      <Image src={icLang} alt="" width={98} height={98} unoptimized className={IMG_CLASS} />
      <div className="flex flex-col">
        <p className={cn(BODY_CLASS, 'mb-1 font-semibold desktop:mb-3')}>Bahasa Indonesia</p>
        <p className={cn(BODY_CLASS, 'font-semibold')}>English</p>
      </div>
    </div>
  </>
);

export default function AboutLanguages() {
  return aboutLanguages;
}
