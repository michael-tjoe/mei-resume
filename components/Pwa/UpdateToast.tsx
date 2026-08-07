'use client'

import { useEffect, useState } from 'react'
import { useSerwist } from '@serwist/next/react'
import { cn } from '@/lib/cn'

/**
 * Prompt when a new SW is waiting. Refresh → skipWaiting → reload on controlling.
 * @see https://serwist.pages.dev/docs/window#the-waiting-event
 */
export default function UpdateToast() {
  const { serwist } = useSerwist()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!serwist) return

    const onWaiting = () => setVisible(true)

    serwist.addEventListener('waiting', onWaiting)
    return () => serwist.removeEventListener('waiting', onWaiting)
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
            if (!serwist) return

            // Reload once the waiting SW has taken control of this tab.
            serwist.addEventListener('controlling', () => {
              window.location.reload()
            })
            // Instructs the waiting SW to activate: posts { type: "SKIP_WAITING" };
            // the worker then runs self.skipWaiting() (this line does not activate
            // it in-page). Without this, the new SW stays waiting while the old one
            // controls open tabs — a plain reload often won't activate it.
            // No-op if nothing is waiting. Docs: https://serwist.pages.dev/docs/window/serwist
            serwist.messageSkipWaiting()
          }}
        >
          Refresh
        </button>
        <button
          type="button"
          aria-label="Dismiss"
          className="shrink-0 font-sora text-sm text-brand-cream/70 hover:text-brand-cream"
          onClick={() => setVisible(false)}
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
