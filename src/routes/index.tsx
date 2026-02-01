import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import About from '@/components/About'
import MobileNavbar from '@/components/MobileNavbar'
import ResumePhoto from '@/components/ResumePhoto'
import SectionTitle from '@/components/SectionTitle'
import Timeline from '@/components/Timeline'
import Divider from '@/components/Divider'

gsap.registerPlugin(ScrollTrigger)

export const Route = createFileRoute('/')({ component: App })

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panelsEl = panelsRef.current
    const container = containerRef.current

    if (!panelsEl || !container) return

    const DESKTOP_BREAKPOINT = 840
    let tween: gsap.core.Tween | null = null

    const setupAnimation = () => {
      // Only apply horizontal scroll on desktop (840px+)
      if (window.innerWidth < DESKTOP_BREAKPOINT) {
        // Kill existing animation if viewport becomes mobile
        if (tween) {
          tween.kill()
          tween = null
        }
        ScrollTrigger.getAll().forEach((t) => t.kill())
        // Reset position
        gsap.set(panelsEl, { x: 0 })
        return
      }

      // Calculate total scroll width
      const scrollWidth = panelsEl.scrollWidth - window.innerWidth

      // Create the horizontal scroll animation
      tween = gsap.to(panelsEl, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1, // Smooth scrubbing effect
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      })
    }

    // Initial setup
    setupAnimation()

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      if (tween) {
        tween.kill()
        tween = null
      }
      setupAnimation()
    }

    window.addEventListener('resize', handleResize)

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
      if (tween) tween.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <main
      ref={containerRef}
      className="desktop:h-screen desktop:overflow-hidden"
    >
      <div
        ref={panelsRef}
        className="desktop:h-full desktop:flex-row relative flex flex-col"
      >
        <MobileNavbar />

        <section
          className={`desktop:pt-[56px] desktop:pl-[144px] desktop:w-auto relative z-(--zphoto-resume) flex w-full shrink-0 flex-col`}
        >
          <div className="desktop:aspect-516/727 desktop:pl-6 desktop:min-w-[1032px] desktop:pr-12 flex h-full flex-col">
            <Divider className="desktop:block hidden" color="brand-brown" />
            <ResumePhoto
              greeting="hi, i'm"
              firstName="Stefanny"
              lastName="kusuma"
            />
          </div>
        </section>
        <About />
        <section
          className={`desktop:h-screen desktop:w-fit px-side relative flex w-full flex-col pt-4`}
        >
          <SectionTitle text="experiences" />
          <div className="mt-4 pb-11">
            <Timeline />
          </div>
        </section>
      </div>
    </main>
  )
}
