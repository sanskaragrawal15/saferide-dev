'use client'

import { CommandNav } from '@/components/command/CommandNav'
import { BarChart3, TrendingUp, ShieldCheck, Activity } from 'lucide-react'

export default function CommandAnalyticsPage() {
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
                <span>OPERATIONAL METRICS & SAFETY COMPLIANCE</span>
              </div>
              <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
                FLEET ANALYTICS.
              </h1>
            </div>

            <div className="font-mono text-micro text-text-muted">
              <span>REPORTING WINDOW: PAST 30 DAYS (NCR FLEET)</span>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10 font-mono text-micro">
            <div className="p-6 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="text-text-muted mb-2">OVERALL FLEET SAFETY SCORE</div>
              <div className="text-display-sm font-display text-mint font-bold">99.4%</div>
              <div className="text-[10px] text-text-muted mt-2">+0.2% from prior period</div>
            </div>

            <div className="p-6 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="text-text-muted mb-2">CORRIDOR COMPLIANCE</div>
              <div className="text-display-sm font-display text-text-primary font-bold">98.8%</div>
              <div className="text-[10px] text-text-muted mt-2">Designated route fidelity</div>
            </div>

            <div className="p-6 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="text-text-muted mb-2">AVG SOS RESOLUTION TIME</div>
              <div className="text-display-sm font-display text-mint font-bold">42 SEC</div>
              <div className="text-[10px] text-text-muted mt-2">Target &lt; 60 seconds</div>
            </div>

            <div className="p-6 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="text-text-muted mb-2">HARDWARE TELEMETRY UPTIME</div>
              <div className="text-display-sm font-display text-text-primary font-bold">99.98%</div>
              <div className="text-[10px] text-text-muted mt-2">Sparrow Guardian uptime</div>
            </div>
          </div>

          {/* Analytics Detail Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle space-y-4">
              <h3 className="font-display text-headline uppercase text-text-primary">
                INCIDENT BREAKDOWN BY CLASSIFICATION
              </h3>
              <p className="text-body-sm text-text-secondary leading-relaxed">
                Distribution of safety flags triggered across 12,480 completed trips.
              </p>

              <div className="space-y-4 font-mono text-micro pt-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Corridor Route Deviations (Construction / Traffic)</span>
                    <span className="text-mint">64% (Resolved)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-bg-elevated overflow-hidden">
                    <div className="w-[64%] h-full bg-mint" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Acoustic SPL Sensor Spikes (Horns / Ambient Traffic)</span>
                    <span className="text-text-primary">28% (False Positive)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-bg-elevated overflow-hidden">
                    <div className="w-[28%] h-full bg-text-secondary" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Passenger Manual SOS Triggers</span>
                    <span className="text-error">7% (Triage Dispatched)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-bg-elevated overflow-hidden">
                    <div className="w-[7%] h-full bg-error" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>IMU Significant Impact Alerts (&gt;3.0G)</span>
                    <span className="text-mint">1% (Minor Bumper Scrapes)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-bg-elevated overflow-hidden">
                    <div className="w-[1%] h-full bg-mint" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle space-y-4">
              <h3 className="font-display text-headline uppercase text-text-primary">
                CORRIDOR RISK PROFILE RADAR
              </h3>
              <p className="text-body-sm text-text-secondary leading-relaxed">
                Regional transit safety confidence based on active cab sensor density.
              </p>

              <div className="space-y-3 font-mono text-body-sm pt-4">
                <div className="p-3.5 rounded-lg bg-bg-elevated border border-border-subtle flex justify-between items-center">
                  <span>NH-48 AEROCITY TO CYBER HUB</span>
                  <span className="text-mint font-bold text-micro">99.8% HIGH CONFIDENCE</span>
                </div>
                <div className="p-3.5 rounded-lg bg-bg-elevated border border-border-subtle flex justify-between items-center">
                  <span>RING ROAD AIIMS TO CONNAUGHT PLACE</span>
                  <span className="text-mint font-bold text-micro">99.6% HIGH CONFIDENCE</span>
                </div>
                <div className="p-3.5 rounded-lg bg-bg-elevated border border-border-subtle flex justify-between items-center">
                  <span>DND FLYWAY TO NOIDA SECTOR 62</span>
                  <span className="text-mint font-bold text-micro">99.1% HIGH CONFIDENCE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
