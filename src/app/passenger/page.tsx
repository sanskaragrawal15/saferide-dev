'use client'

import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { Shield, Clock, MapPin, Navigation, ArrowUpRight, User, Phone, CheckCircle2 } from 'lucide-react'

export default function PassengerDashboard() {
  const { currentUser, activeTrip, trips } = useAppStore()

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 md:pt-28 pb-16">
      <div className="container-full">
        <div className="max-w-[1380px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-border-subtle/50">
            <div>
              <div className="flex items-center gap-2 font-mono text-micro text-mint mb-2">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                <span>PASSENGER PORTAL</span>
              </div>
              <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
                WELCOME BACK, {currentUser.name.split(' ')[0]}.
              </h1>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-micro">
              <Link href="/book" className="btn-primary text-micro px-4 py-2.5">
                <span>NEW BOOKING</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/passenger/trips" className="btn-secondary text-micro px-4 py-2.5">
                TRIP HISTORY
              </Link>
              <Link href="/passenger/safety" className="btn-secondary text-micro px-4 py-2.5">
                SAFETY CONTACTS
              </Link>
              <Link href="/passenger/profile" className="btn-secondary text-micro px-4 py-2.5">
                PROFILE
              </Link>
            </div>
          </div>

          {/* Active Trip Banner if in progress */}
          {activeTrip && activeTrip.status !== 'completed' && (
            <div className="mb-10 p-6 md:p-8 rounded-xl bg-[#090D0A] border-2 border-mint/40 shadow-mint-glow relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-micro text-mint mb-2">
                    <span className="w-2 h-2 rounded-full bg-mint animate-ping" />
                    <span className="font-bold uppercase">LIVE ACTIVE TRIP • {activeTrip.id}</span>
                  </div>
                  <h3 className="text-headline font-display text-text-primary mb-2">
                    {activeTrip.pickup} → {activeTrip.destination}
                  </h3>
                  <div className="font-mono text-micro text-text-muted flex items-center gap-4">
                    <span>DRIVER: {activeTrip.driverName}</span>
                    <span>•</span>
                    <span>VEHICLE: {activeTrip.vehiclePlate}</span>
                    <span>•</span>
                    <span className="text-mint">STATUS: {activeTrip.status.toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Link href="/book" className="btn-primary text-label px-6 py-3 whitespace-nowrap">
                    <span>OPEN TRIP CONSOLE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Box 1: Verified Identity */}
            <div className="p-6 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="font-mono text-micro text-mint mb-3 uppercase">Account Identity</div>
              <div className="text-body font-bold text-text-primary mb-1">{currentUser.name}</div>
              <div className="font-mono text-micro text-text-muted mb-4">{currentUser.phone}</div>
              <div className="flex items-center gap-2 text-micro font-mono text-mint">
                <CheckCircle2 className="w-4 h-4" />
                <span>KYC & PHONE VERIFIED</span>
              </div>
            </div>

            {/* Box 2: Emergency Contacts Status */}
            <div className="p-6 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="font-mono text-micro text-mint mb-3 uppercase">Emergency Contacts</div>
              <div className="text-body font-bold text-text-primary mb-1">
                {currentUser.emergencyContacts?.length || 0} Contacts Configured
              </div>
              <div className="font-mono text-micro text-text-muted mb-4">
                Auto-SMS enabled on SOS trigger
              </div>
              <Link href="/passenger/safety" className="text-mint hover:underline font-mono text-micro">
                MANAGE CONTACTS →
              </Link>
            </div>

            {/* Box 3: Total Completed Journeys */}
            <div className="p-6 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="font-mono text-micro text-mint mb-3 uppercase">SafeRide Metric</div>
              <div className="text-body font-bold text-text-primary mb-1">
                {trips.length} Total Journeys Recorded
              </div>
              <div className="font-mono text-micro text-text-muted mb-4">
                100% Hardware Guardian Protected
              </div>
              <Link href="/passenger/trips" className="text-mint hover:underline font-mono text-micro">
                VIEW HISTORY →
              </Link>
            </div>
          </div>

          {/* Recent Trips Table */}
          <div className="rounded-xl bg-bg-surface border border-border-subtle p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-subtle font-mono text-micro">
              <span className="text-text-primary font-bold uppercase">Recent Journey Records</span>
              <Link href="/passenger/trips" className="text-mint hover:underline">
                VIEW ALL ({trips.length})
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-micro">
                <thead className="bg-bg-elevated text-text-muted border-b border-border-subtle uppercase">
                  <tr>
                    <th className="p-3.5">Trip ID</th>
                    <th className="p-3.5">Route</th>
                    <th className="p-3.5">Vehicle</th>
                    <th className="p-3.5">Fare</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-text-primary">
                  {trips.map((t) => (
                    <tr key={t.id} className="hover:bg-bg-elevated/50 transition-colors">
                      <td className="p-3.5 font-bold text-mint">{t.id}</td>
                      <td className="p-3.5 max-w-xs truncate">
                        <div>{t.pickup}</div>
                        <div className="text-text-muted text-[10px]">→ {t.destination}</div>
                      </td>
                      <td className="p-3.5">{t.vehiclePlate}</td>
                      <td className="p-3.5">₹{t.fare}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-sm bg-mint-subtle text-mint text-[10px]">
                          {t.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <Link href="/book" className="text-mint hover:underline">
                          VIEW →
                        </Link>
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
