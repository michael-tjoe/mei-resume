import Divider from '@/components/Divider';
import SoftwareApplist from '@/components/SoftwareApplist';

export default function DesktopTopCoverSection() {
  return (
    <div className="relative hidden w-full shrink-0 flex-row items-center justify-end gap-6 pt-15 pb-8 desktop:flex">
      <div className="shrink-0 grow basis-1/2 pl-7">
        <Divider color="brand-brown" variant="circles" />
      </div>

      <div className="grow-0">
        <SoftwareApplist />
      </div>
    </div>
  );
}
