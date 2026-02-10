import { useRef, useLayoutEffect } from 'react'
import tail from './assets/tail.svg'
import gsap from 'gsap'

interface TailProps {
  className?: string
}

/**
 * Tail decoration from Figma (Portfolio → node 276-521).
 * Animated with GSAP using slow-in curve (ease-in) to match Figma.
 */
function Tail({ className = '' }: TailProps) {
  const tailRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!tailRef.current) return

    const tl = gsap.timeline({ repeat: -1 })
    const duration = 0.6 // 1200ms total for full cycle (0.6s each way)

    // 0 → -30° with Figma "slow in" (ease-in: slow start, faster end)
    tl.to(tailRef.current, {
      rotation: -30,
      duration,
      delay: 0.2,
      ease: 'slow(0.9,1,false)',
      transformOrigin: 'center right',
    })
    // -30° → 0 with slow in on the return
    tl.to(tailRef.current, {
      rotation: 0,
      duration,
      delay: 0.2,
      ease: 'slow(0.9,1,false)',
      transformOrigin: 'center right',
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className={className} aria-hidden="true">
      <div className="w-[27px] h-[17px] desktop:h-[47px] desktop:w-[80px]" ref={tailRef}>
        <img src={tail} alt="" />
      </div>
    </div>
  )
}

export default Tail
