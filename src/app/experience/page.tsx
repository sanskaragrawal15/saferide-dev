'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarCheck, ShieldCheck, Navigation, HeartHandshake, CheckCircle2, Lock, ArrowUpRight } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: CalendarCheck,
    title: 'Upfront Verified Booking',
    desc: 'Transparent pricing with guaranteed flat fares and zero surge surprises. View your assigned driver credentials and vehicle license plate before stepping out.',
    tag: 'PRE-TRIP PROTOCOL',
  },
  {
    step: '02',
    icon: ShieldCheck,
    title: 'Digital PIN Handshake',
    desc: 'Match your 4-digit security PIN and cross-check driver photo ID before the vehicle unlocks. Ensures you never board the wrong cab.',
    tag: 'BOARDING SECURITY',
  },
  {
    step: '03',
    icon: Navigation,
    title: 'Live Protected Corridor',
    desc: 'Continuous real-time route monitoring along designated safe corridors. Immediate detection and automated alerts if the vehicle takes an unplanned detour.',
    tag: 'IN-TRANSIT SHIELD',
  },
  {
    step: '04',
    icon: HeartHandshake,
    title: 'Private Family Arrival',
    desc: 'Share live trip tracking via WhatsApp or SMS with zero app download needed for family. Automatic encrypted confirmation sent when you reach home safely.',
    tag: 'DESTINATION PEACE',
  },
]

const guarantees = [
  {
    title: 'Zero Surge Surprises',
    desc: 'Fixed upfront fares agreed upon before booking. No unexpected fare multipliers during late hours or rain.',
  },
  {
    title: '100% Vetted Drivers',
    desc: 'Government photo ID verification, background checks, and active vehicle roadworthiness certification.',
  },
  {
    title: 'Dedicated Women Safety',
    desc: 'Calibrated late-night transit protocols, prioritized safety dispatch, and instant 1-tap emergency support.',
  },
]

export default function ExperiencePage() {
  return (
    <div className="bg-[#060806] text-[#F5F8F2] pt-28 md:pt-36 pb-24">
      {/* Editorial Header */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <div className="max-w-3xl">
          <div className="ios-glass-pill mb-6 cursor-default">
            <span className="ios-glass-dot" />
            <span className="text-[10px] font-mono font-medium tracking-[0.24em] text-[#EAF2E6] uppercase">
              EXPERIENCE / THE PASSENGER JOURNEY
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold uppercase tracking-tight text-white leading-[1.02] mb-6">
            CONSIDERED MOBILITY.<br />
            <span className="text-mint">FROM CURB TO DOORSTEP.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#B0BDB0] font-body leading-relaxed max-w-2xl">
            A calm, predictable cab experience designed around passenger peace of mind.
            Zero hidden charges, thoroughly screened drivers, and continuous safety oversight on every ride.
          </p>
        </div>
      </section>

      {/* 4-Step Passenger Sequence (Photo-Free Liquid Glass Cards) */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {steps.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.step}
                className="ios-glass-card p-8 md:p-10 flex flex-col justify-between group cursor-default min-h-[280px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl ios-glass-pill !p-0 flex items-center justify-center text-mint group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-mint" />
                    </div>
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#A2BD86] uppercase font-semibold">
                      {s.tag}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-mint tracking-widest uppercase font-semibold block mb-2">
                    STEP {s.step}
                  </span>
                  <h2 className="font-heading font-bold text-2xl text-white uppercase tracking-tight mb-3">
                    {s.title}
                  </h2>
                  <p className="text-sm md:text-base text-[#B0BDB0] font-body leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#7D8F7B] tracking-wider uppercase">
                  <span>SAFETY ASSURANCE</span>
                  <span className="text-white/60">ACTIVE</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 3 Core Guarantees */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="ios-glass-card p-8 md:p-12 lg:p-16">
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] font-mono tracking-[0.24em] text-mint uppercase font-semibold block mb-3">
              PASSENGER ASSURANCE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold uppercase tracking-tight text-white leading-tight">
              COMMITTED TO EVERY JOURNEY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/[0.08]">
            {guarantees.map((g) => (
              <div key={g.title} className="space-y-3">
                <div className="flex items-center gap-2.5 text-mint font-heading font-bold text-lg uppercase tracking-tight">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>{g.title}</span>
                </div>
                <p className="text-sm text-[#B0BDB0] font-body leading-relaxed">
                  {g.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Waitlist CTA */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
        <div className="ios-glass-card p-10 md:p-14 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold uppercase tracking-tight text-white mb-4">
            EXPERIENCE THE SAFERIDE STANDARD
          </h2>
          <p className="text-base text-[#B0BDB0] font-body max-w-lg mb-8 leading-relaxed">
            Be the first to travel with peace of mind when SafeRide launches in your city.
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
