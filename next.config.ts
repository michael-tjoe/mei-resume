import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        type: 'asset',
      },
    },
  },
  webpack(config) {
    // Prefer URL-string SVG imports (Vite parity) over any default SVG handling.
    const rules = config.module.rules as Array<{
      test?: RegExp
      exclude?: RegExp | RegExp[]
      oneOf?: unknown
    }>

    for (const rule of rules) {
      if (rule.test instanceof RegExp && rule.test.test('.svg')) {
        rule.exclude = /\.svg$/i
      }
    }

    config.module.rules.push({
      test: /\.svg$/i,
      type: 'asset/resource',
    })

    return config
  },
}

export default nextConfig
