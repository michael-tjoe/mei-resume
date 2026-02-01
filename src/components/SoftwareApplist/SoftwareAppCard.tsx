/**
 * Card matching Figma node 428-80 (Group 689).
 * 34×34px, 5px corner radius.
 */
function SoftwareAppCard({
  children,
  className = '',
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`border-brand-dark bg-brand-cream hover:bg-brand-dark active:bg-brand-dark desktop:h-[78px] desktop:w-[78px] mr-[6px] flex h-[34px] w-[34px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[5px] border-2 transition-colors duration-300 ease-in-out last:mr-0 [&_path]:transition-[fill] [&_path]:duration-300 [&_path]:ease-in-out hover:[&_path]:fill-white active:[&_path]:fill-white ${className}`.trim()}
      aria-hidden
    >
      {children}
    </div>
  )
}

export default SoftwareAppCard
