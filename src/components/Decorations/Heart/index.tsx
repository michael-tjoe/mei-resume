import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

interface HeartProps {
  className?: string
}

function Heart({ className = '' }: HeartProps) {
  const heartRef = useRef<SVGSVGElement>(null)

  useLayoutEffect(() => {
    if (!heartRef.current) return

    const tl = gsap.timeline({ repeat: -1, })

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
      <svg
        ref={heartRef}
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transformOrigin: 'top left' }}
      >
        <path
          d="M16.673 1.03309C17.7252 2.11342 18.8442 5.50425 19.1665 7.06167C20.015 11.1464 20.9153 18.7916 18.0476 22.0996C14.4907 26.2002 6.90641 22.8054 3.41253 19.9666C-3.57525 14.2968 1.08574 5.68957 9.17763 9.39188C9.34435 6.15482 12.6641 -3.06746 16.673 1.03309Z"
          className="fill-brand-dark"
        />
      </svg>
    </div>
  )
}

export default Heart
