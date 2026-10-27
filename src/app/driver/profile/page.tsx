'use client'

import Link from 'next/link'
import { ArrowLeft, User, Award, ShieldCheck, FileCheck } from 'lucide-react'

export default function DriverProfilePage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 md:pt-28 pb-16">
      <div className="container-full">
        <div className="max-w-[1000px] mx-auto">
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
              <span>COMMERCIAL DRIVER ACCREDITATION</span>
            </div>
            <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
              DRIVER CREDENTIALS.
            </h1>
          </div>

          <div className="p-8 md:p-10 rounded-xl bg-bg-surface border border-border-subtle space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-border-subtle">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-mint/20 border border-mint/40 flex items-center justify-center font-display text-display-sm font-bold text-mint">
                  RS
                </div>
                <div>
                  <h2 className="text-display-sm font-display text-text-primary uppercase">
                    Rajesh Singh
                  </h2>
                  <div className="font-mono text-micro text-text-muted">
                    SafeRide Certified Partner • Driver ID: DRV-DEL-8921
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint-subtle border border-mint/20 font-mono text-micro text-mint">
                <ShieldCheck className="w-4 h-4" />
                <span>POLICE BACKGROUND CLEARED</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-body-sm">
              <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle">
                <div className="text-micro text-text-muted mb-1">COMMERCIAL DRIVING LICENSE</div>
                <div className="text-text-primary font-bold">DL-0420110098231 (LMV-TR)</div>
                <div className="text-micro text-mint mt-1">Valid till March 2029</div>
              </div>

              <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle">
                <div className="text-micro text-text-muted mb-1">SAFERIDE SAFETY CERTIFICATION</div>
                <div className="text-text-primary font-bold">CERTIFIED SAFETY PILOT</div>
                <div className="text-micro text-mint mt-1">Completed Annual Refresher</div>
              </div>

              <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle">
                <div className="text-micro text-text-muted mb-1">REGISTERED VEHICLE</div>
                <div className="text-text-primary font-bold">DL 01 AB 4829 (Black Dzire)</div>
                <div className="text-micro text-text-muted mt-1">Vehicle Safety Unit Paired</div>
              </div>

              <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle">
                <div className="text-micro text-text-muted mb-1">LIFETIME SERVICE SCORE</div>
                <div className="text-mint font-bold">4.96 ★ (1,480 TRIPS)</div>
                <div className="text-micro text-text-muted mt-1">Zero at-fault incident flags</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
