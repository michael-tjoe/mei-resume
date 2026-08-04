import { DesktopOnly } from '@/components/DesktopOnly';
import Heart from './components/Heart';
import Keynote from './components/Keynote';
import Melody from './components/Melody';
import Tail from './components/Tail';

export default function DesktopDecorations() {
  return (
    <DesktopOnly>
      <Heart
        className="absolute top-[50%] left-[-10%] aspect-50/57 w-[8.18%]"
        sizeClassName="size-full"
      />
      <Tail
        className="absolute top-[23%] left-[4%] aspect-80/48 w-[16.99%]"
        sizeClassName="size-full"
      />
      <Keynote
        className="absolute top-5 left-[-5%] aspect-57/62 w-[12.13%]"
        sizeClassName="size-full"
      />
      <Melody
        className="absolute top-5 right-[7%] aspect-75/64 w-[15.96%]"
        sizeClassName="size-full"
      />
    </DesktopOnly>
  );
}
