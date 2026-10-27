'use client'

import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { ArrowLeft, Download, CheckCircle2, DollarSign } from 'lucide-react'

export default function DriverTripsPage() {
  const { trips } = useAppStore()

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 md:pt-28 pb-16">
      <div className="container-full">
        <div className="max-w-[1380px] mx-auto">
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

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-border-subtle/50">
            <div>
              <div className="flex items-center gap-2 font-mono text-micro text-mint mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                <span>SHIFT EARNINGS & COMPLETED ASSIGNMENTS</span>
              </div>
              <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
                DRIVER TRIP HISTORY.
              </h1>
            </div>

            <button
              onClick={() => alert('Demo Mode: Driver earnings statement downloaded.')}
              className="btn-secondary text-micro flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-mint" />
              <span>DOWNLOAD EARNINGS STATEMENT</span>
            </button>
          </div>

          <div className="space-y-4">
            {trips.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-xl bg-bg-surface border border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-micro">
                    <span className="text-mint font-bold">{t.id}</span>
                    <span className="text-border-subtle">•</span>
                    <span className="text-text-muted">{new Date(t.createdAt).toLocaleDateString()}</span>
                    <span className="text-border-subtle">•</span>
                    <span className="px-2 py-0.5 rounded-sm bg-mint-subtle text-mint text-[10px]">
                      {t.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-body-sm font-medium text-text-primary">
                    {t.pickup} → {t.destination}
                  </div>

                  <div className="font-mono text-micro text-text-muted">
                    Distance: {t.distanceKm} km • Duration: {t.durationMin} mins • Mode: {t.category.toUpperCase()}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-display-sm text-mint font-bold">₹{t.fare}</div>
                  <div className="font-mono text-micro text-text-muted">Net Payout Transferred</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
