import { createContext, useContext, useEffect, useState } from 'react'

const DESKTOP_MEDIA = '(min-width: 840px)'

interface ViewportContextValue {
  isDesktop: boolean
}

const ViewportContext = createContext<ViewportContextValue | null>(null)

export function ViewportProvider({ children }: { children: React.ReactNode }) {
  // Always start with false so server and client render the same (avoids hydration mismatch).
  // Real value is set in useEffect after mount.
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_MEDIA)
    setIsDesktop(mql.matches)
    const handler = () => setIsDesktop(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return (
    <ViewportContext.Provider value={{ isDesktop }}>
      {children}
    </ViewportContext.Provider>
  )
}

export function useViewport(): ViewportContextValue {
  const value = useContext(ViewportContext)
  if (value == null) {
    throw new Error('useViewport must be used within ViewportProvider')
  }
  return value
}
