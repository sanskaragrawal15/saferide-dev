'use client'

import { CommandNav } from '@/components/command/CommandNav'
import { useAppStore } from '@/lib/store'
import { Cpu, Radio, Battery, Satellite, RefreshCw, ShieldCheck } from 'lucide-react'

export default function CommandDevicesPage() {
  const { devices } = useAppStore()

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
                <span>HARDWARE FLEET INVENTORY</span>
              </div>
              <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
                SPARROW GUARDIAN DEVICES.
              </h1>
            </div>

            <div className="font-mono text-micro text-text-muted">
              <span>FIRMWARE BASELINE: v0.4_ble_guardian</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {devices.map((d) => (
              <div
                key={d.id}
                className="p-6 rounded-xl bg-bg-surface border border-border-subtle flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-border-subtle font-mono text-micro">
                    <span className="text-mint font-bold">{d.id}</span>
                    <span className="px-2 py-0.5 rounded-sm bg-mint-subtle text-mint text-[10px]">
                      {d.bleStatus.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-body-sm mt-4">
                    <div className="flex justify-between">
                      <span className="text-text-muted">ASSIGNED CAB:</span>
                      <span className="text-text-primary font-bold">{d.vehiclePlate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">IMEI NUMBER:</span>
                      <span className="text-text-primary">{d.imei}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">FIRMWARE:</span>
                      <span className="text-mint">{d.firmware}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">BATTERY:</span>
                      <span className="text-mint font-bold">{d.batteryPct}% (Li-ion)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">GNSS LOCK:</span>
                      <span className="text-text-primary">{d.gpsStatus.toUpperCase()} (12 SATS)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">IMU OBSERVATION:</span>
                      <span className="text-text-primary">{d.imuStatus.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">LAST TELEMETRY:</span>
                      <span className="text-text-muted">{d.lastSeen}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-subtle/50 flex items-center justify-between font-mono text-micro">
                  <span className="text-text-muted">ROOFTOP SIGN SYNC: YES</span>
                  <button
                    onClick={() => alert(`Telemetry ping dispatched to ${d.id}`)}
                    className="text-mint hover:underline"
                  >
                    POLL PING →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
