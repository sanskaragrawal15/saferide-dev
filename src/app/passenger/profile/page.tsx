'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { ArrowLeft, User, Phone, Mail, Shield, CheckCircle2 } from 'lucide-react'

export default function PassengerProfilePage() {
  const { currentUser } = useAppStore()

  const [name, setName] = useState(currentUser.name)
  const [email, setEmail] = useState(currentUser.email)
  const [phone, setPhone] = useState(currentUser.phone)
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 md:pt-28 pb-16">
      <div className="container-full">
        <div className="max-w-[1000px] mx-auto">
          {/* Back */}
          <div className="mb-6">
            <Link
              href="/passenger"
              className="inline-flex items-center gap-2 text-micro font-mono text-text-muted hover:text-mint transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO PASSENGER OVERVIEW</span>
            </Link>
          </div>

          <div className="pb-8 mb-8 border-b border-border-subtle/50">
            <div className="flex items-center gap-2 font-mono text-micro text-mint mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint" />
              <span>ACCOUNT CREDENTIALS</span>
            </div>
            <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
              PROFILE SETTINGS.
            </h1>
          </div>

          <div className="p-8 md:p-10 rounded-xl bg-bg-surface border border-border-subtle">
            {saved && (
              <div className="p-4 mb-6 rounded-md bg-mint-subtle border border-mint/30 text-mint font-mono text-body-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Account settings updated successfully.</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-micro text-text-muted mb-2 uppercase">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                  />
                </div>

                <div>
                  <label className="block font-mono text-micro text-text-muted mb-2 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-micro text-text-muted mb-2 uppercase">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                />
              </div>

              <div className="pt-6 border-t border-border-subtle/40 flex items-center justify-between">
                <div className="font-mono text-micro text-text-muted">
                  ROLE: <span className="text-mint uppercase">{currentUser.role}</span>
                </div>

                <button type="submit" className="btn-primary text-label px-6 py-3">
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
