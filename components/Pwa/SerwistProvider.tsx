'use client'

import type { ReactNode } from 'react'
import { SerwistProvider as SerwistReactProvider } from '@serwist/turbopack/react'
import UpdateToast from './UpdateToast'

export default function SerwistProvider({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV !== 'production') {
    return children
  }

  return (
    <SerwistReactProvider
      swUrl="/serwist/sw.js"
      reloadOnOnline={false}
      options={{ type: 'classic' }}
    >
      {children}
      <UpdateToast />
    </SerwistReactProvider>
  )
}
