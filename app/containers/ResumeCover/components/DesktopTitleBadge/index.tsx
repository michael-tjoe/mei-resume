import TitleBadge from '@/components/TitleBadge';
import DesktopSignature from '../DesktopSignature';

export default function DesktopTitleBadge() {
  return (
    <div className="relative z-20 hidden h-37.5 w-full shrink-0 grow-0 items-end desktop:flex">
      <div className="aspect-428/249 w-1/2 shrink-0 relative">
        <DesktopSignature />
      </div>

      <div className="w-full pl-5">
        <TitleBadge className="h-17.5 max-h-none w-full max-w-full border-3" />
      </div>
    </div>
  );
}
