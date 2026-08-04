import Image from 'next/image';
import desktopSignature from './assets/desktopSignature.png';

export default function DesktopSignature() {
  return (
    <div className="absolute bottom-0 left-0 z-20 hidden h-auto w-full items-end overflow-hidden rounded-r-[45px] bg-brand-cream pt-8 pr-8 desktop:flex">
      <Image
        src={desktopSignature}
        alt="Stefanny Kusuma"
        width={856}
        height={498}
        className="max-h-62.25"
        priority
      />
    </div>
  );
}
