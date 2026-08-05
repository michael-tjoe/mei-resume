import { DesktopOnly } from '@/components/DesktopOnly';
import Divider from '@/components/Divider';
import MobileBackgroundLayer from '@/components/MobileBackgroundLayer';
import { MobileOnly } from '@/components/MobileOnly';
import SectionTitle from '@/components/SectionTitle';
import TimelineList from './components/TimelineList';
import ViewWorksButton from './components/ViewWorksButton';

/** Hoisted static JSX (rendering-hoist-jsx). */
const mobileTitle = (
  <MobileOnly>
    <SectionTitle
      id="experiences"
      className="scroll-mt-[calc(var(--spacing)*12.25+16px)] px-side"
      text="experiences"
    />
  </MobileOnly>
);

const desktopTitle = (
  <DesktopOnly>
    <SectionTitle
      id="experiences"
      className="mx-auto mt-[calc(93/1920*100vh)] mb-[calc(140/1920*100vh)] scroll-mt-12.25 desktop:scroll-mt-0 timeline-h-1080:mt-[calc(93/1080*100vh)] timeline-h-1080:mb-[calc(140/1080*100vh)] [@media(max-height:960px)]:mt-[calc(93/2440*100vh)] [@media(max-height:960px)]:mb-[calc(140/2440*100vh)]"
      text="experiences"
    />
  </DesktopOnly>
);

export default function Timeline() {
  return (
    <section className="relative flex w-full flex-col pt-4 desktop:@container-size/timeline desktop:h-screen desktop:w-[3175px] desktop:shrink-0 desktop:px-24 desktop:pt-14 desktop:[@media(max-height:960px)]:pt-5">
      <DesktopOnly>
        <Divider className="mb-5 shrink-0" color="brand-brown" variant="single-centered-circle" />
        <Divider
          className="mt-4 shrink-0 px-5"
          color="brand-brown"
          variant="three-centered-circles"
        />
      </DesktopOnly>

      {mobileTitle}
      {desktopTitle}

      <div className="z-20 bg-brand-cream px-side desktop:my-auto">
        <div className="mt-4 pb-11 desktop:pb-0">
          <TimelineList />
        </div>
      </div>
      <DesktopOnly>
        <ViewWorksButton />
      </DesktopOnly>
      <DesktopOnly>
        <div className="mt-auto">
          <Divider
            className="mb-5 shrink-0 px-5"
            color="brand-brown"
            variant="three-centered-circles"
          />
          <Divider
            className="mb-14 shrink-0 [@media(max-height:960px)]:mb-5"
            color="brand-brown"
            variant="single-centered-circle"
          />
        </div>
      </DesktopOnly>

      <MobileOnly>
        <MobileBackgroundLayer className="absolute -bottom-3.75 left-0 z-30 h-7.5 w-full translate-y-0 rounded-b-[30px] bg-brand-cream tablet:bg-brand-cream" />
      </MobileOnly>
      <MobileOnly>
        <MobileBackgroundLayer className="absolute -bottom-20 left-0 z-10 translate-y-0 bg-brand-dark tablet:bg-brand-dark scroll-mt-[calc(var(--spacing)*12.25-80px)]" />
      </MobileOnly>
    </section>
  );
}
