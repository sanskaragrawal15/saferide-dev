'use client'

import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { ArrowLeft, MapPin, Navigation, Calendar, ShieldCheck, Download } from 'lucide-react'

export default function PassengerTripsPage() {
  const { trips } = useAppStore()

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 md:pt-28 pb-16">
      <div className="container-full">
        <div className="max-w-[1380px] mx-auto">
          {/* Breadcrumb / Back */}
          <div className="mb-6">
            <Link
              href="/passenger"
              className="inline-flex items-center gap-2 text-micro font-mono text-text-muted hover:text-mint transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO PASSENGER OVERVIEW</span>
            </Link>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-border-subtle/50">
            <div>
              <div className="flex items-center gap-2 font-mono text-micro text-mint mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                <span>JOURNEY LOGS</span>
              </div>
              <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
                TRIP HISTORY.
              </h1>
            </div>

            <button
              onClick={() => alert('Demo Mode: Trip archive CSV exported.')}
              className="btn-secondary text-micro flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-mint" />
              <span>EXPORT AUDIT CSV</span>
            </button>
          </div>

          {/* Trips List */}
          <div className="space-y-6">
            {trips.map((t) => (
              <div
                key={t.id}
                className="p-6 md:p-8 rounded-xl bg-bg-surface border border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-micro">
                    <span className="font-bold text-mint">{t.id}</span>
                    <span className="text-border-subtle">•</span>
                    <span className="text-text-muted">{new Date(t.createdAt).toLocaleDateString()}</span>
                    <span className="text-border-subtle">•</span>
                    <span className="px-2 py-0.5 rounded-sm bg-mint-subtle text-mint text-[10px]">
                      {t.status.toUpperCase()}
                    </span>
                    <span className="text-border-subtle">•</span>
                    <span className="text-text-muted">{t.vehiclePlate} ({t.vehicleModel})</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-body-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-mint mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-micro font-mono text-text-muted block">ORIGIN</span>
                        <span className="text-text-primary">{t.pickup}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Navigation className="w-4 h-4 text-mint mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-micro font-mono text-text-muted block">DESTINATION</span>
                        <span className="text-text-primary">{t.destination}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-border-subtle">
                  <div className="font-mono text-display-sm text-mint font-bold">₹{t.fare}</div>
                  <div className="font-mono text-micro text-text-muted">{t.distanceKm} KM • {t.durationMin} MIN</div>
                  <Link href="/book" className="text-mint hover:underline font-mono text-micro">
                    RE-BOOK ROUTE →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
