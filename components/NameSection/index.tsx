import { cn } from "@/lib/cn";

interface NameSectionProps {
  greeting?: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  className?: string;
}

const defaultWrapperClass = "@container";

function NameSection({
  greeting = "hi, i'm",
  firstName,
  lastName,
  fullName = `${firstName} ${lastName}`,
  className = "",
}: NameSectionProps) {
  return (
    <div className={cn(defaultWrapperClass, className)}>
      <span className="font-sora text-[24px] leading-[1.26] font-normal text-brand-dark tablet:text-[26px] desktop:text-[40px]">
        {greeting}
      </span>

      <div className="relative h-22.25 w-44.75 tablet:h-24.25 tablet:w-51.25 desktop:h-52 desktop:w-107">
        <p className="text-portofolio-name absolute top-0 left-0 text-brand-dark">
          {firstName}
        </p>

        <p className="text-portofolio-name absolute top-9.75 left-0 tracking-wider text-brand-dark desktop:top-21.75">
          {lastName}
        </p>

        <span className="font-script text-portofolio-nameshadow absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 rotate-[-6.86deg] text-center font-bold text-brand-tan lowercase">
          {fullName}
        </span>
      </div>
    </div>
  );
}

export default NameSection;
