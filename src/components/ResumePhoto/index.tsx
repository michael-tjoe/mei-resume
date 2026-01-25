import squarePhoto from './assets/resume_photo_sqaure.png'
import widePhoto from './assets/resume_photo_wide.png'
import Heart from '../Decorations/Heart'
import Keynote from '../Decorations/Keynote'
import Tail from '../Decorations/Tail'
import Melody from '../Decorations/Melody'
import SoftwareApplist from '../SoftwareApplist'

interface ResumePhotoProps {
  greeting?: string
  firstName: string
  lastName: string
  className?: string
}

function ResumePhoto({
  greeting = "hi, i'm",
  firstName,
  lastName,
  className = '',
}: ResumePhotoProps) {
  const fullName = `${firstName} ${lastName}`

  return (
    <>
      <style>{`
        .resume-photo-bg {
         background-image: url('${widePhoto}');
          background-size: cover;
          background-position: center;
        }
        @media (max-width: 599px) {
          .resume-photo-bg {
            background-image: url('${squarePhoto}');
           
          }
        }
      `}</style>
      <div
        className={`resume-photo-bg relative h-[320px] w-full rounded-b-[30px] ${className} z-10`}
        role="img"
        aria-label={`${firstName} ${lastName} profile photo`}
      >
        {/* Content overlay */}
        <div className="tablet:px-[72px] absolute inset-0 px-6 pt-6">
          <Heart className="left-side tablet:top-[50%] tablet:left-[50.9%] absolute top-[75%]" />
          <Keynote className="tablet:top-[30%] tablet:left-[54.35%] absolute top-[50%] left-[47.8125%]" />
          <Tail className="tablet:top-[40px] tablet:left-[58.34%] top-side absolute left-[50.9%]" />
          <Melody className="tablet:top-[42px] tablet:right-[3%] tablet-lg:right-[12%] right-side absolute top-[30px]" />

          {/* Name section */}
          <div className="relative">
            {/* Greeting */}
            <span className="font-sora text-brand-dark tablet:text-[26px] text-[24px] leading-[1.26] font-normal">
              {greeting}
            </span>

            <div className="tablet:h-[97px] tablet:w-[205px] relative h-[89px] w-[179px]">
              {/* First name */}
              <p className="font-sora text-brand-dark tablet:text-[46px] absolute top-0 left-0 text-[40px] leading-[1.26] font-bold">
                {firstName}
              </p>

              {/* Last name */}
              <p className="font-sora text-brand-dark tablet:text-[46px] absolute top-[39px] left-0 text-[40px] leading-[1.26] font-bold tracking-[0.05em]">
                {lastName}
              </p>

              {/* Script name overlay */}
              <span
                className="font-script text-brand-tan absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 rotate-[-6.86deg] text-center text-[24px] leading-[1.27] lowercase"
                style={{
                  WebkitTextStroke: '0.5px #C9B08D',
                }}
              >
                {fullName}
              </span>
            </div>
          </div>

          {/* Title badge */}
          <div className="border-brand-dark mt-2 flex max-h-[46px] w-fit max-w-[81px] items-center justify-center overflow-hidden rounded-[10px] border px-3 py-2 min-[400px]:max-w-none">
            <p className="font-sora text-brand-dark text-center text-[12px] leading-[1.26] font-bold min-[400px]:whitespace-nowrap">
              graphic designer
            </p>
          </div>
        </div>

        <SoftwareApplist />
      </div>
      <div className="bg-brand-cream tablet:bg-brand-dark desktop:hidden absolute bottom-0 left-0 h-[178px] w-full translate-y-[28px] rounded-[30px]" />
    </>
  )
}

export default ResumePhoto
