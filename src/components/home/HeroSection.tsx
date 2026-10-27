'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { IndiaSafetyMapHero } from '@/components/effects/IndiaSafetyMapHero'
import { ShieldCheck } from 'lucide-react'

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const opacityText = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const scaleText = useTransform(scrollYProgress, [0, 1], [1, 0.96])

  return (
    <section ref={heroRef} className="relative w-full h-[100svh] overflow-hidden bg-[#060806]">
      {/* 3D India Safety Map in Brand Obsidian & Olive Sage */}
      <IndiaSafetyMapHero>
        <motion.div
          style={{ y: yText, opacity: opacityText, scale: scaleText }}
          className="max-w-2xl mx-auto px-6 text-center will-change-transform pt-12 md:pt-16"
        >
          {/* Apple VisionOS / iOS Liquid Glass Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-5"
          >
            <div className="ios-glass-pill cursor-default">
              <span className="ios-glass-dot" />
              <span className="text-[10px] font-mono tracking-[0.24em] text-[#EAF2E6] uppercase font-medium">
                COMING SOON
              </span>
            </div>
          </motion.div>

          {/* Minimalist, Restrained Brand Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-heading font-extrabold text-white leading-none tracking-[0.12em] md:tracking-[0.16em] uppercase select-none"
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
                textShadow: '0 4px 25px rgba(0,0,0,0.95)',
              }}
            >
              SAFE <span className="text-mint font-bold">RIDE</span>
            </h1>
          </motion.div>

          {/* Subtitle - Exact Tagline From Official Logo */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] sm:text-[12px] md:text-[13px] font-mono tracking-[0.34em] md:tracking-[0.44em] text-[#A2BD86] font-semibold uppercase mt-3 select-none"
            style={{
              textShadow: '0 2px 16px rgba(0,0,0,0.95)',
            }}
          >
            SAFETY · TRANSPARENCY · TRUST
          </motion.p>

          {/* Apple VisionOS Liquid Glass Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32 }}
            className="mt-8 flex items-center justify-center pointer-events-auto"
          >
            <a
              href="#waitlist"
              className="btn-ios-glass"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Join Early Access</span>
            </a>
          </motion.div>
        </motion.div>
      </IndiaSafetyMapHero>

      {/* Minimal Scroll Indicator */}
      <a
        href="#safety-philosophy"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 group cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="text-[11px] text-mint/70 animate-bounce">
          ↓
        </span>
      </a>
    </section>
  )
}
