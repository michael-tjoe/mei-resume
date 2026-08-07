'use client'

import type { ReactNode } from 'react'
import { SerwistProvider as SerwistReactProvider } from '@serwist/next/react'
import UpdateToast from './UpdateToast'

export default function SerwistProvider({ children }: { children: ReactNode }) {
  return (
    <SerwistReactProvider
      swUrl="/sw.js"
      reloadOnOnline={false}
      options={{ type: 'classic' }}
    >
      {children}
      <UpdateToast />
    </SerwistReactProvider>
  )
}
