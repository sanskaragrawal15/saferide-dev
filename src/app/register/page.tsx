'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const { login } = useAppStore()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, 'passenger')
    router.push('/passenger')
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-24 md:pt-32 pb-20 flex flex-col justify-center">
      <div className="container-full">
        <div className="max-w-[520px] mx-auto p-8 md:p-10 rounded-2xl bg-bg-surface border border-border-subtle shadow-2xl">
          <div className="flex items-center gap-2 font-mono text-micro text-mint mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-mint" />
            <span>SAFE & INTENTIONAL MOBILITY</span>
          </div>

          <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary mb-2">
            JOIN SAFERIDE.
          </h1>
          <p className="text-body-sm text-text-secondary mb-8">
            Create your account to access verified commercial cabs and connected hardware safety.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-micro text-text-muted mb-1.5 uppercase">
                Full Legal Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              />
            </div>

            <div>
              <label className="block font-mono text-micro text-text-muted mb-1.5 uppercase">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@example.com"
                className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              />
            </div>

            <div>
              <label className="block font-mono text-micro text-text-muted mb-1.5 uppercase">
                Mobile Number (For SMS Safety Alerts)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98100 12345"
                className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              />
            </div>

            <div>
              <label className="block font-mono text-micro text-text-muted mb-1.5 uppercase">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3.5 text-label justify-center shadow-mint-glow mt-2"
            >
              <span>CREATE ACCOUNT</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </form>

          <div className="pt-6 mt-6 border-t border-border-subtle text-center font-mono text-micro text-text-muted">
            Already registered?{' '}
            <Link href="/login" className="text-mint hover:underline">
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
