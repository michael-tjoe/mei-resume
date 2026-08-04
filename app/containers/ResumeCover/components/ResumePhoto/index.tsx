import type { CSSProperties } from 'react';

import { DesktopOnly } from '@/components/DesktopOnly';
import { MobileOnly } from '@/components/MobileOnly';
import bgResume from './assets/bg-resume.jpg';
import DesktopTitleBadge from '../DesktopTitleBadge';
import DesktopTopCoverSection from '../DesktopTopCoverSection';
import MobilePhotoBackground from '../MobilePhotoBackground';
import MobileTitleBadge from '../MobileTitleBadge';
import MobileDecorations from './MobileDecorations';
import ResumeHeroImages from './ResumeHeroImages';

interface ResumePhotoProps {
  greeting?: string;
  firstName: string;
  lastName: string;
}

function ResumePhoto({ greeting = "hi, i'm", firstName, lastName }: ResumePhotoProps) {
  const fullName = `${firstName} ${lastName}`;

  return (
    <>
      <DesktopTopCoverSection />

      <div className="relative max-h-141.25 desktop:mr-auto desktop:aspect-948/565 desktop:w-full desktop:shrink desktop:grow desktop:overflow-hidden desktop:rounded-[72px]">
        <div className="relative z-10 h-80 w-full rounded-b-[30px] desktop:h-full desktop:overflow-hidden">
          <div
            className="size-full bg-cover bg-center bg-no-repeat tablet:bg-(image:--bg-resume)"
            style={{ '--bg-resume': `url(${bgResume.src})` } as CSSProperties}
          >
            <ResumeHeroImages />
          </div>

          <MobileDecorations />

          <MobileOnly>
            <MobileTitleBadge
              greeting={greeting}
              firstName={firstName}
              lastName={lastName}
              fullName={fullName}
            />
          </MobileOnly>
        </div>
      </div>

      <MobileOnly>
        <MobilePhotoBackground />
      </MobileOnly>

      <DesktopOnly>
        <DesktopTitleBadge />
      </DesktopOnly>
    </>
  );
}

export default ResumePhoto;
