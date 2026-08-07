import RetryButton from './RetryButton'

export default function OfflinePage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-brand-cream px-side text-center">
      <p className="font-sora text-base font-medium text-brand-dark">
        You&apos;re offline — try again
      </p>
      <RetryButton />
    </main>
  )
}
