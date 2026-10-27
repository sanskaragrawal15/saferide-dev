'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CommandNav } from '@/components/command/CommandNav'
import { useAppStore } from '@/lib/store'
import { Car, Search, Filter, Plus, ShieldCheck, Battery, Zap } from 'lucide-react'

export default function CommandVehiclesPage() {
  const { devices } = useAppStore()
  const [search, setSearch] = useState('')

  const vehicles = [
    { plate: 'DL 01 AB 4829', model: 'Maruti Suzuki Dzire Tour', color: 'Obsidian Black', driver: 'Rajesh Singh', deviceId: 'SPARROW-04-A9', rooftop: 'Active', status: 'In Transit' },
    { plate: 'DL 03 CA 9081', model: 'Honda City', color: 'Metallic Black', driver: 'Amit Verma', deviceId: 'SPARROW-04-C2', rooftop: 'Active', status: 'Online / Idle' },
    { plate: 'HR 26 CV 3310', model: 'Tata Tigor EV', color: 'Charcoal Black', driver: 'Vikram Malhotra', deviceId: 'SPARROW-04-E7', rooftop: 'Active', status: 'In Transit' },
    { plate: 'DL 04 MK 1108', model: 'Maruti Ertiga', color: 'Deep Black', driver: 'Suresh Patel', deviceId: 'SPARROW-04-F1', rooftop: 'Active', status: 'Maintenance' },
  ]

  const filtered = vehicles.filter((v) =>
    v.plate.toLowerCase().includes(search.toLowerCase()) ||
    v.driver.toLowerCase().includes(search.toLowerCase())
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
                <span>COMMERCIAL FLEET REGISTRY</span>
              </div>
              <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
                FLEET VEHICLES.
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/command/qr" className="btn-primary text-micro flex items-center gap-2">
                <Plus className="w-3.5 h-3.5" />
                <span>PAIR NEW VEHICLE VIA QR</span>
              </Link>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 rounded-xl bg-bg-surface border border-border-subtle mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-micro">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search registration or driver..."
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-bg-elevated border border-border-subtle text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mint"
              />
            </div>

            <div className="flex items-center gap-4 text-text-muted">
              <span>SHOWING {filtered.length} OF {vehicles.length} VEHICLES</span>
              <span className="text-border-subtle">|</span>
              <span className="text-mint font-bold">100% ROOFTOP VERIFIED</span>
            </div>
          </div>

          {/* Vehicles Table */}
          <div className="rounded-xl bg-bg-surface border border-border-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-micro">
                <thead className="bg-bg-elevated text-text-muted border-b border-border-subtle uppercase">
                  <tr>
                    <th className="p-4">License Plate</th>
                    <th className="p-4">Model & Color</th>
                    <th className="p-4">Assigned Driver</th>
                    <th className="p-4">Safety Device</th>
                    <th className="p-4">Rooftop Sign</th>
                    <th className="p-4">Operating Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-text-primary">
                  {filtered.map((v) => (
                    <tr key={v.plate} className="hover:bg-bg-elevated/50 transition-colors">
                      <td className="p-4 font-bold text-mint">{v.plate}</td>
                      <td className="p-4">
                        <div className="font-sans font-medium">{v.model}</div>
                        <div className="text-[10px] text-text-muted">{v.color}</div>
                      </td>
                      <td className="p-4">{v.driver}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-sm bg-bg-elevated border border-border-subtle">
                          {v.deviceId}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-mint font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                          <span>{v.rooftop}</span>
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                            v.status.includes('Transit')
                              ? 'bg-mint-subtle text-mint border border-mint/20'
                              : v.status.includes('Idle')
                              ? 'bg-bg-elevated text-text-secondary border border-border-subtle'
                              : 'bg-warning/20 text-warning border border-warning/30'
                          }`}
                        >
                          {v.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => alert(`Vehicle telemetry stream opened for ${v.plate}`)}
                          className="text-mint hover:underline"
                        >
                          MANAGE →
                        </button>
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
