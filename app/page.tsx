import About from '@/app/containers/About';
import ResumeCover from '@/app/containers/ResumeCover';
import Timeline from '@/app/containers/Timeline';
import HorizontalScroll from '@/components/HorizontalScroll';
import PortofolioNavigation from '@/components/PortofolioNavigation';
import Portofolio from './containers/Portofolio';

export default function Home() {
  return (
    <HorizontalScroll>
      <PortofolioNavigation />
      <ResumeCover />
      <About />
      <Timeline />
      <Portofolio />
    </HorizontalScroll>
  );
}
