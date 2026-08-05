import { DesktopOnly } from '@/components/DesktopOnly';
import Divider from '@/components/Divider';
import SectionTitle from '@/components/SectionTitle';
import TimelineList from './components/TimelineList';
import ViewWorksButton from './components/ViewWorksButton';

export default function Timeline() {
  return (
    <section
      id="experiences"
      className="relative flex w-full flex-col px-side pt-4 desktop:@container-size/timeline desktop:h-screen desktop:w-[3175px] desktop:shrink-0 desktop:px-24 desktop:pt-14 desktop:[@media(max-height:960px)]:pt-5"
    >
      <DesktopOnly>
        <Divider className="mb-5 shrink-0" color="brand-brown" variant="single-centered-circle" />
        <Divider
          className="mt-4 shrink-0 px-5"
          color="brand-brown"
          variant="three-centered-circles"
        />
      </DesktopOnly>

      <SectionTitle
        className="desktop:mx-auto desktop:mt-[calc(93/1920*100vh)] desktop:mb-[calc(140/1920*100vh)] desktop:timeline-h-1080:mt-[calc(93/1080*100vh)] desktop:timeline-h-1080:mb-[calc(140/1080*100vh)] desktop:[@media(max-height:960px)]:mt-[calc(93/2440*100vh)] desktop:[@media(max-height:960px)]:mb-[calc(140/2440*100vh)]"
        text="experiences"
      />

      <div className="desktop:my-auto">
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
    </section>
  );
}
