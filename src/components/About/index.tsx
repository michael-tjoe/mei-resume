import Flower from '../Decorations/Flower'
import SectionTitle from '../SectionTitle'
import aboutImage1 from './assets/ic-about-1.svg'
import aboutImage2 from './assets/ic-about-2.svg'
import aboutImage3 from './assets/ic-about-3.svg'
import aboutImage4 from './assets/ic-about-4.svg'
import aboutImage5 from './assets/ic-about-5.svg'
import icLang from './assets/ic-lang.svg'

const imgClass = 'mr-4 h-[56px] w-[56px] object-cover'
const bodyClass = 'text-brand-cream  leading-normal  text-portofolio-body'

const aboutPointLayoutClass =
  'mb-6 last:mb-0 tablet:mr-6 tablet:w-[calc((100%-3rem)/3)] tablet:[&:nth-child(3n)]:mr-0 tablet:[&:nth-child(n+4)]:mb-0'

function AboutPoint({
  src,
  children,
}: {
  src: string
  children: React.ReactNode
}) {
  return (
    <div className={`flex items-center ${aboutPointLayoutClass} `}>
      <img src={src} alt="" width={56} height={56} className={imgClass} />
      <p className={bodyClass}>{children}</p>
    </div>
  )
}

interface AboutProps {
  title?: string
}

function About({ title = 'about' }: AboutProps) {
  return (
    <section
      className={`desktop:w-screen desktop:h-screen bg-brand-dark px-side relative flex w-full shrink-0 flex-col rounded-b-[30px] pt-11 pb-10`}
    >
      <SectionTitle text={title} invert />
      <Flower className="tablet:top-[40%] tablet:left-[90%] top-11 left-[78.75%]" />
      <div className="tablet:flex-row flex flex-col flex-wrap pt-5">
        <AboutPoint src={aboutImage1}>
          Stefanny is a graphic designer & illustrator.
        </AboutPoint>
        <AboutPoint src={aboutImage2}>
          Has been designing for <b>five years</b>, across related creative
          fields.
        </AboutPoint>
        <AboutPoint src={aboutImage3}>
          Her primary expertise is in <b>social media design.</b>
        </AboutPoint>
        <AboutPoint src={aboutImage4}>
          Highly motivated to <b>explore and develop new ideas</b>, while
          remaining adaptable and <b>open to new challenges</b> for continuous
          self-improvement.
        </AboutPoint>
        <AboutPoint src={aboutImage5}>
          <b>
            Experienced in managing multiple projects efficiently, with strong
            time management skills to ensure deadlines and quality are
            consistently met.
          </b>
        </AboutPoint>
      </div>
      <SectionTitle text="languages" className="mb-4 pt-4" invert />
      <div className="flex items-center">
        <img src={icLang} alt="" width={56} height={56} className={imgClass} />
        <div className="flex flex-col">
          <p className={`${bodyClass} mb-1 font-semibold`}>Bahasa Indonesia</p>
          <p className={`${bodyClass} font-semibold`}>English</p>
        </div>
      </div>
      <Flower
        variant="alt"
        className="tablet:hidden absolute right-0 bottom-4 left-[78.75%]"
      />
    </section>
  )
}

export default About
