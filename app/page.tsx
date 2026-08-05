import About from '@/app/containers/About';
import ResumeCover from '@/app/containers/ResumeCover';
import Timeline from '@/app/containers/Timeline';
import HorizontalScroll from '@/components/HorizontalScroll';
import MobileNavbar from '@/components/MobileNavbar';
import Portofolio from './containers/Portofolio';

export default function Home() {
  return (
    <HorizontalScroll>
      <MobileNavbar />
      <ResumeCover />
      <About />
      <Timeline />
      <Portofolio />
    </HorizontalScroll>
  );
}
