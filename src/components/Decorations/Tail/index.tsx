import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

interface TailProps {
  className?: string
}

/**
 * Tail decoration from Figma (Portfolio → node 276-521).
 * Animated with GSAP using slow-in curve (ease-in) to match Figma.
 */
function Tail({ className = '' }: TailProps) {
  const tailRef = useRef<SVGSVGElement>(null)

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
      <svg
        ref={tailRef}
        width="27"
        height="17"
        viewBox="0 0 27 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transformOrigin: 'center center' }}
      >
        <path
          d="M12.8907 12.2294C17.3094 15.7905 22.0915 13.1909 26.8532 12.2365C27.9061 13.3298 22.9745 15.7193 22.2851 15.9864C17.9003 17.6743 12.7888 17.6209 10.177 12.9666C7.04894 13.8996 3.11934 13.9815 1.10529 10.8157C-0.188727 8.78228 -0.918947 4.19559 2.24647 3.87509C2.22609 4.48404 1.61814 4.04959 1.39398 4.87932C0.735086 7.31155 1.98155 10.8798 4.48128 11.4638C5.32019 11.6596 9.11054 11.916 9.10035 10.8192C9.09695 10.1996 8.61467 9.25235 8.60448 8.53657C8.57391 6.59221 9.77962 3.54391 11.0567 2.11947C15.6519 -3.00138 22.2137 2.0162 17.7203 8.05938C16.3312 9.92895 14.3545 10.5806 12.8907 12.2259V12.2294ZM16.7999 2.91004C14.1813 0.160871 10.031 7.57863 11.8956 10.1462C13.9877 9.84349 18.7834 4.99684 16.7999 2.91004Z"
          fill="#321000"
        />
      </svg>
    </div>
  )
}

export default Tail
