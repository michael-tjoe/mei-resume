import SectionTitle from '@/components/SectionTitle';
import { MobileOnly } from '@/components/MobileOnly';
import AboutLanguages from './components/AboutLanguages';
import AboutSummary from './components/AboutSummary';
import AboutTopDecorations from './components/AboutTopDecorations';
import DesktopBottomDecorations from './components/DesktopBottomDecorations';
import Flower from './components/Flower';

/** Hoisted static JSX (rendering-hoist-jsx). */
const flowerLanguagesNear = (
  <MobileOnly>
    <Flower variant="alt" className="right-0 bottom-4 left-[78.75%] h-10.25 w-10.5 tablet:hidden" />
  </MobileOnly>
);

interface AboutProps {
  title?: string;
}

function About({ title = 'about' }: AboutProps) {
  return (
    <section className="group relative flex w-full shrink-0 flex-col rounded-b-[30px] bg-brand-dark px-6 pt-11 pb-10 transition-[width] duration-300 ease-out desktop:h-screen desktop:w-133.5 desktop:rounded-[67px] desktop:px-14 desktop:pt-16 desktop:hover:w-[1695px]">
      <SectionTitle
        text={title}
        invert
        className="transition-transform duration-300 ease-out desktop:translate-y-about-title-translate desktop:group-hover:translate-y-0"
      />
      <AboutTopDecorations />
      <AboutSummary />

      <div className="relative desktop:mt-22 desktop:group-hover:mt-12">
        {flowerLanguagesNear}
        <DesktopBottomDecorations />
        <AboutLanguages />
      </div>
    </section>
  );
}

export default About;
