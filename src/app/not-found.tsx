import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-micro text-mint uppercase tracking-[0.28em] mb-4">
        404 — Page Not Found
      </span>
      <h1 className="text-display-md font-display uppercase tracking-tight text-text-primary mb-6">
        Destination Unreachable
      </h1>
      <p className="text-body text-text-secondary max-w-md mb-8">
        The route you are trying to access does not exist or has been relocated.
      </p>
      <Link href="/" className="btn-primary">
        Return Home
      </Link>
    </div>
  )
}
