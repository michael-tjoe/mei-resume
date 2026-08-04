import { DesktopOnly } from '@/components/DesktopOnly';
import { MobileOnly } from '@/components/MobileOnly';
import DesktopHeroImage from '../DesktopHeroImage';
import MobileHeroImage from '../MobileHeroImage';
import Chalks from './components/Chalks';

/**
 * Server Component: hero images stay RSC and are passed as children into
 * small client gates that read `useViewport` (SSR via ViewportProvider).
 */
export default function ResumeHeroImages() {
  return (
    <>
      <DesktopOnly>
        <Chalks />
        <DesktopHeroImage />
      </DesktopOnly>
      <MobileOnly>
        <MobileHeroImage />
      </MobileOnly>
    </>
  );
}
