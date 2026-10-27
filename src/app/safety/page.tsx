'use client'

import Link from 'next/link'
import { ShieldCheck, UserCheck, Eye, Users, Lock, PhoneCall, ArrowUpRight } from 'lucide-react'

const safetyPillars = [
  {
    icon: UserCheck,
    tag: 'VERIFICATION',
    title: '100% Vetted Captains',
    desc: 'Government photo ID verification, background screening, and active roadworthiness certification before every trip.',
  },
  {
    icon: ShieldCheck,
    tag: 'BOARDING PROTOCOL',
    title: 'Digital PIN Match',
    desc: 'Your 4-digit security PIN verifies both driver and passenger before the vehicle doors unlock, preventing boarding errors.',
  },
  {
    icon: Eye,
    tag: 'CORRIDOR SHIELD',
    title: 'Route Deviation Alert',
    desc: 'Automated telemetry detects unexpected route deviations or prolonged unscheduled halts and triggers operator review.',
  },
  {
    icon: Users,
    tag: 'FAMILY WATCH',
    title: '1-Tap Family Link',
    desc: 'Share live GPS route tracking with loved ones via WhatsApp or SMS. Zero app download required for family to watch over you.',
  },
  {
    icon: PhoneCall,
    tag: 'RAPID ESCALATION',
    title: 'Deliberate SOS Support',
    desc: 'Dedicated 3-second hold SOS button dispatches instant vehicle coordinates and alerts trusted emergency contacts.',
  },
  {
    icon: Lock,
    tag: 'DATA ETHICS',
    title: 'Encrypted & Private',
    desc: 'Your travel history and personal details are encrypted at rest and in transit. Never sold or shared for commercial ads.',
  },
]

export default function SafetyPage() {
  return (
    <div className="bg-[#060806] text-[#F5F8F2] pt-28 md:pt-36 pb-24">
      {/* Header */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <div className="max-w-3xl">
          <div className="ios-glass-pill mb-6 cursor-default">
            <span className="ios-glass-dot" />
            <span className="text-[10px] font-mono font-medium tracking-[0.24em] text-[#EAF2E6] uppercase">
              SAFETY / HUMAN-FIRST PROTECTION
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold uppercase tracking-tight text-white leading-[1.02] mb-6">
            SAFETY IS NOT A FEATURE.<br />
            <span className="text-mint">IT IS OUR FOUNDATION.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#B0BDB0] font-body leading-relaxed max-w-2xl">
            Engineered with a singular mission: ensuring women, solo commuters, and families travel with complete peace of mind across India.
          </p>
        </div>
      </section>

      {/* Safety Pillars Grid */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {safetyPillars.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="ios-glass-card p-8 md:p-10 flex flex-col justify-between group cursor-default min-h-[260px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl ios-glass-pill !p-0 flex items-center justify-center text-mint group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-mint" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-[0.2em] text-[#A2BD86] uppercase font-semibold">
                      {p.tag}
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-xl text-white uppercase tracking-tight mb-3">
                    {p.title}
                  </h2>
                  <p className="text-sm text-[#B0BDB0] font-body leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#7D8F7B] tracking-wider uppercase">
                  <span>STANDARD</span>
                  <span className="text-mint font-medium">100% MANDATORY</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Reassurance Banner */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-24">
        <div className="ios-glass-card p-8 md:p-14">
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono tracking-[0.24em] text-mint uppercase font-semibold block mb-3">
              ZERO TOLERANCE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold uppercase tracking-tight text-white mb-6">
              VERIFIED RIDES. CONFIDENT ARRIVALS.
            </h2>
            <p className="text-sm md:text-base text-[#B0BDB0] font-body leading-relaxed mb-8">
              Every driver operating under SafeRide undergoes identity checks and strict conduct protocols.
              Our automated corridor radar monitors every active journey from the moment you step in until you safely enter your destination.
            </p>
            <div className="flex flex-wrap gap-6 text-[11px] font-mono text-[#A2BD86] tracking-wider uppercase">
              <span>• VERIFIED DRIVER IDENTIFIERS</span>
              <span>• CONTINUOUS ROUTE TELEMETRY</span>
              <span>• RAPID ESCALATION PROTOCOL</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
        <div className="ios-glass-card p-10 md:p-14 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold uppercase tracking-tight text-white mb-4">
            TRAVEL WITH PEACE OF MIND
          </h2>
          <p className="text-base text-[#B0BDB0] font-body max-w-lg mb-8 leading-relaxed">
            Join the priority waitlist for early access to SafeRide when service begins in your area.
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
