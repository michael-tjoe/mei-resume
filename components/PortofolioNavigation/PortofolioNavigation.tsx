import { DesktopOnly } from '@/components/DesktopOnly';
import { MobileOnly } from '@/components/MobileOnly';
import DesktopNavbar from './DesktopNavbar';
import MobileNavigation from './MobileNavigation';

/** Hoisted static JSX (rendering-hoist-jsx). */
const mobileNavbar = (
  <MobileOnly>
    <MobileNavigation />
  </MobileOnly>
);

const desktopNavbar = (
  <DesktopOnly>
    <DesktopNavbar />
  </DesktopOnly>
);

export default function PortofolioNavigation() {
  return (
    <>
      {mobileNavbar}
      {desktopNavbar}
    </>
  );
}
