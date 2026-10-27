'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, UserCheck, ShieldAlert, Award, ChevronDown, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const fleetCapabilities = [
  {
    icon: LayoutDashboard,
    tag: 'REAL-TIME TELEMETRY',
    title: 'Centralized Fleet Radar',
    desc: 'Monitor active journeys, live vehicle locations, speed, and transit compliance from a single, responsive operations console.',
  },
  {
    icon: UserCheck,
    tag: 'DRIVER MANAGEMENT',
    title: 'Digital Captain Onboarding',
    desc: 'Seamlessly verify driver credentials and pair approved drivers to specific vehicles before shifts with secure digital tokens.',
  },
  {
    icon: ShieldAlert,
    tag: 'INCIDENT PROTOCOL',
    title: 'Automated Safety Alerts',
    desc: 'Immediate supervisor notifications when unexpected route deviations, unscheduled halts, or passenger SOS events occur.',
  },
  {
    icon: Award,
    tag: 'BRAND TRUST',
    title: 'SafeRide Fleet Certification',
    desc: 'Equip your commercial cabs with certified safety protocols, earning greater passenger trust, especially for late-night rides.',
  },
]

const faqs = [
  {
    q: 'How does SafeRide integrate with commercial taxi fleets?',
    a: 'SafeRide equips your commercial vehicles with verified safety hardware and connects your operations team to our centralized Command Centre for real-time monitoring.',
  },
  {
    q: 'Do drivers need specialized mobile hardware?',
    a: 'No. Drivers use the lightweight SafeRide Driver web application on any standard smartphone to receive ride assignments and verify passenger PINs.',
  },
  {
    q: 'Can fleet managers access historical trip safety audits?',
    a: 'Yes. Every completed trip retains an auditable record of route coordinates, driver identification, and safety logs for operational review.',
  },
]

export default function FleetsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="bg-[#060806] text-[#F5F8F2] pt-28 md:pt-36 pb-24">
      {/* Header */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <div className="max-w-3xl">
          <div className="ios-glass-pill mb-6 cursor-default">
            <span className="ios-glass-dot" />
            <span className="text-[10px] font-mono font-medium tracking-[0.24em] text-[#EAF2E6] uppercase">
              FLEETS / COMMERCIAL MOBILITY
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold uppercase tracking-tight text-white leading-[1.02] mb-6">
            EVERY VEHICLE.<br />
            <span className="text-mint">ONE UNIFIED VIEW.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#B0BDB0] font-body leading-relaxed max-w-2xl mb-8">
            Empower your commercial fleet with considered safety technology, verified driver onboarding, and continuous route monitoring.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/command" className="btn-ios-glass !px-7 !py-3">
              <span>Explore Fleet Command</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Fleet Capabilities Grid */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {fleetCapabilities.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="ios-glass-card p-8 md:p-10 flex flex-col justify-between group cursor-default min-h-[260px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl ios-glass-pill !p-0 flex items-center justify-center text-mint group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-mint" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-[0.2em] text-[#A2BD86] uppercase font-semibold">
                      {f.tag}
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-2xl text-white uppercase tracking-tight mb-3">
                    {f.title}
                  </h2>
                  <p className="text-sm md:text-base text-[#B0BDB0] font-body leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#7D8F7B] tracking-wider uppercase">
                  <span>ENTERPRISE FLEETS</span>
                  <span className="text-mint font-medium">AVAILABLE AT LAUNCH</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Operator FAQ */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-24">
        <div className="ios-glass-card p-8 md:p-14">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] font-mono tracking-[0.24em] text-mint uppercase font-semibold block mb-3">
              PARTNER CLARITY
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold uppercase tracking-tight text-white leading-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/[0.08]">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="ios-glass-card !rounded-2xl p-6 cursor-pointer transition-colors"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-heading font-bold text-base md:text-lg text-white">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-mint flex-shrink-0 transition-transform duration-300',
                      openFaq === idx ? 'rotate-180' : ''
                    )}
                  />
                </div>
                {openFaq === idx && (
                  <p className="mt-4 text-sm text-[#B0BDB0] font-body leading-relaxed border-t border-white/[0.06] pt-4">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
        <div className="ios-glass-card p-10 md:p-14 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold uppercase tracking-tight text-white mb-4">
            PARTNER WITH SAFERIDE
          </h2>
          <p className="text-base text-[#B0BDB0] font-body max-w-lg mb-8 leading-relaxed">
            Register your commercial taxi fleet for early onboarding and priority hardware allocation.
          </p>
          <Link href="/contact" className="btn-ios-glass !px-8 !py-3">
            <span>Contact Fleet Partnerships</span>
            <ArrowUpRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
