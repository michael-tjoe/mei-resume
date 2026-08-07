import { spawnSync } from 'node:child_process'
import { createSerwistRoute } from '@serwist/turbopack'

const revision =
  spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf-8' }).stdout?.trim() ||
  crypto.randomUUID()

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
  createSerwistRoute({
    // Shell only — images are runtime-cached (see app/sw.ts), not precached.
    globPatterns: [
      '.next/static/**/*.{js,css,woff,woff2}',
      'public/icons/**/*.{png,ico,svg,webp}',
    ],
    additionalPrecacheEntries: [{ url: '/~offline', revision }],
    swSrc: 'app/sw.ts',
    useNativeEsbuild: true,
  })
