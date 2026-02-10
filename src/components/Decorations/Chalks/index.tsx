import cn from 'classnames'
import Game from './Game'
import Mic from './Mic'
import Paint from './Paint'

interface ChalksProps {
  className?: string
}

/**
 * Chalks decoration from Figma (Portfolio → Frame 30, node 726-469).
 * Three stacked chalk-style icons: game (top), mic (middle), paint (bottom).
 * Frame: 151.82×574px. Icons positioned per Figma layout.
 * All icons morph on hover via GSAP MorphSVG.
 */
function Chalks({ className }: ChalksProps) {
  return (
    <div
      className={cn(
        'mx-auto flex h-full flex-col items-center justify-evenly',
        className,
      )}
      aria-hidden="true"
    >
      <Game />
      <Mic />
      <Paint />
    </div>
  )
}

export default Chalks
