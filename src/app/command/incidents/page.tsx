'use client'

import { useState } from 'react'
import { CommandNav } from '@/components/command/CommandNav'
import { useAppStore, Incident } from '@/lib/store'
import { ShieldAlert, AlertTriangle, CheckCircle2, Clock, Filter, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CommandIncidentsPage() {
  const { incidents, updateIncidentStatus } = useAppStore()
  const [filter, setFilter] = useState<'all' | 'open' | 'investigating' | 'resolved' | 'false_positive'>('all')
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(incidents[0] || null)

  const filtered = incidents.filter((inc) => {
    if (filter === 'all') return true
    return inc.status === filter
  })

  const handleStatusChange = (status: Incident['status']) => {
    if (selectedIncident) {
      updateIncidentStatus(selectedIncident.id, status)
      setSelectedIncident({ ...selectedIncident, status })
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-16 md:pt-20 pb-20">
      <CommandNav />

      <div className="container-full pt-8">
        <div className="max-w-[1500px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-border-subtle/50">
            <div>
              <div className="flex items-center gap-2 font-mono text-micro text-error mb-1.5">
                <span className="w-2 h-2 rounded-full bg-error animate-ping" />
                <span>INCIDENT TRIAGE & AUDIT LOG</span>
              </div>
              <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
                SAFETY INCIDENT MANAGEMENT.
              </h1>
            </div>

            <div className="font-mono text-micro text-text-muted">
              <span>IMMUTABLE AUDIT TRAIL • NO DELETION PERMITTED</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-micro">
            {(['all', 'open', 'investigating', 'resolved', 'false_positive'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={cn(
                  'px-4 py-2 rounded-sm uppercase transition-all',
                  filter === st
                    ? 'bg-mint text-bg-primary font-bold shadow-mint-glow'
                    : 'bg-bg-surface text-text-secondary hover:text-text-primary border border-border-subtle'
                )}
              >
                {st.replace('_', ' ')} (
                {st === 'all' ? incidents.length : incidents.filter((i) => i.status === st).length}
                )
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Incident List */}
            <div className="lg:col-span-7 space-y-4">
              {filtered.map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className={cn(
                    'p-6 rounded-xl cursor-pointer border transition-all space-y-3',
                    selectedIncident?.id === inc.id
                      ? 'bg-bg-surface border-mint shadow-[0_0_20px_rgba(162,189,134,0.12)]'
                      : 'bg-bg-surface/60 border-border-subtle hover:border-[#38433B]'
                  )}
                >
                  <div className="flex items-center justify-between font-mono text-micro">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-mint">{inc.id}</span>
                      <span className="text-text-muted">TRIP: {inc.tripId}</span>
                    </div>

                    <span
                      className={cn(
                        'px-2.5 py-0.5 rounded-sm uppercase text-[10px] font-bold',
                        inc.status === 'open'
                          ? 'bg-error text-white'
                          : inc.status === 'investigating'
                          ? 'bg-warning/20 text-warning border border-warning/40'
                          : inc.status === 'resolved'
                          ? 'bg-mint-subtle text-mint border border-mint/20'
                          : 'bg-bg-elevated text-text-muted'
                      )}
                    >
                      {inc.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="font-display font-semibold text-text-primary text-body">
                    {inc.vehiclePlate} • Driver: {inc.driverName}
                  </div>

                  <p className="text-body-sm text-text-secondary leading-relaxed">
                    {inc.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-text-muted border-t border-border-subtle/50">
                    <span>RECORDED: {inc.timestamp}</span>
                    <span className="uppercase">TYPE: {inc.type.replace('_', ' ')}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Incident Triage Action Panel */}
            <div className="lg:col-span-5 p-6 md:p-8 rounded-xl bg-bg-surface border border-border-subtle shadow-xl sticky top-36">
              {selectedIncident ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-border-subtle font-mono text-micro">
                    <span className="text-mint font-bold uppercase">TRIAGE WORKFLOW</span>
                    <span className="text-text-muted">{selectedIncident.id}</span>
                  </div>

                  <div className="space-y-3 font-mono text-body-sm">
                    <div>
                      <span className="text-text-muted block text-micro uppercase">VEHICLE INVOLVED</span>
                      <span className="text-text-primary font-bold text-body">{selectedIncident.vehiclePlate}</span>
                    </div>
                    <div>
                      <span className="text-text-muted block text-micro uppercase">ASSIGNED DRIVER</span>
                      <span className="text-text-primary">{selectedIncident.driverName}</span>
                    </div>
                    <div>
                      <span className="text-text-muted block text-micro uppercase">TELEMETRY DESCRIPTION</span>
                      <span className="text-text-secondary text-body-sm">{selectedIncident.description}</span>
                    </div>
                  </div>

                  {/* Status Transition Buttons */}
                  <div className="pt-4 border-t border-border-subtle space-y-3">
                    <div className="font-mono text-micro text-text-muted uppercase">
                      Update Incident Status
                    </div>

                    <div className="grid grid-cols-2 gap-2 font-mono text-micro">
                      <button
                        onClick={() => handleStatusChange('acknowledged')}
                        className={cn(
                          'p-2.5 rounded-sm border transition-all text-center',
                          selectedIncident.status === 'acknowledged'
                            ? 'bg-warning text-bg-primary font-bold'
                            : 'bg-bg-elevated border-border-subtle hover:bg-warning/20'
                        )}
                      >
                        ACKNOWLEDGE
                      </button>

                      <button
                        onClick={() => handleStatusChange('investigating')}
                        className={cn(
                          'p-2.5 rounded-sm border transition-all text-center',
                          selectedIncident.status === 'investigating'
                            ? 'bg-mint text-bg-primary font-bold'
                            : 'bg-bg-elevated border-border-subtle hover:bg-mint-subtle'
                        )}
                      >
                        INVESTIGATING
                      </button>

                      <button
                        onClick={() => handleStatusChange('resolved')}
                        className={cn(
                          'p-2.5 rounded-sm border transition-all text-center',
                          selectedIncident.status === 'resolved'
                            ? 'bg-mint text-bg-primary font-bold'
                            : 'bg-bg-elevated border-border-subtle hover:bg-mint-subtle'
                        )}
                      >
                        RESOLVED
                      </button>

                      <button
                        onClick={() => handleStatusChange('false_positive')}
                        className={cn(
                          'p-2.5 rounded-sm border transition-all text-center',
                          selectedIncident.status === 'false_positive'
                            ? 'bg-text-secondary text-bg-primary font-bold'
                            : 'bg-bg-elevated border-border-subtle hover:bg-bg-surface'
                        )}
                      >
                        FALSE POSITIVE
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-md bg-[#0A0D0B] border border-border-subtle font-mono text-[10px] text-text-muted leading-relaxed">
                    Note: Incident updates log supervisor signature, timestamp, and audit hashes in backend compliance ledger.
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-text-muted font-mono text-body-sm">
                  Select an incident from the list to begin triage.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
