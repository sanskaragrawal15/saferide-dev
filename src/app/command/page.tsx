'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CommandNav } from '@/components/command/CommandNav'
import { useAppStore } from '@/lib/store'
import { Car, Navigation, ShieldAlert, Cpu, Users, Radio, ArrowUpRight, Search, CheckCircle2, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CommandOverview() {
  const { trips, incidents, devices, activeTrip } = useAppStore()

  const openIncidents = incidents.filter((i) => i.status === 'open' || i.status === 'investigating')
  const onlineDevices = devices.filter((d) => d.bleStatus === 'connected')

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-16 md:pt-20 pb-20">
      <CommandNav />

      <div className="container-full pt-8">
        {/* Top Header */}
        <div className="max-w-[1500px] mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle/50 pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-micro text-mint mb-1.5">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              <span>FLEET OPERATIONS CONTROL • NCR REGION</span>
            </div>
            <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
              COMMAND CENTRE OVERVIEW.
            </h1>
          </div>

          <div className="flex items-center gap-4 font-mono text-micro">
            <span className="px-3 py-1.5 rounded-sm bg-mint-subtle text-mint border border-mint/20">
              DEMO DATASET ACTIVE
            </span>
            <span className="text-text-muted flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>LAST REFRESH: 1s AGO</span>
            </span>
          </div>
        </div>

        {/* 5 Operational KPI Cards */}
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-8 font-mono text-micro">
          {/* Card 1: Active Trips */}
          <div className="p-5 rounded-xl bg-bg-surface border border-border-subtle">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span>ACTIVE TRIPS</span>
              <Navigation className="w-4 h-4 text-mint" />
            </div>
            <div className="text-display-sm font-display text-text-primary font-bold">
              {trips.filter((t) => t.status !== 'completed').length || 1}
            </div>
            <div className="text-[10px] text-text-muted mt-2">Corridor tracking active</div>
          </div>

          {/* Card 2: Online Vehicles */}
          <div className="p-5 rounded-xl bg-bg-surface border border-border-subtle">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span>ONLINE CABS</span>
              <Car className="w-4 h-4 text-mint" />
            </div>
            <div className="text-display-sm font-display text-mint font-bold">38</div>
            <div className="text-[10px] text-text-muted mt-2">92% shift target</div>
          </div>

          {/* Card 3: Connected IoT */}
          <div className="p-5 rounded-xl bg-bg-surface border border-border-subtle">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span>VEHICLE SAFETY UNITS</span>
              <Cpu className="w-4 h-4 text-mint" />
            </div>
            <div className="text-display-sm font-display text-text-primary font-bold">
              {onlineDevices.length}/{devices.length}
            </div>
            <div className="text-[10px] text-text-muted mt-2">SafeRide Connected BLE</div>
          </div>

          {/* Card 4: Open Incidents */}
          <div className="p-5 rounded-xl bg-bg-surface border border-border-subtle">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span>OPEN INCIDENTS</span>
              <ShieldAlert className="w-4 h-4 text-error" />
            </div>
            <div className="text-display-sm font-display text-error font-bold">
              {openIncidents.length}
            </div>
            <div className="text-[10px] text-error mt-2">
              {openIncidents.length > 0 ? 'Requires attention' : 'All queues clear'}
            </div>
          </div>

          {/* Card 5: Driver Shift Availability */}
          <div className="p-5 rounded-xl bg-bg-surface border border-border-subtle col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span>DRIVERS ON DUTY</span>
              <Users className="w-4 h-4 text-mint" />
            </div>
            <div className="text-display-sm font-display text-mint font-bold">42</div>
            <div className="text-[10px] text-text-muted mt-2">Avg rating 4.94 ★</div>
          </div>
        </div>

        {/* Main Central Operations Grid: Vector Fleet Map + Live Incident Triage */}
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Left Column: Interactive Vector Operations Map */}
          <div className="lg:col-span-8 rounded-xl bg-[#060807] border border-border-subtle p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #272D28 1px, transparent 1px), linear-gradient(to bottom, #272D28 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />

            {/* Top Toolbar inside Map */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-border-subtle/40 font-mono text-micro">
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-mint animate-pulse" />
                <span className="text-text-primary font-bold">DELHI-NCR URBAN CORRIDOR RADAR</span>
              </div>
              <div className="flex items-center gap-4 text-text-muted">
                <span>COVERAGE: 180 KM²</span>
                <span className="text-border-subtle">|</span>
                <span className="text-mint">38 ACTIVE VEHICLES</span>
              </div>
            </div>

            {/* Vector Map Canvas */}
            <div className="relative aspect-[16/10] w-full flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500" fill="none">
                {/* Arterial Corridors */}
                <path d="M 50 250 L 750 250" stroke="#161E19" strokeWidth="6" />
                <path d="M 400 50 L 400 450" stroke="#161E19" strokeWidth="6" />
                <circle cx="400" cy="250" r="160" stroke="#18221B" strokeWidth="2" strokeDasharray="6 6" />

                {/* Highway NH-48 Path */}
                <path
                  d="M 120 420 Q 280 340, 400 250 T 680 90"
                  stroke="#A2BD86"
                  strokeWidth="2.5"
                  strokeDasharray="6 8"
                  className="opacity-70"
                />

                {/* Fleet Commercial Cab Markers */}
                {/* Cab 1 */}
                <g transform="translate(420, 240)">
                  <circle cx="0" cy="0" r="6" fill="#A2BD86" />
                  <circle cx="0" cy="0" r="16" stroke="#A2BD86" strokeWidth="1" className="animate-ping opacity-60" />
                  <text x="12" y="4" fill="#A2BD86" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    DL-01-AB-4829 (42 km/h)
                  </text>
                </g>

                {/* Cab 2 */}
                <g transform="translate(260, 310)">
                  <circle cx="0" cy="0" r="5" fill="#A2BD86" />
                  <text x="10" y="4" fill="#A0AAA2" fontSize="9" fontFamily="monospace">
                    DL-03-CA-9081 (IDLE)
                  </text>
                </g>

                {/* Cab 3 */}
                <g transform="translate(560, 140)">
                  <circle cx="0" cy="0" r="5" fill="#A2BD86" />
                  <text x="10" y="4" fill="#A0AAA2" fontSize="9" fontFamily="monospace">
                    HR-26-CV-3310 (58 km/h)
                  </text>
                </g>

                {/* Cab 4 (Incident Marker) */}
                <g transform="translate(320, 180)">
                  <circle cx="0" cy="0" r="7" fill="#E53E3E" />
                  <circle cx="0" cy="0" r="22" stroke="#E53E3E" strokeWidth="1.5" className="animate-ping" />
                  <text x="14" y="4" fill="#E53E3E" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    DL-04-MK-1108 (DEVIATION ALERT)
                  </text>
                </g>
              </svg>

              {/* Bottom Map Legend */}
              <div className="absolute bottom-4 left-4 right-4 bg-bg-surface/90 backdrop-blur-md p-3.5 rounded-lg border border-border-subtle font-mono text-micro flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-mint" />
                    <span>Active In Transit</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping" />
                    <span>Incident Review</span>
                  </div>
                </div>
                <Link href="/command/trips" className="text-mint hover:underline">
                  VIEW FULLSCREEN RADAR →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Live Incident Triage Queue */}
          <div className="lg:col-span-4 rounded-xl bg-bg-surface border border-border-subtle p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-subtle font-mono text-micro">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-error" />
                  <span className="text-text-primary font-bold uppercase">INCIDENT TRIAGE QUEUE</span>
                </div>
                <span className="text-error font-bold">{openIncidents.length} ACTION REQUIRED</span>
              </div>

              <div className="space-y-4">
                {incidents.map((inc) => (
                  <div
                    key={inc.id}
                    className={cn(
                      'p-4 rounded-lg border transition-all space-y-2',
                      inc.status === 'open'
                        ? 'bg-error/10 border-error/40'
                        : 'bg-bg-elevated border-border-subtle'
                    )}
                  >
                    <div className="flex items-center justify-between font-mono text-micro">
                      <span className="font-bold text-text-primary">{inc.id}</span>
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded-sm uppercase text-[9px] font-bold',
                          inc.severity === 'critical'
                            ? 'bg-error text-white'
                            : inc.severity === 'medium'
                            ? 'bg-warning/20 text-warning'
                            : 'bg-mint-subtle text-mint'
                        )}
                      >
                        {inc.severity}
                      </span>
                    </div>

                    <div className="font-mono text-micro text-mint font-semibold">
                      {inc.vehiclePlate} • {inc.driverName}
                    </div>

                    <p className="text-body-sm text-text-secondary leading-snug">
                      {inc.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-text-muted border-t border-border-subtle/50">
                      <span>{inc.timestamp}</span>
                      <Link href="/command/incidents" className="text-mint hover:underline font-bold">
                        INVESTIGATE →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border-subtle">
              <Link
                href="/command/incidents"
                className="btn-secondary w-full py-3 text-label justify-center text-center font-mono"
              >
                OPEN INCIDENT MANAGEMENT
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Fleet Table Preview */}
        <div className="max-w-[1500px] mx-auto rounded-xl bg-bg-surface border border-border-subtle p-6 md:p-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-subtle font-mono text-micro">
            <span className="text-text-primary font-bold uppercase">Active Vehicle Stream</span>
            <Link href="/command/vehicles" className="text-mint hover:underline">
              MANAGE ALL VEHICLES →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-micro">
              <thead className="bg-bg-elevated text-text-muted border-b border-border-subtle uppercase">
                <tr>
                  <th className="p-3.5">Registration</th>
                  <th className="p-3.5">Assigned Driver</th>
                  <th className="p-3.5">Guardian Device</th>
                  <th className="p-3.5">Battery</th>
                  <th className="p-3.5">GPS Fix</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-text-primary">
                {devices.map((d) => (
                  <tr key={d.id} className="hover:bg-bg-elevated/50 transition-colors">
                    <td className="p-3.5 font-bold text-mint">{d.vehiclePlate}</td>
                    <td className="p-3.5">Rajesh S.</td>
                    <td className="p-3.5">{d.id}</td>
                    <td className="p-3.5">{d.batteryPct}%</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-sm bg-mint-subtle text-mint text-[10px]">
                        {d.gpsStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="text-text-primary">{d.bleStatus.toUpperCase()}</span>
                    </td>
                    <td className="p-3.5 text-right">
                      <Link href="/command/devices" className="text-mint hover:underline">
                        TELEMETRY →
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
  )
}
