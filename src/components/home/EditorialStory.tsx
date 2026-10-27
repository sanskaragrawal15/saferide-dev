'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, Eye, Users, ArrowUpRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const commitments = [
  {
    step: '01',
    category: 'PRE-TRIP VERIFICATION',
    icon: ShieldCheck,
    title: '100% Vetted Drivers',
    desc: 'Rigorous government ID checks, facial recognition matching, and background screening before every single trip.',
  },
  {
    step: '02',
    category: 'TRANSIT CORRIDOR',
    icon: Eye,
    title: 'Route Deviation Alert',
    desc: 'Instant detection and automated safety escalation if a vehicle takes an unplanned detour or makes an unscheduled stop.',
  },
  {
    step: '03',
    category: 'FAMILY TELEMETRY',
    icon: Users,
    title: '1-Tap Family Link',
    desc: 'Share encrypted live ride telemetry directly via WhatsApp or SMS. Zero app download required for family to watch over you.',
  },
]

export function EditorialStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <div ref={sectionRef} className="relative bg-bg-primary overflow-hidden" id="safety-philosophy">
      {/* SECTION 1: SAFETY MISSION */}
      <section className="py-24 md:py-36 border-b border-border-subtle/30 relative z-10">
        <div className="container-full relative z-10">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            
            {/* Liquid Glass Badge Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="ios-glass-pill mb-8 cursor-default"
            >
              <span className="ios-glass-dot" />
              <span className="text-[10px] font-mono font-medium tracking-[0.24em] text-[#EAF2E6] uppercase">
                01 / THE MISSION
              </span>
            </motion.div>

            {/* Main Statement with Smooth Stagger */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-8"
              >
                <h2 className="font-heading font-extrabold uppercase tracking-tight text-white leading-[1.05] text-3xl sm:text-4xl lg:text-5xl">
                  TRAVEL WITHOUT FEAR.<br />
                  <span className="text-mint">ESPECIALLY AT NIGHT.</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-4"
              >
                <p className="text-body text-[#B0BDB0] font-body leading-relaxed text-base md:text-lg">
                  Zero-anxiety mobility engineered for women, solo travelers, and families across India.
                </p>
              </motion.div>
            </div>

            {/* 3 Core Safety Commitments - Liquid Glass Panels with Staggered Scroll Transition */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {commitments.map((c) => {
                const Icon = c.icon
                return (
                  <motion.div
                    key={c.title}
                    variants={itemVariants}
                    whileHover={{ y: -6, scale: 1.012, transition: { duration: 0.3, ease: 'easeOut' } }}
                    className="p-8 rounded-3xl ios-glass-card flex flex-col justify-between group cursor-default"
                  >
                    <div>
                      {/* Top Bar inside card */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-11 h-11 rounded-2xl ios-glass-pill !p-0 flex items-center justify-center text-mint group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-5 h-5 text-mint" />
                        </div>
                        <span className="text-[9.5px] font-mono tracking-[0.2em] text-[#A2BD86] uppercase font-semibold">
                          {c.category}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-xl text-white uppercase tracking-tight mb-3">
                        {c.title}
                      </h3>
                      <p className="text-sm text-[#B0BDB0] font-body leading-relaxed">
                        {c.desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#7D8F7B] tracking-wider uppercase">
                      <span>PROTOCOL {c.step}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#A2BD86] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}
