'use client'

import { useEffect, useRef, useState } from 'react'
import { useSerwist } from '@serwist/next/react'
import { cn } from '@/lib/cn'

const DISMISS_KEY = 'pwa-update-toast-dismissed'

export default function UpdateToast() {
  const { serwist } = useSerwist()
  const [visible, setVisible] = useState(false)
  const refreshRequested = useRef(false)

  useEffect(() => {
    if (!serwist) return

    const onWaiting = () => {
      try {
        if (sessionStorage.getItem(DISMISS_KEY) === '1') return
      } catch {
        // ignore
      }
      setVisible(true)
    }

    const onControlling = () => {
      if (refreshRequested.current) {
        window.location.reload()
      }
    }

    serwist.addEventListener('waiting', onWaiting)
    serwist.addEventListener('controlling', onControlling)
    return () => {
      serwist.removeEventListener('waiting', onWaiting)
      serwist.removeEventListener('controlling', onControlling)
    }
  }, [serwist])

  if (!visible) return null

  return (
    <div
      role="status"
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 flex justify-center px-4',
        'pb-[max(1rem,env(safe-area-inset-bottom))]',
      )}
    >
      <div className="mb-3 flex w-full max-w-md items-center gap-3 rounded-sm bg-brand-dark px-4 py-3 text-brand-cream shadow-lg">
        <p className="grow font-sora text-sm">New version available</p>
        <button
          type="button"
          className="shrink-0 font-sora text-sm font-semibold text-brand-tan underline-offset-2 hover:underline"
          onClick={() => {
            try {
              sessionStorage.removeItem(DISMISS_KEY)
            } catch {
              // ignore
            }
            refreshRequested.current = true
            serwist?.messageSkipWaiting()
          }}
        >
          Refresh
        </button>
        <button
          type="button"
          aria-label="Dismiss"
          className="shrink-0 font-sora text-sm text-brand-cream/70 hover:text-brand-cream"
          onClick={() => {
            try {
              sessionStorage.setItem(DISMISS_KEY, '1')
            } catch {
              // ignore
            }
            setVisible(false)
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
