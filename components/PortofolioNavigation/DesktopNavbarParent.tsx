'use client';

import { DesktopOnly } from '@/components/DesktopOnly';
import { useNavigation } from '@/providers/NavigationProvider';
import DesktopNavbar from './DesktopNavbar';

/** Client parent: owns overlap → invert so PortofolioNavigation can stay a server component. */
export default function DesktopNavbarParent() {
  const { perfectlyOverlapped } = useNavigation();

  return (
    <DesktopOnly>
      <DesktopNavbar
        invert={perfectlyOverlapped}
        text={perfectlyOverlapped ? 'portofolio' : undefined}
      />
    </DesktopOnly>
  );
}
