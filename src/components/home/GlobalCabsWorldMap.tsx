'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Shield, Radio, Navigation, Users, Car, ArrowUpRight } from 'lucide-react'

interface HubData {
  id: string
  name: string
  country: string
  cabs: number
  inTransit: number
  available: number
  x: number // SVG coordinates (0-1000)
  y: number // SVG coordinates (0-500)
  status: 'optimal' | 'busy' | 'active'
}

const GLOBAL_HUBS: HubData[] = [
  { id: 'delhi', name: 'Delhi-NCR', country: 'India', cabs: 1420, inTransit: 940, available: 480, x: 672, y: 228, status: 'optimal' },
  { id: 'mumbai', name: 'Mumbai', country: 'India', cabs: 680, inTransit: 450, available: 230, x: 652, y: 248, status: 'optimal' },
  { id: 'bengaluru', name: 'Bengaluru', country: 'India', cabs: 540, inTransit: 360, available: 180, x: 660, y: 270, status: 'optimal' },
  { id: 'dubai', name: 'Dubai', country: 'UAE', cabs: 460, inTransit: 310, available: 150, x: 605, y: 220, status: 'optimal' },
  { id: 'london', name: 'London', country: 'United Kingdom', cabs: 520, inTransit: 380, available: 140, x: 475, y: 145, status: 'optimal' },
  { id: 'paris', name: 'Paris', country: 'France', cabs: 340, inTransit: 230, available: 110, x: 488, y: 158, status: 'optimal' },
  { id: 'berlin', name: 'Berlin', country: 'Germany', cabs: 280, inTransit: 190, available: 90, x: 508, y: 142, status: 'optimal' },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', cabs: 380, inTransit: 260, available: 120, x: 748, y: 295, status: 'optimal' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', cabs: 310, inTransit: 210, available: 100, x: 840, y: 195, status: 'optimal' },
  { id: 'sydney', name: 'Sydney', country: 'Australia', cabs: 190, inTransit: 125, available: 65, x: 865, y: 395, status: 'optimal' },
  { id: 'newyork', name: 'New York', country: 'United States', cabs: 620, inTransit: 440, available: 180, x: 280, y: 175, status: 'optimal' },
  { id: 'sf', name: 'San Francisco', country: 'United States', cabs: 390, inTransit: 270, available: 120, x: 180, y: 180, status: 'optimal' },
  { id: 'toronto', name: 'Toronto', country: 'Canada', cabs: 260, inTransit: 180, available: 80, x: 265, y: 160, status: 'optimal' },
  { id: 'sao_paulo', name: 'São Paulo', country: 'Brazil', cabs: 180, inTransit: 120, available: 60, x: 345, y: 365, status: 'optimal' },
]

// Global transit arcs connecting hubs
const GLOBAL_ARCS = [
  { from: 'delhi', to: 'dubai' },
  { from: 'delhi', to: 'london' },
  { from: 'delhi', to: 'singapore' },
  { from: 'delhi', to: 'mumbai' },
  { from: 'mumbai', to: 'bengaluru' },
  { from: 'dubai', to: 'london' },
  { from: 'london', to: 'paris' },
  { from: 'london', to: 'berlin' },
  { from: 'london', to: 'newyork' },
  { from: 'newyork', to: 'sf' },
  { from: 'newyork', to: 'toronto' },
  { from: 'newyork', to: 'sao_paulo' },
  { from: 'singapore', to: 'tokyo' },
  { from: 'singapore', to: 'sydney' },
  { from: 'tokyo', to: 'sf' },
]

