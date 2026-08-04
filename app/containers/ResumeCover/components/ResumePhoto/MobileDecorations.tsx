import { MobileOnly } from '@/components/MobileOnly';
import Heart from './components/Heart';
import Keynote from './components/Keynote';
import Melody from './components/Melody';
import Tail from './components/Tail';

export default function MobileDecorations() {
  return (
    <MobileOnly>
      <Heart className="absolute top-[75%] left-side tablet:top-[50%] tablet:left-[50.9%]" />
      <Keynote className="absolute top-[50%] left-[47.8125%] tablet:top-[30%] tablet:left-[54.35%]" />
      <Tail className="absolute top-side left-[50.9%] tablet:top-10 tablet:left-[58.34%]" />
      <Melody className="absolute top-2.5 right-side tablet:top-10.5 tablet:right-[3%] tablet-lg:right-[12%]" />
    </MobileOnly>
  );
}
