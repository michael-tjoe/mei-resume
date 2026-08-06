import { MobileOnly } from '@/components/MobileOnly';
import DesktopNavbarParent from './DesktopNavbarParent';
import MobileNavigation from './MobileNavigation';

/** Hoisted static JSX (rendering-hoist-jsx). */
const mobileNavbar = (
  <MobileOnly>
    <MobileNavigation />
  </MobileOnly>
);

export default function PortofolioNavigation() {
  return (
    <>
      {mobileNavbar}
      <DesktopNavbarParent />
    </>
  );
}
