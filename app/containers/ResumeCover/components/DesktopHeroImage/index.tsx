import Image from 'next/image';
import meiPng from './assets/mei-cutout.png';
import DesktopDecorations from '../ResumePhoto/DesktopDecorations';

export default function DesktopHeroImage() {
  return (
    <div className="pointer-events-none relative size-full">
      {/* Sized to the cutout so decoration % / top / left are relative to the image. */}
      <div className="absolute right-0 bottom-0 h-[calc(100%-30px)]">
        <div className="relative h-full">
          <Image
            src={meiPng}
            alt=""
            width={470}
            height={570}
            className="block h-full w-auto max-w-none"
          />
          <DesktopDecorations />
        </div>
      </div>
    </div>
  );
}
