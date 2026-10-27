'use client'

import Link from 'next/link'
import { ArrowUpRight, ShieldCheck, HeartHandshake, Eye, Sparkles } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="bg-bg-primary text-text-primary pt-24 md:pt-32 pb-20">
      {/* Editorial Header */}
      <section className="container-full mb-20 md:mb-28">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex items-center gap-2 font-mono text-micro text-mint mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-mint" />
            <span>OUR MISSION</span>
          </div>

          <h1 className="text-display-lg md:text-display-xl font-display uppercase tracking-tight text-text-primary leading-[0.92] mb-8">
            MOBILITY SHOULD BE
            <br />
            <span className="text-mint">INTENTIONAL & SAFE.</span>
          </h1>

          <p className="text-body-lg text-text-secondary max-w-3xl leading-relaxed">
            SafeRide was created around a simple conviction: the technology inside a commercial cab should
            protect everyone inside it, without friction, without surveillance excess, and without empty promises.
          </p>
        </div>
      </section>

      {/* Editorial Philosophy Statement */}
      <section className="container-full mb-28">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary leading-tight">
              WHY WE COMBINE CUSTOM HARDWARE WITH INTUITIVE SOFTWARE.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-body-lg text-text-secondary leading-relaxed">
            <p>
              In modern cities, ride-hailing services often operate on pure software abstractions. Phones overheat,
              batteries die, and cellular networks drop in basements and highway tunnels. When safety is treated solely
              as a digital app button, the moments of greatest vulnerability are left unprotected.
            </p>
            <p>
              By integrating the <span className="text-text-primary font-semibold">SafeRide Vehicle Guardian Unit</span> and mounting our signature
              illuminated rooftop sign on every commercial cab, SafeRide creates tangible proof of accountability.
              The vehicle itself becomes an active guardian of the journey.
            </p>
            <p>
              We believe in honest capabilities. We do not claim AI that predicts every hazard or automated rescue without human verification.
              Instead, we provide clear telemetry, dependable hardware, deliberate emergency workflows, and 24/7 human fleet oversight.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="container-full mb-28">
        <div className="max-w-[1380px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="w-12 h-12 rounded-lg bg-bg-elevated border border-border-subtle flex items-center justify-center text-mint mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-headline uppercase text-text-primary mb-3">
                HUMAN-FIRST SAFETY
              </h3>
              <p className="text-body-sm text-text-secondary leading-relaxed">
                Technology serves to support human dignity, trust, and well-being. Every alert connects to real people who care about the outcome.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="w-12 h-12 rounded-lg bg-bg-elevated border border-border-subtle flex items-center justify-center text-mint mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display text-headline uppercase text-text-primary mb-3">
                RADICAL TRANSPARENCY
              </h3>
              <p className="text-body-sm text-text-secondary leading-relaxed">
                Clear pricing, honest hardware limits, open telemetry formats, and respect for passenger location privacy at all times.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="w-12 h-12 rounded-lg bg-bg-elevated border border-border-subtle flex items-center justify-center text-mint mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display text-headline uppercase text-text-primary mb-3">
                CRAFT & ENDURANCE
              </h3>
              <p className="text-body-sm text-text-secondary leading-relaxed">
                From aerodynamic physical rooftop pods to responsive digital interfaces, we design products built for real automotive conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-full">
        <div className="max-w-[1380px] mx-auto text-center">
          <h2 className="text-display-md font-display uppercase tracking-tight text-text-primary mb-4">
            JOIN US ON THE ROAD.
          </h2>
          <p className="text-body text-text-secondary max-w-md mx-auto mb-8">
            Discover a safer, more intentional way to travel across India.
          </p>
          <Link href="/book" className="btn-primary text-label px-8 py-4 shadow-mint-glow">
            <span>BOOK A RIDE</span>
            <ArrowUpRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
