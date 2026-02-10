import cn from 'classnames'
import gameSvg from './assets/game.svg'
import micSvg from './assets/mic.svg'
import paintSvg from './assets/paint.svg'

interface ChalksProps {
  className?: string
}

/**
 * Chalks decoration from Figma (Portfolio → Frame 30, node 726-469).
 * Three stacked chalk-style icons: game (top), mic (middle), paint (bottom).
 * Frame: 151.82×574px. Icons positioned per Figma layout.
 */
function Chalks({ className }: ChalksProps) {
  return (
    <div
      className={cn(
        'flex h-full mx-auto flex-col items-center justify-evenly',
        className,
      )}
      aria-hidden="true"
    >
      <img
        className="block h-[87px] w-[125px] object-contain object-top-left"
        src={gameSvg}
        alt=""
      />

      <img
        className="block h-[125px] w-[109px] object-contain"
        src={micSvg}
        alt=""
      />

      <img
        className="block h-[113px] w-[116px] object-contain"
        src={paintSvg}
        alt=""
      />
    </div>
  )
}

export default Chalks
