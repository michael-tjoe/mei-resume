import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Stefanny Kusuma',
    short_name: 'Stefanny',
    description:
      'Graphic designer and illustrator specializing in social media design.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf3e7',
    theme_color: '#faf3e7',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
