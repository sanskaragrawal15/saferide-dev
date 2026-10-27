'use client'

import { useState } from 'react'
import { CommandNav } from '@/components/command/CommandNav'
import { Settings, ShieldCheck, CheckCircle2 } from 'lucide-react'

export default function CommandSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [deviationThreshold, setDeviationThreshold] = useState('500')
  const [imuThreshold, setImuThreshold] = useState('2.5')
  const [dwellLimit, setDwellLimit] = useState('6')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-16 md:pt-20 pb-20">
      <CommandNav />

      <div className="container-full pt-8">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <div className="pb-8 mb-8 border-b border-border-subtle/50">
            <div className="flex items-center gap-2 font-mono text-micro text-mint mb-1.5">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              <span>SUPERVISOR THRESHOLDS & POLICY</span>
            </div>
            <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
              COMMAND SETTINGS.
            </h1>
          </div>

          <div className="p-8 md:p-10 rounded-xl bg-bg-surface border border-border-subtle">
            {saved && (
              <div className="p-4 mb-6 rounded-md bg-mint-subtle border border-mint/30 text-mint font-mono text-body-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Operator thresholds successfully updated.</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block font-mono text-micro text-text-muted mb-2 uppercase">
                  Route Corridor Deviation Geofence (Meters)
                </label>
                <input
                  type="number"
                  value={deviationThreshold}
                  onChange={(e) => setDeviationThreshold(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                />
                <span className="text-[11px] font-mono text-text-muted block mt-1">
                  Alert is dispatched to supervisor queue when vehicle drifts beyond this distance from mapped corridor.
                </span>
              </div>

              <div>
                <label className="block font-mono text-micro text-text-muted mb-2 uppercase">
                  IMU Sudden Deceleration Alert Trigger (G-Force)
                </label>
                <input
                  type="text"
                  value={imuThreshold}
                  onChange={(e) => setImuThreshold(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                />
                <span className="text-[11px] font-mono text-text-muted block mt-1">
                  Acceleration vectors above this value initiate impact verification protocol.
                </span>
              </div>

              <div>
                <label className="block font-mono text-micro text-text-muted mb-2 uppercase">
                  Unannounced Dwell / Halt Timeout (Minutes)
                </label>
                <input
                  type="number"
                  value={dwellLimit}
                  onChange={(e) => setDwellLimit(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                />
                <span className="text-[11px] font-mono text-text-muted block mt-1">
                  Stationary halts exceeding this duration trigger driver status ping.
                </span>
              </div>

              <div className="pt-6 border-t border-border-subtle/40 flex justify-end">
                <button type="submit" className="btn-primary text-label px-8 py-3.5">
                  SAVE THRESHOLDS
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
