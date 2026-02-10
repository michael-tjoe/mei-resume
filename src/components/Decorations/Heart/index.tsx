import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

import icHeart from './assets/ic-heart.svg'

interface HeartProps {
  className?: string
}

function Heart({ className = '' }: HeartProps) {
  const heartRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!heartRef.current) return

    const tl = gsap.timeline({ repeat: -1 })

    // Cycle 1: scale up + rotate to final state
    tl.to(heartRef.current, {
      scale: 1.4,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
    })
    // Cycle 2: scale down + rotate back to initial state
    tl.to(heartRef.current, {
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className={className} aria-hidden="true">
      {/* Single animated heart - organic hand-drawn style from Figma */}

      <div
        className="flex h-6 w-5 desktop:h-[57px] desktop:w-[50px]"
        ref={heartRef}
      >
        <img
          className="block h-full w-full object-contain"
          src={icHeart}
          alt=""
        />
      </div>
    </div>
  )
}

export default Heart
