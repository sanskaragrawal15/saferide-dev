'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { CheckCircle2, Bell, Shield, Zap, Lock } from 'lucide-react'

const perks = [
  {
    icon: Lock,
    title: '100% Privacy Protected',
    desc: 'Encrypted telemetry and zero commercial data sharing.',
  },
  {
    icon: Zap,
    title: 'Priority Launch Access',
    desc: 'First invitations and exclusive introductory safety rates.',
  },
  {
    icon: Shield,
    title: 'Dedicated Women Safety',
    desc: 'Curated night transit protocols and verified captains.',
  },
]

export function ClosingStatement() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-80px' })
  const [contact, setContact] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contact.trim()) return
    setSubmitted(true)
  }

  return (
    <section
      ref={containerRef}
      id="waitlist"
      className="relative py-24 md:py-36 bg-bg-primary overflow-hidden border-b border-border-subtle/30"
    >
      {/* Atmospheric Background Layer with Parallax Depth */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 h-[116%] -top-[8%]">
        <Image
          src="/images/cab-fleet.jpg"
          alt="SafeRide Fleet"
          fill
          className="object-cover object-center opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/95 to-bg-primary" />
      </motion.div>

      <div className="container-full relative z-10">
        <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center px-6">
          
          {/* Liquid Glass Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="ios-glass-pill mb-8 cursor-default"
          >
            <span className="ios-glass-dot" />
            <span className="text-[10px] font-mono font-medium tracking-[0.24em] text-[#EAF2E6] uppercase">
              03 / COMING SOON
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-extrabold uppercase tracking-tight text-white leading-[1.05] mb-6 text-3xl sm:text-4xl lg:text-5xl"
            style={{
              textShadow: '0 4px 30px rgba(0,0,0,0.95)',
            }}
          >
            THE FUTURE OF SAFE MOBILITY.<br />
            <span className="text-mint">COMING SOON.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-[#B0BDB0] max-w-xl mx-auto mb-10 leading-relaxed font-body"
          >
            Join the early access waitlist for priority access when SafeRide launches in your city.
          </motion.p>

          {/* Floating Liquid Glass Waitlist Form Console */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg mb-14 p-2.5 sm:p-3 rounded-full ios-liquid-panel"
          >
            {!submitted ? (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter email or mobile..."
                  className="flex-1 px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.12] text-white font-body text-sm placeholder:text-[#808D7F] focus:outline-none focus:border-white/40 transition-colors backdrop-blur-md"
                />
                <button
                  type="submit"
                  className="btn-ios-glass !py-3 !px-7 whitespace-nowrap"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Notify Me</span>
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-full text-center space-y-1"
              >
                <div className="flex items-center justify-center gap-2 text-mint font-heading font-bold text-base">
                  <CheckCircle2 className="w-4 h-4 text-mint" />
                  <span>YOU ARE ON THE PRIORITY WAITLIST</span>
                </div>
                <p className="text-xs font-body text-[#A0B09E]">
                  We will notify {contact} as soon as SafeRide launches.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* 3 Liquid Glass Trust / Benefit Cards with Staggered Scroll Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-14 text-left"
          >
            {perks.map((p, idx) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="ios-glass-card p-6 flex flex-col justify-between cursor-default"
                >
                  <div className="w-10 h-10 rounded-2xl ios-glass-pill !p-0 flex items-center justify-center text-mint mb-4">
                    <Icon className="w-4 h-4 text-mint" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-base uppercase tracking-tight mb-1.5">
                      {p.title}
                    </h4>
                    <p className="text-xs text-[#B0BDB0] font-body leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Micro Brand Stamp */}
          <div className="pt-6 border-t border-border-subtle/25 w-full max-w-sm flex items-center justify-between font-mono text-[9.5px] text-[#707D6F] tracking-widest uppercase">
            <span className="text-white font-medium">SAFERIDE</span>
            <span className="text-border-subtle">•</span>
            <span>SAFETY · TRANSPARENCY · TRUST</span>
          </div>
        </div>
      </div>
    </section>
  )
}
