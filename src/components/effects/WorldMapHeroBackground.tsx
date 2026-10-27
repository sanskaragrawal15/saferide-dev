'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface WorldHub {
  id: string
  name: string
  region: string
  cabs: number
  x: number
  y: number
  isPrimary?: boolean
}

const HUBS: WorldHub[] = [
  { id: 'delhi', name: 'DELHI-NCR', region: 'India · Core Hub', cabs: 1420, x: 857, y: 205, isPrimary: true },
  { id: 'mumbai', name: 'MUMBAI', region: 'India', cabs: 680, x: 843, y: 237 },
  { id: 'bengaluru', name: 'BENGALURU', region: 'India', cabs: 540, x: 858, y: 257 },
  { id: 'dubai', name: 'DUBAI', region: 'UAE', cabs: 460, x: 784, y: 216 },
  { id: 'london', name: 'LONDON', region: 'UK', cabs: 520, x: 600, y: 128 },
  { id: 'newyork', name: 'NEW YORK', region: 'USA', cabs: 620, x: 353, y: 164 },
  { id: 'sf', name: 'SAN FRANCISCO', region: 'USA', cabs: 390, x: 192, y: 174 },
  { id: 'singapore', name: 'SINGAPORE', region: 'Singapore', cabs: 380, x: 946, y: 296 },
  { id: 'tokyo', name: 'TOKYO', region: 'Japan', cabs: 310, x: 1066, y: 181 },
  { id: 'sydney', name: 'SYDNEY', region: 'Australia', cabs: 190, x: 1104, y: 413 },
  { id: 'saopaulo', name: 'SÃO PAULO', region: 'Brazil', cabs: 180, x: 420, y: 390 },
]

const CONNECTIONS = [
  { from: 'delhi', to: 'dubai', curve: -35 },
  { from: 'delhi', to: 'london', curve: -65 },
  { from: 'delhi', to: 'singapore', curve: -25 },
  { from: 'delhi', to: 'mumbai', curve: -15 },
  { from: 'mumbai', to: 'bengaluru', curve: -10 },
  { from: 'dubai', to: 'london', curve: -45 },
  { from: 'london', to: 'newyork', curve: -70 },
  { from: 'newyork', to: 'sf', curve: -35 },
  { from: 'newyork', to: 'saopaulo', curve: -40 },
  { from: 'singapore', to: 'tokyo', curve: -30 },
  { from: 'singapore', to: 'sydney', curve: -25 },
  { from: 'tokyo', to: 'sf', curve: -65 },
]

