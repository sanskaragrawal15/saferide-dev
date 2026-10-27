import Link from 'next/link'
import { Shield, Lock } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="bg-bg-primary text-text-primary pt-24 md:pt-32 pb-20">
      <div className="container-full">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center gap-2 font-mono text-micro text-mint mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-mint" />
            <span>DATA ETHICS & TRANSPARENCY</span>
          </div>

          <h1 className="text-display-md md:text-display-lg font-display uppercase tracking-tight text-text-primary mb-8">
            PRIVACY POLICY.
          </h1>

          <div className="space-y-8 text-body text-text-secondary leading-relaxed font-sans">
            <section className="p-6 rounded-xl bg-bg-surface border border-border-subtle space-y-3">
              <h2 className="font-display text-headline uppercase text-text-primary">
                1. LOCATION DATA USE
              </h2>
              <p>
                SafeRide processes high-frequency GPS telemetry only during active passenger journeys and verified driver shifts. Location points are used strictly for route navigation, safety corridor verification, and emergency SOS resolution. We do not monetize, broker, or sell geolocation records to third-party ad networks.
              </p>
            </section>

            <section className="p-6 rounded-xl bg-bg-surface border border-border-subtle space-y-3">
              <h2 className="font-display text-headline uppercase text-text-primary">
                2. HARDWARE SENSOR RETENTION
              </h2>
              <p>
                The SafeRide vehicle safety unit records motion acceleration vectors and acoustic decibel thresholds at the edge. Raw audio is never recorded or stored; only sudden sound intensity changes are evaluated locally to detect severe impact or emergency events.
              </p>
            </section>

            <section className="p-6 rounded-xl bg-bg-surface border border-border-subtle space-y-3">
              <h2 className="font-display text-headline uppercase text-text-primary">
                3. ENCRYPTION AT REST & TRANSIT
              </h2>
              <p>
                All communications between passenger devices, commercial cab hardware, and SafeRide servers are secured using TLS 1.3 encryption with AES-256 standards. Incident audit trails are sealed cryptographically to ensure complete evidentiary integrity.
              </p>
            </section>

            <section className="p-6 rounded-xl bg-bg-surface border border-border-subtle space-y-3">
              <h2 className="font-display text-headline uppercase text-text-primary">
                4. USER RIGHTS
              </h2>
              <p>
                Passengers and drivers may request an export or permanent purge of their personal account information and completed trip logs at any time by contacting privacy@saferide.app.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
