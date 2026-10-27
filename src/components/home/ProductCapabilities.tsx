'use client'

import Link from 'next/link'
import { ShieldCheck, HeartHandshake, Eye, PhoneCall, ArrowUpRight } from 'lucide-react'

const safetyPillars = [
  {
    title: "Women's Safety & Late-Night Shield",
    tag: 'DEDICATED PROTECTION',
    span: 'md:col-span-8',
    description:
      'Engineered specifically to protect women traveling alone at night. Strict corridor adherence, automated anomaly detection, and prompt emergency escalations provide absolute travel confidence.',
    link: '#waitlist',
    linkText: 'JOIN EARLY ACCESS',
    icon: ShieldCheck,
    badge: 'ZERO TOLERANCE',
    highlights: ['Automated detour alerts', 'Immediate check-in if vehicle stops unexpectedly', 'Discreet, one-touch emergency trigger'],
  },
  {
    title: '100% Vetted Drivers',
    tag: 'TRUST & VERIFICATION',
    span: 'md:col-span-4',
    description:
      'Rigorous background scrutiny, police verification, and thorough onboarding assessments. Only verified drivers operate on the SafeRide network.',
    link: '#waitlist',
    linkText: 'LEARN PROTOCOLS',
    icon: HeartHandshake,
    badge: 'BACKGROUND VERIFIED',
    highlights: ['Two-way PIN check before entry', 'Zero-tolerance conduct standard', 'Regular biometric re-authentication'],
  },
  {
    title: '1-Tap Family Guardian',
    tag: 'FAMILY ASSURANCE',
    span: 'md:col-span-4',
    description:
      'Share your real-time journey link with parents, partners, or friends over WhatsApp or SMS. Your loved ones can watch your vehicle move live without needing any app.',
    link: '#waitlist',
    linkText: 'FAMILY PROTECTION',
    icon: Eye,
    badge: 'LIVE SHARING',
    highlights: ['Browser-based live map link', 'Instant arrival notification sent to contacts', 'Continuous trip status visibility'],
  },
  {
    title: '24/7 Safety Rapid Support',
    tag: 'ROUND-THE-CLOCK CARE',
    span: 'md:col-span-8',
    description:
      'A dedicated 24/7 safety team always on standby. When an unexpected event or emergency SOS is triggered, trained safety coordinators respond within seconds to ensure passenger protection.',
    link: '#waitlist',
    linkText: 'SAFETY STANDARDS',
    icon: PhoneCall,
    badge: '24/7 ACTIVE RESPONSE',
    highlights: ['Immediate contact response', 'Coordination with local emergency services', 'Every ride audited for passenger safety'],
  },
]

export function ProductCapabilities() {
  return (
    <section className="py-24 md:py-36 bg-bg-secondary border-b border-border-subtle/40 relative overflow-hidden" id="safety-pillars">
      {/* Subtle Ambient Mesh Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(162,189,134,0.035)_0%,transparent_70%)] blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 halftone-pattern opacity-5 pointer-events-none" aria-hidden="true" />

      <div className="container-full relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-border-subtle/40">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full liquid-glass text-micro font-mono text-mint mb-4 border border-mint/20">
                <span className="w-1.5 h-1.5 rounded-full bg-mint shadow-[0_0_6px_#A2BD86]" />
                <span className="tracking-[0.2em]">03 / SAFETY PILLARS</span>
              </div>
              <h2 className="font-heading font-extrabold uppercase tracking-tight text-white leading-[0.95] text-3xl sm:text-5xl lg:text-6xl">
                BUILT FOR PEACE OF MIND.
              </h2>
            </div>
            <p className="text-body text-[#B0BDB0] font-body max-w-md leading-relaxed text-base">
              Every feature of SafeRide is built around passenger protection, women’s travel comfort, and family assurance across Indian cities.
            </p>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {safetyPillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className={`bento-card rounded-2xl md:rounded-3xl p-8 md:p-10 flex flex-col justify-between group relative overflow-hidden ${pillar.span}`}
                >
                  <div>
                    {/* Top Tag & Stats */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-subtle/40">
                      <span className="font-mono text-micro text-mint liquid-glass px-3 py-1 rounded-full border border-mint/20">
                        {pillar.tag}
                      </span>
                      <span className="font-mono text-micro text-[#A2BD86] font-semibold tracking-wider">
                        {pillar.badge}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#445B42]/25 border border-mint/30 flex items-center justify-center text-mint group-hover:bg-mint group-hover:text-bg-primary transition-all duration-normal">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-xl md:text-2xl text-white uppercase tracking-tight">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-sm md:text-base text-[#B0BDB0] font-body leading-relaxed mb-8">
                      {pillar.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-3 mb-8">
                      {pillar.highlights.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-[#A0ACA0] font-body">
                          <span className="w-1.5 h-1.5 rounded-full bg-mint shadow-[0_0_4px_#A2BD86] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-border-subtle/40">
                    <Link
                      href={pillar.link}
                      className="inline-flex items-center gap-2 font-mono text-xs text-white group-hover:text-mint transition-colors tracking-wider uppercase font-semibold"
                    >
                      <span>{pillar.linkText}</span>
                      <ArrowUpRight className="w-4 h-4 text-mint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
