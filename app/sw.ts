/// <reference lib="esnext" />
/// <reference lib="webworker" />

import type { PrecacheEntry, RuntimeCaching, SerwistGlobalConfig } from 'serwist'
import {
  CacheFirst,
  ExpirationPlugin,
  NetworkFirst,
  Serwist,
} from 'serwist'

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const DAY = 24 * 60 * 60
const HOUR = 60 * 60

const runtimeCaching: RuntimeCaching[] = [
  {
    matcher: /\/_next\/static\/.+/i,
    handler: new CacheFirst({
      cacheName: 'next-static',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 128,
          maxAgeSeconds: 365 * DAY,
          maxAgeFrom: 'last-used',
        }),
      ],
    }),
  },
  {
    matcher: /\/_next\/image\?url=.+/i,
    handler: new CacheFirst({
      cacheName: 'next-image',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 70,
          maxAgeSeconds: 30 * DAY,
          maxAgeFrom: 'last-used',
        }),
      ],
    }),
  },
  {
    matcher: /\.(?:jpg|jpeg|gif|png|svg|ico|webp|avif)$/i,
    handler: new CacheFirst({
      cacheName: 'static-image-assets',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 70,
          maxAgeSeconds: 30 * DAY,
          maxAgeFrom: 'last-used',
        }),
      ],
    }),
  },
  {
    matcher: ({ request, sameOrigin }) =>
      sameOrigin && request.mode === 'navigate',
    handler: new NetworkFirst({
      cacheName: 'pages',
      networkTimeoutSeconds: 3,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 2,
          maxAgeSeconds: HOUR,
          maxAgeFrom: 'last-used',
        }),
      ],
    }),
  },
]

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: false,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching,
  fallbacks: {
    entries: [
      {
        url: '/~offline',
        matcher({ request }) {
          return request.destination === 'document'
        },
      },
    ],
  },
})

serwist.addEventListeners()
