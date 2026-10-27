'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-24 md:pt-32 pb-20 flex flex-col justify-center">
      <div className="container-full">
        <div className="max-w-[480px] mx-auto p-8 md:p-10 rounded-2xl bg-bg-surface border border-border-subtle shadow-2xl">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-micro font-mono text-text-muted hover:text-mint transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO SIGN IN</span>
          </Link>

          <h1 className="text-display-sm font-display uppercase tracking-tight text-text-primary mb-2">
            RESET PASSWORD.
          </h1>
          <p className="text-body-sm text-text-secondary mb-8">
            Enter your account email to receive a secure password reset link.
          </p>

          {sent ? (
            <div className="p-4 rounded-md bg-mint-subtle border border-mint/30 text-mint font-mono text-body-sm space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>LINK DISPATCHED</span>
              </div>
              <p className="text-micro text-text-secondary">
                A verification link has been sent to {email}. Follow the instructions to reset your password.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-micro text-text-muted mb-1.5 uppercase">
                  Account Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@saferide.app"
                  className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3.5 text-label justify-center mt-2"
              >
                SEND RESET INSTRUCTIONS
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