export function WorldMapHeroBackground({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [totalCabs, setTotalCabs] = useState(6270)

  // Live counter pulse
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalCabs((prev) => prev + Math.floor(Math.random() * 5) - 2)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  // Smooth mouse tilt parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 32, stiffness: 80, mass: 0.6 }
  const transX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-24, 24]), springConfig)
  const transY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-18, 18]), springConfig)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden bg-[#060806] select-none"
      style={{ perspective: '1400px' }}
    >
      {/* 3D Parallax Map Layer */}
      <motion.div
        style={{
          x: transX,
          y: transY,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        {/* Full-Bleed World Map SVG - Rich, High-Tech, High Contrast */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center scale-105 md:scale-100">
          <svg
            viewBox="0 0 1200 600"
            className="w-full h-full object-cover"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Luminous Corridor Gradient */}
              <linearGradient id="route-beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#445B42" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#A2BD86" stopOpacity="1" />
                <stop offset="100%" stopColor="#445B42" stopOpacity="0.4" />
              </linearGradient>

              {/* Delhi Primary Epicenter Glow */}
              <radialGradient id="delhi-epicenter" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#A2BD86" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#445B42" stopOpacity="0.4" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>

              {/* Standard Hub Glow */}
              <radialGradient id="hub-beacon-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#A2BD86" stopOpacity="0.75" />
                <stop offset="60%" stopColor="#445B42" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>

              {/* Filter for glowing neon arcs */}
              <filter id="beam-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Latitude / Longitude Matrix Grid Lines */}
            <g stroke="#445B42" strokeWidth="0.6" strokeDasharray="4 8" opacity="0.3">
              <line x1="0" y1="120" x2="1200" y2="120" />
              <line x1="0" y1="200" x2="1200" y2="200" />
              <line x1="0" y1="300" x2="1200" y2="300" />
              <line x1="0" y1="420" x2="1200" y2="420" />
              <line x1="180" y1="0" x2="180" y2="600" />
              <line x1="360" y1="0" x2="360" y2="600" />
              <line x1="600" y1="0" x2="600" y2="600" />
              <line x1="840" y1="0" x2="840" y2="600" />
              <line x1="1060" y1="0" x2="1060" y2="600" />
            </g>

            {/* Continents - Rich Textured Digital Landmasses */}
            <g fill="#0D1610" stroke="#445B42" strokeWidth="1.5" opacity="0.95">
              {/* North America */}
              <path d="M 60 70 Q 120 40 220 50 Q 300 60 380 90 Q 360 140 370 190 Q 320 220 260 215 Q 180 200 130 160 Q 70 120 60 70 Z" />
              <path d="M 180 205 L 245 220 L 230 280 L 180 245 Z" /> {/* Central America */}
              <path d="M 300 20 L 370 20 L 350 65 L 290 55 Z" /> {/* Greenland */}
              <path d="M 340 180 Q 375 185 365 210 L 335 200 Z" /> {/* Florida */}

              {/* South America */}
              <path d="M 270 265 Q 370 275 435 345 Q 420 440 360 520 Q 305 470 295 380 Q 275 330 270 265 Z" />

              {/* Europe */}
              <path d="M 530 115 Q 630 95 680 130 Q 655 190 585 190 Q 530 165 530 115 Z" />
              <path d="M 570 105 L 600 125 L 580 145 Z" /> {/* UK */}
              <path d="M 600 65 Q 650 45 660 95 L 610 105 Z" /> {/* Scandinavia */}

              {/* Africa */}
              <path d="M 550 200 Q 690 190 720 275 Q 710 400 625 460 Q 555 385 545 270 Q 535 230 550 200 Z" />
              <path d="M 730 355 L 750 375 L 735 415 Z" /> {/* Madagascar */}

              {/* Asia & Middle East */}
              <path d="M 690 105 Q 890 75 1050 110 Q 1110 170 1040 250 Q 950 290 860 250 Q 810 320 770 260 Q 720 240 690 190 Z" />
              {/* Indian Subcontinent Triangle - Prominently Highlighted */}
              <path
                d="M 800 215 Q 855 205 895 215 L 857 325 Z"
                fill="#16261A"
                stroke="#A2BD86"
                strokeWidth="2.2"
                filter="url(#beam-glow)"
              />
              {/* Japan Arc */}
              <path d="M 1050 155 Q 1070 165 1060 205 L 1040 185 Z" />
              {/* Southeast Asia */}
              <path d="M 900 260 L 960 290 L 940 330 L 890 280 Z" />

              {/* Australia & Oceania */}
              <path d="M 980 370 Q 1100 350 1120 420 Q 1060 490 990 460 Q 970 420 980 370 Z" />
              <path d="M 1140 440 L 1160 460 L 1140 480 Z" /> {/* New Zealand */}
            </g>

            {/* Glowing Digital Route Arcs Connecting All Cities */}
            <g>
              {CONNECTIONS.map((c, i) => {
                const h1 = HUBS.find((h) => h.id === c.from)
                const h2 = HUBS.find((h) => h.id === c.to)
                if (!h1 || !h2) return null

                const cx = (h1.x + h2.x) / 2
                const cy = (h1.y + h2.y) / 2 + c.curve

                return (
                  <g key={i}>
                    {/* Wide Ambient Beam Glow */}
                    <path
                      d={`M ${h1.x} ${h1.y} Q ${cx} ${cy} ${h2.x} ${h2.y}`}
                      stroke="#445B42"
                      strokeWidth="3.5"
                      strokeOpacity="0.3"
                      fill="none"
                    />

                    {/* Razor-Sharp Active Beam */}
                    <path
                      d={`M ${h1.x} ${h1.y} Q ${cx} ${cy} ${h2.x} ${h2.y}`}
                      stroke="url(#route-beam-grad)"
                      strokeWidth="2"
                      strokeDasharray="6 8"
                      fill="none"
                      opacity="0.9"
                    />

                    {/* Streaming Photon Light Packet */}
                    <circle r="4" fill="#A2BD86" filter="url(#beam-glow)">
                      <animateMotion
                        path={`M ${h1.x} ${h1.y} Q ${cx} ${cy} ${h2.x} ${h2.y}`}
                        dur={`${3.2 + (i % 4) * 1.1}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                )
              })}
            </g>

            {/* City Hub Pins & Live Cab Counters */}
            {HUBS.map((hub) => (
              <g key={hub.id} transform={`translate(${hub.x}, ${hub.y})`}>
                {/* Sonar Beacon Rings */}
                <circle
                  cx="0"
                  cy="0"
                  r={hub.isPrimary ? '42' : '22'}
                  fill={hub.isPrimary ? 'url(#delhi-epicenter)' : 'url(#hub-beacon-glow)'}
                />
                <circle
                  cx="0"
                  cy="0"
                  r={hub.isPrimary ? '24' : '15'}
                  stroke="#A2BD86"
                  strokeWidth={hub.isPrimary ? '1.8' : '1'}
                  className="animate-ping"
                  style={{ animationDuration: hub.isPrimary ? '2.2s' : '4s' }}
                />
                <circle cx="0" cy="0" r={hub.isPrimary ? '6' : '4.5'} fill="#060806" stroke="#A2BD86" strokeWidth="2.5" />
                <circle cx="0" cy="0" r={hub.isPrimary ? '3.5' : '2'} fill="#A2BD86" />

                {/* High-Visibility Holographic Hub Card */}
                <g transform="translate(12, -12)">
                  <rect
                    x="-2"
                    y="-11"
                    width={hub.name.length * 7.2 + 64}
                    height="20"
                    rx="3"
                    fill="#060806"
                    stroke={hub.isPrimary ? '#A2BD86' : '#445B42'}
                    strokeWidth={hub.isPrimary ? '1.8' : '1'}
                    opacity="0.95"
                  />
                  <text x="4" y="3.5" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                    {hub.name}
                  </text>
                  <text
                    x={hub.name.length * 7.2 + 8}
                    y="3.5"
                    fill="#A2BD86"
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {hub.cabs}
                  </text>
                </g>
              </g>
            ))}
          </svg>
        </div>

        {/* Top-Right Live Fleet Status Ticker HUD */}
        <div className="hidden md:flex absolute top-24 right-10 flex-col items-end gap-1.5 font-mono text-[9.5px] text-[#92A58D] tracking-widest uppercase z-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full liquid-glass border border-[#A2BD86]/35 shadow-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#A2BD86] animate-pulse" />
            <span className="font-bold text-white">{totalCabs.toLocaleString()} ACTIVE CABS MONITORED</span>
            <span className="text-white/20">|</span>
            <span className="text-[#A2BD86]">14 GLOBAL HUBS</span>
          </div>
          <span className="text-[8px] text-[#829381]">COMING SOON · DELHI-NCR LAUNCH CORE</span>
        </div>

        {/* Bottom-Left Corridor Telemetry HUD */}
        <div className="hidden md:flex absolute bottom-24 left-10 flex-col items-start gap-1 font-mono text-[9px] text-[#829381] tracking-widest uppercase z-10">
          <span className="text-[#A2BD86] font-bold">PRIMARY HUB: DELHI-NCR CAPITAL CORRIDOR</span>
          <span>1,420 MONITORED UNITS · 100Hz TELEMETRY</span>
          <span>COMING SOON · PRIORITY ACCESS NOW OPEN</span>
        </div>
      </motion.div>

      {/* Center Soft Scrim for 100% Crisp Text Readability */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(6,8,6,0.85) 0%, rgba(6,8,6,0.5) 60%, transparent 100%)',
        }}
      />

      {/* Top & Bottom Cinematic Fade Vignettes */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#060806] via-[#060806]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060806] via-[#060806]/90 to-transparent pointer-events-none z-10" />

      {/* Foreground Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        {children}
      </div>
    </div>
  )
}
