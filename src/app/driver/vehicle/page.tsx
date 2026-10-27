'use client'

import Link from 'next/link'
import { ArrowLeft, Car, Cpu, Radio, ShieldCheck, Battery, Zap } from 'lucide-react'

export default function DriverVehiclePage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 md:pt-28 pb-16">
      <div className="container-full">
        <div className="max-w-[1200px] mx-auto">
          {/* Back */}
          <div className="mb-6">
            <Link
              href="/driver"
              className="inline-flex items-center gap-2 text-micro font-mono text-text-muted hover:text-mint transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO DRIVER CONSOLE</span>
            </Link>
          </div>

          <div className="pb-8 mb-8 border-b border-border-subtle/50">
            <div className="flex items-center gap-2 font-mono text-micro text-mint mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint" />
              <span>COMMERCIAL VEHICLE & HARDWARE STATUS</span>
            </div>
            <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
              VEHICLE & GUARDIAN HARDWARE.
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Vehicle Specifications */}
            <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border-subtle">
                <Car className="w-5 h-5 text-mint" />
                <h3 className="font-display text-headline uppercase text-text-primary">
                  COMMERCIAL CAB SPECS
                </h3>
              </div>

              <div className="space-y-4 font-mono text-body-sm">
                <div className="flex justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-muted">REGISTRATION NUMBER:</span>
                  <span className="text-mint font-bold">DL 01 AB 4829</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-muted">VEHICLE MODEL:</span>
                  <span className="text-text-primary">Maruti Suzuki Dzire Tour (Black)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-muted">COMMERCIAL PERMIT:</span>
                  <span className="text-text-primary">All-India Tourist Permit (Valid 2028)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-muted">FITNESS CERTIFICATE:</span>
                  <span className="text-mint">VERIFIED ACTIVE</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-muted">ROOFTOP SIGN:</span>
                  <span className="text-mint font-bold">POWERED BY SAFERIDE (#A2BD86 ILLUMINATED)</span>
                </div>
              </div>
            </div>

            {/* Right: Sparrow Guardian Hardware Unit */}
            <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border-subtle">
                <Cpu className="w-5 h-5 text-mint" />
                <h3 className="font-display text-headline uppercase text-text-primary">
                  SPARROW GUARDIAN v0.4
                </h3>
              </div>

              <div className="space-y-4 font-mono text-body-sm">
                <div className="flex justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-muted">HARDWARE IDENTIFIER:</span>
                  <span className="text-text-primary font-bold">SPARROW-04-A9</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-muted">FIRMWARE BUILD:</span>
                  <span className="text-mint">v0.4_ble_guardian (OTA Ready)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-muted">BLE LINK STATUS:</span>
                  <span className="text-mint">PAIRED & AUTHENTICATED</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-muted">BACKUP BATTERY:</span>
                  <span className="text-mint font-bold">98% (4.18V DC)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-muted">GPS FIX:</span>
                  <span className="text-text-primary">12 SATELLITES LOCKED</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle/50">
                  <span className="text-text-muted">MOTION SENSOR:</span>
                  <span className="text-text-primary">CALIBRATED & ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
