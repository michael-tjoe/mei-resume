import NameSection from '@/components/NameSection';
import SoftwareApplist from '@/components/SoftwareApplist';
import TitleBadge from '@/components/TitleBadge';

interface MobileTitleBadgeProps {
  greeting?: string;
  firstName: string;
  lastName: string;
  fullName?: string;
}

export default function MobileTitleBadge({
  greeting,
  firstName,
  lastName,
  fullName = `${firstName} ${lastName}`,
}: MobileTitleBadgeProps) {
  return (
    <>
      <div className="absolute inset-0 px-6 pt-6 tablet:px-18 desktop:hidden">
        <NameSection
          greeting={greeting}
          firstName={firstName}
          lastName={lastName}
          fullName={fullName}
        />
        <TitleBadge />
      </div>
      <SoftwareApplist className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 tablet:bottom-5.5 tablet:left-18 tablet:translate-0 tablet:justify-start desktop:hidden" />
    </>
  );
}
