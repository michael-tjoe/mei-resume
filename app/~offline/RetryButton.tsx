'use client'

export default function RetryButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.reload()
      }}
      className="mt-6 rounded-sm bg-brand-dark px-5 py-2.5 font-sora text-sm font-medium text-brand-cream transition-opacity hover:opacity-90"
    >
      Try again
    </button>
  )
}
