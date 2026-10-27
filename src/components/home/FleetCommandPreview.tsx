'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const mockVehicles = [
  { id: 'DL-01-AB-4829', driver: 'Rajesh S.', model: 'Dzire Tour (Black)', status: 'ACTIVE TRIP', battery: '98%', speed: '42 km/h' },
  { id: 'DL-01-ET-9102', driver: 'Vikram M.', model: 'Toyota Innova', status: 'ONLINE / IDLE', battery: '94%', speed: '0 km/h' },
  { id: 'HR-26-CV-3310', driver: 'Amit K.', model: 'Tata Tigor EV', status: 'ACTIVE TRIP', battery: '82%', speed: '58 km/h' },
  { id: 'DL-04-MK-1108', driver: 'Suresh P.', model: 'Maruti Ertiga', status: 'DEV. ALERT', battery: '64%', speed: '12 km/h' },
]

export function FleetCommandPreview() {
  const [filter, setFilter] = useState<'all' | 'active' | 'alert'>('all')

  return (
    <section className="section-padding bg-bg-primary border-b border-border-subtle/40 relative overflow-hidden" id="fleet-command">
      {/* Subtle Mesh Ambient Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(162,189,134,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 halftone-pattern opacity-5 pointer-events-none" aria-hidden="true" />

      <div className="container-full relative z-10">
        <div className="max-w-[1440px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-border-subtle/40">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-micro font-mono text-mint mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-mint shadow-[0_0_6px_#A2BD86]" />
                <span className="tracking-[0.2em]">07 / OPERATIONS SUITE</span>
              </div>
              <h2 className="text-display-md md:text-display-lg font-display uppercase tracking-tight text-text-primary leading-[0.95]">
                A CLEARER VIEW
                <br />
                <span className="masked-mint">OF EVERY JOURNEY.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <span className="text-body-sm text-text-secondary">Centralized operations for commercial cabs and fleet partners.</span>
              <Link href="/command" className="btn-primary text-label whitespace-nowrap px-8 py-3.5 rounded-full soft-ui hover:bg-mint/95 shadow-[0_10px_30px_rgba(162,189,134,0.2)]">
                <span>EXPLORE FLEET COMMAND</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Liquid Frosted Glass Operations Cockpit with Rounded-Rectangle Frame */}
          <div className="bento-card rounded-2xl md:rounded-3xl overflow-hidden">
            {/* Top Operational Status Bar */}
            <div className="flex flex-wrap items-center justify-between p-6 border-b border-border-subtle/40 font-mono text-micro bg-bg-surface/60">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-mint shadow-[0_0_8px_#A2BD86]" />
                  <span className="text-text-primary font-bold">SAFERIDE FLEET COMMAND v2.4</span>
                </div>
                <span className="text-border-subtle">•</span>
                <span className="text-mint">ACTIVE FLEET TELEMETRY</span>
              </div>

              {/* KPI Stat Pills with Soft UI */}
              <div className="flex items-center gap-6 text-text-muted mt-3 sm:mt-0">
                <div>
                  <span className="text-text-primary font-bold">24</span> ACTIVE TRIPS
                </div>
                <div>
                  <span className="text-mint font-bold">38</span> ONLINE VEHICLES
                </div>
                <div>
                  <span className="text-text-primary font-bold">1</span> REVIEW FLAG
                </div>
              </div>
            </div>

            {/* Dashboard Inner Grid */}
            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Fleet Table & Quick Filter */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFilter('all')}
                      className={cn(
                        'px-4 py-1.5 rounded-full font-mono text-micro transition-all',
                        filter === 'all'
                          ? 'bg-mint text-bg-primary font-bold shadow-[0_0_12px_rgba(162,189,134,0.3)]'
                          : 'soft-ui text-text-secondary hover:text-text-primary'
                      )}
                    >
                      ALL VEHICLES (38)
                    </button>
                    <button
                      onClick={() => setFilter('active')}
                      className={cn(
                        'px-4 py-1.5 rounded-full font-mono text-micro transition-all',
                        filter === 'active'
                          ? 'bg-mint text-bg-primary font-bold shadow-[0_0_12px_rgba(162,189,134,0.3)]'
                          : 'soft-ui text-text-secondary hover:text-text-primary'
                      )}
                    >
                      IN TRANSIT (24)
                    </button>
                    <button
                      onClick={() => setFilter('alert')}
                      className={cn(
                        'px-4 py-1.5 rounded-full font-mono text-micro transition-all',
                        filter === 'alert'
                          ? 'bg-error text-white font-bold'
                          : 'soft-ui text-text-secondary hover:text-text-primary'
                      )}
                    >
                      ATTENTION (1)
                    </button>
                  </div>

                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full soft-ui text-text-muted font-mono text-micro">
                    <Search className="w-3.5 h-3.5" />
                    <span>FILTER REGISTRATION...</span>
                  </div>
                </div>

                {/* Table with Soft UI & Hairline Dividers */}
                <div className="overflow-x-auto rounded-xl border border-border-subtle/60 soft-ui">
                  <table className="w-full text-left font-mono text-micro">
                    <thead className="bg-[#090C0A] text-text-muted border-b border-border-subtle/40 uppercase">
                      <tr>
                        <th className="p-3.5">Registration</th>
                        <th className="p-3.5">Driver & Vehicle</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Speed</th>
                        <th className="p-3.5">Guardian Battery</th>
                        <th className="p-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle/40 text-text-primary">
                      {mockVehicles.map((v) => (
                        <tr key={v.id} className="hover:bg-bg-elevated/40 transition-colors">
                          <td className="p-3.5 font-bold text-mint">{v.id}</td>
                          <td className="p-3.5">
                            <div>{v.driver}</div>
                            <div className="text-text-muted text-[10px]">{v.model}</div>
                          </td>
                          <td className="p-3.5">
                            <span
                              className={cn(
                                'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px]',
                                v.status.includes('ACTIVE')
                                  ? 'bg-mint-subtle text-mint border border-mint/20'
                                  : v.status.includes('ALERT')
                                  ? 'bg-error/20 text-error border border-error/40'
                                  : 'bg-bg-elevated text-text-muted border border-border-subtle'
                              )}
                            >
                              <span
                                className={cn(
                                  'w-1.5 h-1.5 rounded-full',
                                  v.status.includes('ACTIVE')
                                    ? 'bg-mint'
                                    : v.status.includes('ALERT')
                                    ? 'bg-error'
                                    : 'bg-text-muted'
                                )}
                              />
                              {v.status}
                            </span>
                          </td>
                          <td className="p-3.5">{v.speed}</td>
                          <td className="p-3.5">{v.battery}</td>
                          <td className="p-3.5 text-right">
                            <Link href="/command" className="text-mint hover:underline">
                              MONITOR →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Mini Map & Incident Radar */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="relative aspect-[4/3] rounded-2xl bg-[#050605] border border-border-subtle/60 overflow-hidden p-4 flex flex-col justify-between soft-ui">
                  <div className="flex items-center justify-between font-mono text-micro text-text-muted z-10">
                    <span>NCR REGION RADAR</span>
                    <span className="text-mint font-semibold">REFRESH: 1S</span>
                  </div>

                  {/* Stylized Vector Radar */}
                  <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 300 240" fill="none">
                    <circle cx="150" cy="120" r="80" stroke="#272D28" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="150" cy="120" r="40" stroke="#272D28" strokeWidth="1" />
                    <circle cx="130" cy="90" r="3.5" fill="#A2BD86" />
                    <circle cx="170" cy="130" r="3.5" fill="#A2BD86" />
                    <circle cx="110" cy="160" r="3.5" fill="#A2BD86" />
                    <circle cx="210" cy="80" r="3.5" fill="#A2BD86" />
                    <circle cx="220" cy="170" r="4" fill="#E53E3E" />
                  </svg>

                  <div className="z-10 liquid-glass rounded-xl p-3 font-mono text-micro">
                    <div className="flex items-center justify-between text-text-primary mb-1">
                      <span className="font-bold">DL-04-MK-1108</span>
                      <span className="text-error font-semibold">FLAGGED ANOMALY</span>
                    </div>
                    <div className="text-text-muted text-[10px]">
                      Unexpected stop duration &gt; 8 min on NH-48. Operator review initiated.
                    </div>
                  </div>
                </div>

                <Link
                  href="/command"
                  className="btn-secondary w-full py-4 rounded-full text-center text-label justify-center soft-ui hover:border-mint/40"
                >
                  ACCESS FULL COMMAND CENTRE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
