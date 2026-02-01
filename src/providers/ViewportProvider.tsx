import { createContext, useContext, useEffect, useState } from 'react'

const DESKTOP_MEDIA = '(min-width: 840px)'

interface ViewportContextValue {
  isDesktop: boolean
}

const ViewportContext = createContext<ViewportContextValue | null>(null)

export function ViewportProvider({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== 'undefined' && window.matchMedia(DESKTOP_MEDIA).matches
  )

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_MEDIA)
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
