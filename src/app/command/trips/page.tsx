'use client'

import { CommandNav } from '@/components/command/CommandNav'
import { useAppStore } from '@/lib/store'
import { Navigation, Clock, MapPin, Search } from 'lucide-react'

export default function CommandTripsPage() {
  const { trips } = useAppStore()

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-16 md:pt-20 pb-20">
      <CommandNav />

      <div className="container-full pt-8">
        <div className="max-w-[1500px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-border-subtle/50">
            <div>
              <div className="flex items-center gap-2 font-mono text-micro text-mint mb-1.5">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                <span>DISPATCH & ROUTE LOGS</span>
              </div>
              <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
                FLEET TRIPS & TRANSIT.
              </h1>
            </div>

            <div className="font-mono text-micro text-text-muted">
              <span>{trips.length} TOTAL JOURNEYS AUDITED</span>
            </div>
          </div>

          {/* Trips Table */}
          <div className="rounded-xl bg-bg-surface border border-border-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-micro">
                <thead className="bg-bg-elevated text-text-muted border-b border-border-subtle uppercase">
                  <tr>
                    <th className="p-4">Trip ID</th>
                    <th className="p-4">Pickup → Destination</th>
                    <th className="p-4">Assigned Cab</th>
                    <th className="p-4">Driver</th>
                    <th className="p-4">Fare</th>
                    <th className="p-4">Distance</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-text-primary">
                  {trips.map((t) => (
                    <tr key={t.id} className="hover:bg-bg-elevated/50 transition-colors">
                      <td className="p-4 font-bold text-mint">{t.id}</td>
                      <td className="p-4 max-w-sm truncate">
                        <div>{t.pickup}</div>
                        <div className="text-[10px] text-text-muted">→ {t.destination}</div>
                      </td>
                      <td className="p-4">{t.vehiclePlate}</td>
                      <td className="p-4">{t.driverName}</td>
                      <td className="p-4 font-bold">₹{t.fare}</td>
                      <td className="p-4">{t.distanceKm} km</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-sm bg-mint-subtle text-mint text-[10px]">
                          {t.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
