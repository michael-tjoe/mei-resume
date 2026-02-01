import cn from 'classnames'

interface NameSectionProps {
  greeting?: string
  firstName: string
  lastName: string
  fullName?: string
  className?: string
}

const defaultWrapperClass = '[container-type:inline-size]'

function NameSection({
  greeting = "hi, i'm",
  firstName,
  lastName,
  fullName = `${firstName} ${lastName}`,
  className = '',
}: NameSectionProps) {
  return (
    <div className={cn(defaultWrapperClass, className)}>
      <span className="font-sora text-brand-dark desktop:text-[40px] tablet:text-[26px] text-[24px] leading-[1.26] font-normal">
        {greeting}
      </span>

      <div className="tablet:h-[97px] tablet:w-[205px] desktop:h-[208px] desktop:w-[428px] relative h-[89px] w-[179px]">
        <p className="text-brand-dark text-portofolio-name absolute top-0 left-0">
          {firstName}
        </p>

        <p className="text-brand-dark text-portofolio-name desktop:top-[87px] absolute top-[39px] left-0 tracking-[0.05em]">
          {lastName}
        </p>

        <span className="font-script text-portofolio-nameshadow text-brand-tan absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 rotate-[-6.86deg] text-center font-bold lowercase">
          {fullName}
        </span>
      </div>
    </div>
  )
}

export default NameSection
