import SectionTitle from '@/components/SectionTitle';
import TimelineList from './components/TimelineList';

export default function Timeline() {
  return (
    <section className="relative flex w-full flex-col px-side pt-4 desktop:h-screen desktop:w-[3175px] desktop:shrink-0">
      <SectionTitle text="experiences" />
      <div className="mt-4 pb-11">
        <TimelineList />
      </div>
    </section>
  );
}
