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
      className={`cursor-pointer border-2 border-brand-dark bg-brand-cream transition-colors duration-300 ease-in-out hover:bg-brand-dark hover:[&_path]:fill-white active:bg-brand-dark active:[&_path]:fill-white [&_path]:transition-[fill] [&_path]:duration-300 [&_path]:ease-in-out flex h-[34px] w-[34px] shrink-0 grow-0 items-center justify-center overflow-hidden rounded-[5px] ${className}`.trim()}
      aria-hidden
    >
      {children}
    </div>
  )
}

export default SoftwareAppCard
