'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CalendarCheck, ShieldCheck, Navigation, HeartHandshake } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const steps = [
    {
      step: '01',
      icon: CalendarCheck,
      title: 'Book Upfront',
      desc: 'Guaranteed flat fares with zero surge surprises, verified route preview, and assigned captain credentials.',
    },
    {
      step: '02',
      icon: ShieldCheck,
      title: 'Verify Before Entry',
      desc: 'Match digital 4-digit PIN and cross-check driver photo badge before the vehicle doors unlock.',
    },
    {
      step: '03',
      icon: Navigation,
      title: 'Live Protection',
      desc: 'Continuous real-time telemetry tracking, corridor geofencing, and immediate 1-tap SOS escalations.',
    },
    {
      step: '04',
      icon: HeartHandshake,
      title: 'Safe Arrival',
      desc: 'Automatic encrypted arrival confirmation dispatched to your family members upon destination arrival.',
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-bg-secondary border-b border-border-subtle/30 relative overflow-hidden" id="how-it-works">
      <div className="container-full relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          
          {/* Header with Smooth Scroll Trigger */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-border-subtle/30">
            <div>
              {/* Apple VisionOS / iOS Liquid Glass Pill */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="ios-glass-pill mb-4 cursor-default"
              >
                <span className="ios-glass-dot" />
                <span className="text-[10px] font-mono font-medium tracking-[0.24em] text-[#EAF2E6] uppercase">
                  02 / PROTOCOL
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-extrabold uppercase tracking-tight text-white leading-[1.05] text-3xl sm:text-4xl lg:text-5xl"
              >
                SIMPLE. VERIFIED. SAFE.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-body text-[#B0BDB0] font-body max-w-sm leading-relaxed text-base"
            >
              Four steps from reservation to your doorstep.
            </motion.p>
          </div>

          {/* 4 Steps - Liquid Glass Cards with Staggered Scroll Animation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((s) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.step}
                  variants={cardVariants}
                  whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.3, ease: 'easeOut' } }}
                  className="ios-glass-card p-7 flex flex-col justify-between relative group min-h-[260px] cursor-default"
                >
                  <div className="absolute -top-3 -right-2 font-display text-[4.5rem] font-bold text-stroke-subtle select-none pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity">
                    {s.step}
                  </div>
                  <div>
                    <div className="w-11 h-11 rounded-2xl ios-glass-pill !p-0 flex items-center justify-center text-mint mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-mint" />
                    </div>
                    <span className="text-[9.5px] font-mono tracking-[0.2em] text-[#A2BD86] uppercase font-semibold block mb-2">
                      STEP {s.step}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-white uppercase tracking-tight mb-2.5">
                      {s.title}
                    </h3>
                    <p className="text-sm text-[#B0BDB0] font-body leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-[#7D8F7B] tracking-widest uppercase">
                    <span>STATUS</span>
                    <span className="text-white/60">ACTIVE PROTOCOL</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
