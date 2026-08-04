import Image from 'next/image';
import squarePhoto from './assets/resume_photo_sqaure.png';
import widePhoto from './assets/resume_photo_wide.png';

/** Square crop below tablet; wide crop from tablet up (desktop gated by MobileOnly). */
export default function MobileHeroImage() {
  return (
    <>
      <Image
        src={squarePhoto}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover tablet:hidden"
      />
      <Image
        src={widePhoto}
        alt=""
        fill
        sizes="100vw"
        className="hidden object-cover tablet:block"
      />
    </>
  );
}
