// @ts-check
import { spawnSync } from 'node:child_process'
import { serwist } from '@serwist/next/config'

const revision =
  spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf-8' }).stdout?.trim() ||
  crypto.randomUUID()

// Keep the previous lean shell (js/css/fonts + icons). Default generateGlobPatterns
// also pulls .next/static/media images and balloons the precache (~19MB).
// `/` and `/~offline` are dynamic (layout reads headers), so they are not emitted as
// prerendered HTML — list them explicitly. precachePrerendered still helps if/when
// routes become static.
export default serwist({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  globPatterns: [
    '.next/static/**/*.{js,css,woff,woff2}',
    'public/icons/**/*.{png,ico,svg,webp}',
  ],
  // URLs to fetch+cache at SW install that globPatterns can't find as files.
  // revision (git HEAD) busts the precache when the deploy changes.
  additionalPrecacheEntries: [
    { url: '/', revision },
    { url: '/~offline', revision },
  ],
})
