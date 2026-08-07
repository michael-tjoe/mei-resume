'use client'

import type { ReactNode } from 'react'
import { SerwistProvider as SerwistReactProvider } from '@serwist/next/react'
import UpdateToast from './UpdateToast'

export default function SerwistProvider({ children }: { children: ReactNode }) {
  return (
    <SerwistReactProvider
      swUrl="/sw.js"
      reloadOnOnline={false}
      // Passed to navigator.serviceWorker.register(): load /sw.js as a classic
      // script (not type: 'module'). Matches Serwist CLI output (bundled, no ESM).
      options={{ type: 'classic' }}
    >
      {children}
      <UpdateToast />
    </SerwistReactProvider>
  )
}
