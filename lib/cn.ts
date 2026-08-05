import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Custom `--text-portofolio-*` theme tokens become `text-portofolio-*` font-size
 * utilities. Register them so they don't conflict with `text-*` colors (e.g.
 * `text-brand-cream`) when merged.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'body',
        'portofolio-title',
        'portofolio-subtitle',
        'portofolio-name',
        'portofolio-nameshadow',
        'portofolio-title-badge',
        'portofolio-body',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
