import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MobileNavbar from '@/components/MobileNavbar'
import ResumePhoto from '@/components/ResumePhoto'
import SoftwareApplist from '@/components/SoftwareApplist'

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
        className="desktop:h-full desktop:flex-row flex flex-col"
      >
        <MobileNavbar />

        <section className={`relative desktop:h-screen flex w-full shrink-0 flex-col`}>
          <ResumePhoto
            greeting="hi, i'm"
            firstName="Stefanny"
            lastName="kusuma"
          />
        </section>
        <section
          className={`desktop:w-screen flex h-screen w-full shrink-0 flex-col justify-center bg-brand-dark`}
        >
          <div className="max-w-2xl px-8 py-8 text-center">
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur-sm">
              Hello world
            </span>
            <h1 className="mb-6 text-6xl font-bold tracking-tight md:text-8xl">
              title
            </h1>
            <p className="text-xl opacity-80 md:text-2xl">Desc</p>
          </div>
        </section>
      </div>
    </main>
  )
}
