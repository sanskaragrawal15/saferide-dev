'use client'

import Link from 'next/link'
import { Cpu, Navigation, ShieldCheck, Radio, ArrowUpRight, CheckCircle2 } from 'lucide-react'

const techPillars = [
  {
    icon: Navigation,
    tag: 'ROUTE INTEGRITY',
    title: 'Intelligent Corridor Radar',
    desc: 'Real-time telemetry continuously evaluates vehicle movement against designated safe corridors, detecting route deviations or unscheduled stops within seconds.',
  },
  {
    icon: Cpu,
    tag: 'ONBOARD SENSING',
    title: 'Dedicated Vehicle Safety Core',
    desc: 'Automotive-grade hardware unit inside every cab monitors impact, motion, and trip status independently of passenger phone battery or cellular dropouts.',
  },
  {
    icon: ShieldCheck,
    tag: 'DATA PROTECTION',
    title: 'Zero-Leak Privacy Protocol',
    desc: 'Trip coordinates and passenger data are encrypted end-to-end. Your travel history and destination records are never monetized or shared with third parties.',
  },
  {
    icon: Radio,
    tag: 'OPERATIONS',
    title: '24/7 Command Oversight',
    desc: 'Centralized telemetry dashboard streams vehicle status across regional fleets, enabling rapid supervisor review and direct coordination when assistance is needed.',
  },
]

export default function TechnologyPage() {
  return (
    <div className="bg-[#060806] text-[#F5F8F2] pt-28 md:pt-36 pb-24">
      {/* Header */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <div className="max-w-3xl">
          <div className="ios-glass-pill mb-6 cursor-default">
            <span className="ios-glass-dot" />
            <span className="text-[10px] font-mono font-medium tracking-[0.24em] text-[#EAF2E6] uppercase">
              TECHNOLOGY / CONNECTED ARCHITECTURE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold uppercase tracking-tight text-white leading-[1.02] mb-6">
            PURPOSE-BUILT TECH.<br />
            <span className="text-mint">DESIGNED FOR RELIABILITY.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#B0BDB0] font-body leading-relaxed max-w-2xl">
            Thoughtful hardware and cloud telemetry engineered to work quietly in the background, keeping passengers protected without friction.
          </p>
        </div>
      </section>

      {/* Technology Pillars Grid */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {techPillars.map((tp) => {
            const Icon = tp.icon
            return (
              <div
                key={tp.title}
                className="ios-glass-card p-8 md:p-10 flex flex-col justify-between group cursor-default min-h-[260px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl ios-glass-pill !p-0 flex items-center justify-center text-mint group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-mint" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-[0.2em] text-[#A2BD86] uppercase font-semibold">
                      {tp.tag}
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-2xl text-white uppercase tracking-tight mb-3">
                    {tp.title}
                  </h2>
                  <p className="text-sm md:text-base text-[#B0BDB0] font-body leading-relaxed">
                    {tp.desc}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#7D8F7B] tracking-wider uppercase">
                  <span>SYSTEM STATUS</span>
                  <span className="text-mint font-medium">OPTIMIZED</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-24">
        <div className="ios-glass-card p-8 md:p-14">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] font-mono tracking-[0.24em] text-mint uppercase font-semibold block mb-3">
              CORE PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold uppercase tracking-tight text-white leading-tight">
              SAFETY THROUGH TRANSPARENCY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-mint font-heading font-bold text-base uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Hidden Telemetry</span>
              </div>
              <p className="text-xs text-[#B0BDB0] font-body leading-relaxed">
                Clear passenger indicators for when trip monitoring is active.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-mint font-heading font-bold text-base uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>Network Resilience</span>
              </div>
              <p className="text-xs text-[#B0BDB0] font-body leading-relaxed">
                Hardware buffers route coordinates through tunnels and signal dead zones.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-mint font-heading font-bold text-base uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>Encrypted Verification</span>
              </div>
              <p className="text-xs text-[#B0BDB0] font-body leading-relaxed">
                Cryptographic handshakes match passenger tokens directly to vehicle cabs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
        <div className="ios-glass-card p-10 md:p-14 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold uppercase tracking-tight text-white mb-4">
            EXPERIENCE THE SAFERIDE PLATFORM
          </h2>
          <p className="text-base text-[#B0BDB0] font-body max-w-lg mb-8 leading-relaxed">
            Join the waitlist for priority access to our verified passenger app at launch.
          </p>
          <Link href="/#waitlist" className="btn-ios-glass !px-8 !py-3">
            <span>Join Early Access</span>
            <ArrowUpRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