export function GlobalCabsWorldMap() {
  const [activeHub, setActiveHub] = useState<HubData>(GLOBAL_HUBS[0])
  const [totalCabs, setTotalCabs] = useState(6270)
  const [liveTrips, setLiveTrips] = useState(4155)

  // Subtle live pulse fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalCabs((prev) => prev + Math.floor(Math.random() * 5) - 2)
      setLiveTrips((prev) => prev + Math.floor(Math.random() * 7) - 3)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full bg-[#060806] py-16 md:py-24 border-t border-b border-[#A2BD86]/15 overflow-hidden" id="global-map">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(162,189,134,0.06)_0%,rgba(68,91,66,0.02)_40%,transparent_75%)] blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header Strip - Clean, Direct, Minimal */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-[10px] font-mono text-[#A2BD86] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#A2BD86] animate-pulse" />
              <span className="tracking-[0.22em] uppercase font-bold">WORLD CONNECTED FLEET TELEMETRY</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-white uppercase tracking-tight">
              WORLDWIDE CABS IN MOTION
            </h2>
            <p className="text-[13px] md:text-[14px] text-[#92A58D] font-mono mt-1">
              Real-time monitoring across 14 international hubs · Click any hub to view live fleet distribution
            </p>
          </div>

          {/* Quick Booking CTA */}
          <Link
            href="/book"
            className="self-start lg:self-auto px-6 py-3 bg-[#A2BD86] text-[#060806] text-[10.5px] font-bold tracking-[0.2em] uppercase hover:bg-white transition-all rounded-sm shadow-[0_4px_20px_rgba(162,189,134,0.25)] flex items-center gap-2"
          >
            <span>BOOK A CAB NOW</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Live Counters Banner - PROPERLY VISIBLE & HIGH CONTRAST */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-[#0A0E0A] border border-[#A2BD86]/25 shadow-lg">
            <div className="flex items-center justify-between text-[#829381] font-mono text-[9px] uppercase tracking-widest mb-1">
              <span>TOTAL ACTIVE CABS</span>
              <Car className="w-3.5 h-3.5 text-[#A2BD86]" />
            </div>
            <div className="font-heading font-extrabold text-3xl md:text-4xl text-[#A2BD86] tracking-tight">
              {totalCabs.toLocaleString()}
            </div>
            <div className="text-[10px] font-mono text-[#829381] mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A2BD86] animate-ping" />
              <span>LIVE ON ROAD RIGHT NOW</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0A0E0A] border border-[#A2BD86]/25 shadow-lg">
            <div className="flex items-center justify-between text-[#829381] font-mono text-[9px] uppercase tracking-widest mb-1">
              <span>ACTIVE TRIPS IN TRANSIT</span>
              <Navigation className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="font-heading font-extrabold text-3xl md:text-4xl text-white tracking-tight">
              {liveTrips.toLocaleString()}
            </div>
            <div className="text-[10px] font-mono text-[#92A58D] mt-1">
              Across 350+ transit corridors
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0A0E0A] border border-[#A2BD86]/25 shadow-lg">
            <div className="flex items-center justify-between text-[#829381] font-mono text-[9px] uppercase tracking-widest mb-1">
              <span>CONNECTED HUBS</span>
              <Radio className="w-3.5 h-3.5 text-[#A2BD86]" />
            </div>
            <div className="font-heading font-extrabold text-3xl md:text-4xl text-[#A2BD86] tracking-tight">
              14 CITIES
            </div>
            <div className="text-[10px] font-mono text-[#829381] mt-1">
              Main Corridor: Delhi-NCR
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0A0E0A] border border-[#A2BD86]/25 shadow-lg">
            <div className="flex items-center justify-between text-[#829381] font-mono text-[9px] uppercase tracking-widest mb-1">
              <span>SAFETY GUARDIAN UPTIME</span>
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="font-heading font-extrabold text-3xl md:text-4xl text-white tracking-tight">
              99.98%
            </div>
            <div className="text-[10px] font-mono text-[#A2BD86] mt-1">
              Continuous 100Hz IoT Telemetry
            </div>
          </div>
        </div>

        {/* The World Map Vector Graphic - HIGH VISIBILITY & FULL CONNECTIONS */}
        <div className="relative rounded-2xl md:rounded-3xl border border-[#A2BD86]/30 bg-[#080C08] p-4 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#445B42_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

          {/* Top Corner Legend */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-4 bg-[#060806]/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 font-mono text-[9px] text-[#92A58D]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A2BD86]" />
              ACTIVE FLEET HUB
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#A2BD86]" />
              INTER-CITY CORRIDOR
            </span>
          </div>

          {/* World Map SVG */}
          <div className="relative aspect-[16/9] w-full max-h-[640px]">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full select-none"
              style={{ filter: 'drop-shadow(0 0 1px rgba(162,189,134,0.15))' }}
            >
              <defs>
                <linearGradient id="world-arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#445B42" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#A2BD86" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#445B42" stopOpacity="0.4" />
                </linearGradient>

                <radialGradient id="hub-pulse-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#A2BD86" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#445B42" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Continents - High-Visibility Stylized Silhouettes */}
              <g fill="#121A13" stroke="#445B42" strokeWidth="1.2" opacity="0.95">
                {/* North America */}
                <path d="M 120 70 Q 180 50 250 65 Q 320 80 290 130 Q 270 180 280 220 L 220 220 L 170 190 L 130 140 Z" />
                <path d="M 160 190 L 220 220 L 210 260 L 180 250 Z" /> {/* Central America */}
                <path d="M 230 40 L 280 40 L 270 65 L 220 60 Z" /> {/* Greenland */}

                {/* South America */}
                <path d="M 270 260 Q 350 270 380 330 Q 360 410 320 460 Q 280 420 280 340 Z" />

                {/* Europe */}
                <path d="M 450 110 Q 520 100 560 130 Q 530 180 480 185 Q 450 160 450 110 Z" />
                <path d="M 450 120 L 475 140 L 460 160 Z" /> {/* UK */}
                <path d="M 490 80 Q 530 70 540 105 L 500 110 Z" /> {/* Scandinavia */}

                {/* Africa */}
                <path d="M 460 195 Q 560 190 590 250 Q 580 350 510 400 Q 450 330 450 240 Z" />
                <path d="M 590 320 L 610 340 L 595 370 Z" /> {/* Madagascar */}

                {/* Asia (including Middle East and India) */}
                <path d="M 560 110 Q 700 80 850 110 Q 890 160 840 230 Q 770 270 700 240 Q 660 300 630 250 Q 580 240 560 190 Z" />
                {/* Indian Peninsula Accent */}
                <path d="M 640 210 L 685 210 L 665 285 Z" fill="#18241A" stroke="#A2BD86" strokeWidth="1.5" />
                {/* Japan */}
                <path d="M 840 170 Q 860 180 850 215 L 835 200 Z" />
                {/* Southeast Asia */}
                <path d="M 720 250 L 760 280 L 740 310 L 710 270 Z" />

                {/* Australia */}
                <path d="M 780 340 Q 880 330 890 390 Q 850 440 790 415 Z" />
                <path d="M 910 400 L 930 420 L 910 440 Z" /> {/* New Zealand */}
              </g>

              {/* Global Connected Transit Arcs */}
              <g>
                {GLOBAL_ARCS.map((arc, i) => {
                  const fromHub = GLOBAL_HUBS.find((h) => h.id === arc.from)
                  const toHub = GLOBAL_HUBS.find((h) => h.id === arc.to)
                  if (!fromHub || !toHub) return null

                  // Calculate curved arc midpoint
                  const dx = toHub.x - fromHub.x
                  const dy = toHub.y - fromHub.y
                  const cx = (fromHub.x + toHub.x) / 2
                  const cy = (fromHub.y + toHub.y) / 2 - Math.min(Math.abs(dx) * 0.22, 60)

                  return (
                    <g key={i}>
                      {/* Base Corridor Line */}
                      <path
                        d={`M ${fromHub.x} ${fromHub.y} Q ${cx} ${cy} ${toHub.x} ${toHub.y}`}
                        stroke="url(#world-arc-grad)"
                        strokeWidth="1.8"
                        strokeDasharray="4 6"
                        fill="none"
                        opacity="0.75"
                      />

                      {/* Moving Transit Pulse Particle */}
                      <circle r="3" fill="#A2BD86" opacity="0.9">
                        <animateMotion
                          path={`M ${fromHub.x} ${fromHub.y} Q ${cx} ${cy} ${toHub.x} ${toHub.y}`}
                          dur={`${4 + (i % 3) * 1.5}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  )
                })}
              </g>

              {/* City Hub Pins & Live Cab Counters */}
              {GLOBAL_HUBS.map((hub) => {
                const isSelected = activeHub.id === hub.id
                return (
                  <g
                    key={hub.id}
                    transform={`translate(${hub.x}, ${hub.y})`}
                    className="cursor-pointer group"
                    onClick={() => setActiveHub(hub)}
                  >
                    {/* Outer Ambient Radar Pulse */}
                    <circle cx="0" cy="0" r="22" fill="url(#hub-pulse-glow)" opacity={isSelected ? 1 : 0.4} />
                    <circle
                      cx="0"
                      cy="0"
                      r="16"
                      stroke="#A2BD86"
                      strokeWidth="1"
                      className="animate-ping opacity-50"
                      style={{ animationDuration: isSelected ? '2.5s' : '4s' }}
                    />
                    <circle cx="0" cy="0" r="5" fill="#060806" stroke="#A2BD86" strokeWidth="2" />
                    <circle cx="0" cy="0" r="2.5" fill="#A2BD86" />

                    {/* Permanent City Name & Cabs Count Tag */}
                    <g transform="translate(10, -8)">
                      <rect
                        x="-2"
                        y="-10"
                        width={hub.name.length * 6.8 + 55}
                        height="18"
                        rx="3"
                        fill="#060806"
                        stroke={isSelected ? '#A2BD86' : '#445B42'}
                        strokeWidth={isSelected ? '1.5' : '1'}
                        opacity="0.95"
                      />
                      <text x="3" y="3" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                        {hub.name}
                      </text>
                      <text
                        x={hub.name.length * 6.8 + 6}
                        y="3"
                        fill="#A2BD86"
                        fontSize="8.5"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {hub.cabs}
                      </text>
                    </g>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Interactive Selected Hub Telemetry Bar (Bottom of Map) */}
          <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#445B42]/30 border border-[#A2BD86]/40 flex items-center justify-center font-mono font-bold text-[#A2BD86] text-sm">
                {activeHub.country.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-extrabold text-white text-lg uppercase">
                    {activeHub.name} FLEET CORRIDOR
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#A2BD86]/20 text-[#A2BD86] border border-[#A2BD86]/40 font-bold">
                    ACTIVE
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#92A58D]">
                  Location: {activeHub.country} · Centralized Safety Node
                </div>
              </div>
            </div>

            {/* Quick Hub Stats */}
            <div className="flex items-center gap-6 font-mono text-xs">
              <div className="flex flex-col">
                <span className="text-[#829381] text-[9px] uppercase">TOTAL FLEET</span>
                <span className="font-bold text-[#A2BD86] text-base">{activeHub.cabs} Cabs</span>
              </div>
              <div className="h-6 w-[1px] bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[#829381] text-[9px] uppercase">IN ACTIVE TRANSIT</span>
                <span className="font-bold text-white text-base">{activeHub.inTransit}</span>
              </div>
              <div className="h-6 w-[1px] bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[#829381] text-[9px] uppercase">READY FOR DISPATCH</span>
                <span className="font-bold text-[#A2BD86] text-base">{activeHub.available}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
