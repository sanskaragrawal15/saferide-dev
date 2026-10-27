'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShieldAlert, Phone, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default function DriverSafetyPage() {
  const [reported, setReported] = useState(false)
  const [hazardText, setHazardText] = useState('')

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault()
    setReported(true)
    setTimeout(() => {
      setReported(false)
      setHazardText('')
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 md:pt-28 pb-16">
      <div className="container-full">
        <div className="max-w-[1000px] mx-auto">
          {/* Back */}
          <div className="mb-6">
            <Link
              href="/driver"
              className="inline-flex items-center gap-2 text-micro font-mono text-text-muted hover:text-mint transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO DRIVER CONSOLE</span>
            </Link>
          </div>

          <div className="pb-8 mb-8 border-b border-border-subtle/50">
            <div className="flex items-center gap-2 font-mono text-micro text-mint mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint" />
              <span>DRIVER ASSISTANCE & ROAD INTEGRITY</span>
            </div>
            <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
              DRIVER SAFETY TOOLS.
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Quick 24/7 Dispatch Hotline */}
            <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-mint/10 border border-mint/20 flex items-center justify-center text-mint mb-6">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-display text-headline uppercase text-text-primary mb-3">
                  OPERATOR HOTLINE
                </h3>
                <p className="text-body-sm text-text-secondary leading-relaxed mb-6">
                  Direct voice line to SafeRide 24/7 Fleet Command Centre for immediate route guidance, roadside assistance, or passenger disputes.
                </p>
              </div>

              <a
                href="tel:18001027233"
                className="btn-primary w-full py-3.5 text-label justify-center"
              >
                CALL DISPATCH (1800-102-SAFE)
              </a>
            </div>

            {/* Road Hazard Broadcast */}
            <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle">
              <h3 className="font-display text-headline uppercase text-text-primary mb-3">
                REPORT ROAD HAZARD
              </h3>
              <p className="text-body-sm text-text-secondary leading-relaxed mb-6">
                Notify nearby SafeRide cabs of sudden waterlogging, unmapped roadblocks, or accident delays.
              </p>

              {reported ? (
                <div className="p-4 rounded-md bg-mint-subtle border border-mint/30 text-mint font-mono text-micro flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Hazard report broadcasted to fleet corridor radar.</span>
                </div>
              ) : (
                <form onSubmit={handleReport} className="space-y-4">
                  <textarea
                    rows={3}
                    required
                    value={hazardText}
                    onChange={(e) => setHazardText(e.target.value)}
                    placeholder="Describe obstruction (e.g. NH-48 flyover repair, waterlogged service lane)..."
                    className="w-full p-3.5 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                  />
                  <button type="submit" className="btn-secondary w-full py-3 text-label justify-center">
                    BROADCAST HAZARD ALERT
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
