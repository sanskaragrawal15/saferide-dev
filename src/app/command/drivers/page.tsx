'use client'

import { useState } from 'react'
import { CommandNav } from '@/components/command/CommandNav'
import { Users, Search, ShieldCheck, Star } from 'lucide-react'

export default function CommandDriversPage() {
  const [search, setSearch] = useState('')

  const drivers = [
    { id: 'DRV-8921', name: 'Rajesh Singh', phone: '+91 98765 43210', vehicle: 'DL 01 AB 4829', rating: 4.96, trips: 1480, status: 'In Transit', kyc: 'Verified' },
    { id: 'DRV-8922', name: 'Amit Verma', phone: '+91 98123 45678', vehicle: 'DL 03 CA 9081', rating: 4.88, trips: 920, status: 'Online / Idle', kyc: 'Verified' },
    { id: 'DRV-8923', name: 'Vikram Malhotra', phone: '+91 98111 22334', vehicle: 'HR 26 CV 3310', rating: 4.94, trips: 1150, status: 'In Transit', kyc: 'Verified' },
    { id: 'DRV-8924', name: 'Suresh Patel', phone: '+91 98222 33445', vehicle: 'DL 04 MK 1108', rating: 4.79, trips: 640, status: 'Off Duty', kyc: 'Verified' },
  ]

  const filtered = drivers.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.vehicle.toLowerCase().includes(search.toLowerCase())
  )

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
                <span>PERSONNEL OPERATIONS</span>
              </div>
              <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
                FLEET DRIVERS.
              </h1>
            </div>

            <div className="font-mono text-micro text-text-muted">
              <span>ACTIVE DUTY ROSTER • 42 REGISTERED</span>
            </div>
          </div>

          {/* Search */}
          <div className="p-4 rounded-xl bg-bg-surface border border-border-subtle mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-micro">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search driver name or vehicle..."
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-bg-elevated border border-border-subtle text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mint"
              />
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl bg-bg-surface border border-border-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-micro">
                <thead className="bg-bg-elevated text-text-muted border-b border-border-subtle uppercase">
                  <tr>
                    <th className="p-4">Driver ID</th>
                    <th className="p-4">Full Name</th>
                    <th className="p-4">Contact Phone</th>
                    <th className="p-4">Assigned Cab</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4">Lifetime Trips</th>
                    <th className="p-4">Duty Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-text-primary">
                  {filtered.map((d) => (
                    <tr key={d.id} className="hover:bg-bg-elevated/50 transition-colors">
                      <td className="p-4 font-bold text-mint">{d.id}</td>
                      <td className="p-4 font-sans font-medium">{d.name}</td>
                      <td className="p-4 text-text-muted">{d.phone}</td>
                      <td className="p-4 font-bold">{d.vehicle}</td>
                      <td className="p-4 text-mint">{d.rating} ★</td>
                      <td className="p-4">{d.trips}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                            d.status.includes('Transit')
                              ? 'bg-mint-subtle text-mint border border-mint/20'
                              : d.status.includes('Idle')
                              ? 'bg-bg-elevated text-text-secondary border border-border-subtle'
                              : 'bg-text-muted/10 text-text-muted border border-border-subtle'
                          }`}
                        >
                          {d.status.toUpperCase()}
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
