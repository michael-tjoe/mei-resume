import { cn } from '@/lib/cn'
import Flower from '@/components/Decorations/Flower'
import SectionTitle from '@/components/SectionTitle'
import aboutImage1 from './assets/ic-about-1.svg'
import aboutImage2 from './assets/ic-about-2.svg'
import aboutImage3 from './assets/ic-about-3.svg'
import aboutImage4 from './assets/ic-about-4.svg'
import aboutImage5 from './assets/ic-about-5.svg'
import icLang from './assets/ic-lang.svg'

const imgClass =
  'desktop:mr-8 mr-4 h-[56px] w-[56px] object-cover desktop:h-[98px] desktop:w-[98px]'
const bodyClass = 'text-brand-cream text-portofolio-body'

function AboutPoint({
  src,
  children,
  className,
}: {
  src: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center desktop:mr-0', className)}>
      <img src={src} alt="" className={imgClass} />
      <p className={bodyClass}>{children}</p>
    </div>
  )
}

interface AboutProps {
  title?: string
}

function About({ title = 'about' }: AboutProps) {
  return (
    <section className="group relative flex w-full shrink-0 flex-col rounded-b-[30px] bg-brand-dark px-6 pt-11 pb-10 transition-[width] duration-300 ease-out desktop:h-screen desktop:w-[534px] desktop:rounded-[67px] desktop:px-14 desktop:pt-[64px] desktop:hover:w-[1695px]">
      <SectionTitle
        text={title}
        invert
        className="transition-transform duration-300 ease-out desktop:translate-y-about-title-translate desktop:group-hover:translate-y-0"
      />

      <div className="relative desktop:min-h-[290px]">
        <Flower className="hidden desktop:top-[vh] desktop:left-[349px] desktop:block desktop:h-[107px] desktop:w-[100px] desktop:group-hover:translate-x-[1000px] desktop:group-hover:translate-y-[40vh] desktop:group-hover:scale-95" />
        <div className="absolute top-0 left-0 hidden transition-opacity duration-300 ease-in desktop:mb-12 desktop:block desktop:max-w-[534px] desktop:pt-about-title-translate desktop:opacity-100 desktop:group-hover:opacity-0">
          <p className={`${bodyClass} pt-8`}>
            I’m a graphic designer with five years of experience across related
            creative fields, with primary expertise in social media design.
            Highly motivated to explore and develop new ideas, while remaining
            adaptable and open to new challenges for continuous
            self-improvement.
          </p>
          <p className={`${bodyClass} mt-6 font-semibold`}>
            Experienced in managing multiple projects efficiently, with strong
            time management skills to ensure deadlines and quality are
            consistently met.
          </p>
        </div>

        <div className="flex flex-col flex-wrap overflow-hidden pt-5 transition-opacity duration-300 ease-in tablet:flex-row desktop:hidden desktop:gap-x-4 desktop:pt-8 desktop:opacity-0 desktop:group-hover:flex desktop:group-hover:flex-row desktop:group-hover:opacity-100">
          <AboutPoint
            src={aboutImage1}
            className="mb-6 tablet:mr-6 tablet:mb-6 tablet:w-[calc((100%-3rem)/3)] desktop:mb-8 desktop:w-[calc((100%-1rem)/2)]"
          >
            Stefanny is a graphic designer & illustrator.
          </AboutPoint>
          <AboutPoint
            src={aboutImage2}
            className="mb-6 tablet:mr-6 tablet:mb-6 tablet:w-[calc((100%-3rem)/3)] desktop:mb-8 desktop:w-[calc((100%-1rem)/2)]"
          >
            Has been designing for <b>five years</b>, across related creative
            fields.
          </AboutPoint>
          <AboutPoint
            src={aboutImage3}
            className="mb-6 tablet:mr-0 tablet:mb-6 tablet:w-[calc((100%-3rem)/3)] desktop:mb-8 desktop:w-[calc((100%-1rem)/2)]"
          >
            Her primary expertise is in <b>social media design.</b>
          </AboutPoint>
          <AboutPoint
            src={aboutImage4}
            className="mb-6 tablet:mr-6 tablet:mb-0 tablet:w-[calc((100%-3rem)/3)] desktop:mb-8 desktop:w-[calc((100%-1rem)/2)]"
          >
            Highly motivated to <b>explore and develop new ideas</b>, while
            remaining adaptable and <b>open to new challenges</b> for continuous
            self-improvement.
          </AboutPoint>

          <AboutPoint
            src={aboutImage5}
            className="mb-0 tablet:mr-6 tablet:mb-0 tablet:w-[calc((100%-3rem)/3)] desktop:mb-0 desktop:w-[calc((100%-1rem)/2)]"
          >
            <b>
              Experienced in managing multiple projects efficiently, with strong
              time management skills to ensure deadlines and quality are
              consistently met.
            </b>
          </AboutPoint>
        </div>
      </div>

      <div className="relative desktop:mt-22 desktop:group-hover:mt-12">
        <Flower
          variant="alt"
          className="right-0 bottom-4 left-[78.75%] h-[41px] w-[42px] tablet:hidden desktop:top-[calc(var(--spacing-about-title-translate)+0px)] desktop:left-[363px] desktop:block desktop:h-[88px] desktop:w-[94px] desktop:group-hover:translate-x-[365px] desktop:group-hover:-translate-y-[calc(var(--spacing-about-title-translate))] desktop:group-hover:scale-80"
        />
        <Flower
          variant="alt"
          className="hidden desktop:top-[30vh] desktop:left-[131px] desktop:block desktop:h-[66px] desktop:w-[62px] desktop:group-hover:translate-x-[249px] desktop:group-hover:-translate-y-[calc(var(--spacing-about-title-translate))]"
        />

        <SectionTitle
          text="languages"
          className="mb-4 pt-4 transition-[padding] duration-300 ease-out desktop:mb-8 desktop:pt-about-title-translate desktop:group-hover:pt-0"
          invert
        />
        <p
          className={`${bodyClass} absolute top-[calc(var(--spacing-about-title-translate)+82px)] left-0 hidden opacity-100 desktop:block desktop:group-hover:opacity-0`}
        >
          Bahasa Indonesia & English
        </p>

        <div className="relative flex items-center transition-opacity duration-300 ease-in desktop:hidden desktop:opacity-0 desktop:group-hover:flex desktop:group-hover:opacity-100">
          <img
            src={icLang}
            alt=""
            width={56}
            height={56}
            className={imgClass}
          />
          <div className="flex flex-col">
            <p className={`${bodyClass} mb-1 font-semibold desktop:mb-3`}>
              Bahasa Indonesia
            </p>
            <p className={`${bodyClass} font-semibold`}>English</p>
          </div>
        </div>
      </div>

      <Flower className="top-11 left-[78.75%] h-[43px] w-[44px] duration-300 ease-out tablet:top-[40%] tablet:left-[90%] desktop:top-[4vh] desktop:left-[110px] desktop:h-[108px] desktop:w-[115px] desktop:group-hover:translate-x-[400px] desktop:group-hover:-translate-y-[2vh] desktop:group-hover:scale-60" />
    </section>
  )
}

export default About
