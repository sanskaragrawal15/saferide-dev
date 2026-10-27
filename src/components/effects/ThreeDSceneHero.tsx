'use client'

import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface ThreeDSceneHeroProps {
  children?: React.ReactNode
}

export function ThreeDSceneHero({ children }: ThreeDSceneHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse tilt tracking with smooth spring physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 28, stiffness: 90, mass: 0.6 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)
  const transX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig)
  const transY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-16, 16]), springConfig)

  // Map plane secondary parallax
  const mapRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [58, 48]), springConfig)
  const mapRotateZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, -7]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    const node = containerRef.current
    if (node) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      node.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (node) node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden bg-[#060806] select-none"
      style={{ perspective: '1400px' }}
    >
      {/* 3D Tilted Scene Canvas */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-0 w-full h-full will-change-transform pointer-events-none"
      >
        {/* Layer 1: 3D Digital Spatial City Map Plane (Isometric Aerial Perspective) */}
        <motion.div
          style={{
            x: transX,
            y: transY,
            rotateX: mapRotateX,
            rotateZ: mapRotateZ,
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 65%',
          }}
          className="absolute -top-[25%] -left-[30%] w-[160%] h-[160%] pointer-events-none"
        >
          {/* Spatial Grid Ground Matrix */}
          <div className="absolute inset-0 bg-[radial-gradient(#445B42_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.22]" />
          <div className="absolute inset-0 bg-[radial-gradient(#A2BD86_1.5px,transparent_1.5px)] [background-size:160px_160px] opacity-[0.35]" />

          {/* SVG Vector Map Corridors & Highways */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1600 1200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="corridor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#445B42" stopOpacity="0.1" />
                <stop offset="30%" stopColor="#A2BD86" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#445B42" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#A2BD86" stopOpacity="0.1" />
              </linearGradient>

              <linearGradient id="arterial-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#A2BD86" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#445B42" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#A2BD86" stopOpacity="0.05" />
              </linearGradient>

              <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#A2BD86" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#445B42" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Topographic Contour Arcs */}
            <path
              d="M 100 300 Q 400 150 800 280 T 1500 200"
              stroke="#445B42"
              strokeWidth="1"
              strokeDasharray="4 8"
              opacity="0.25"
            />
            <path
              d="M 50 500 Q 450 350 900 480 T 1550 420"
              stroke="#445B42"
              strokeWidth="1"
              strokeDasharray="6 12"
              opacity="0.3"
            />
            <path
              d="M 80 750 Q 500 620 950 720 T 1520 680"
              stroke="#445B42"
              strokeWidth="1"
              strokeDasharray="4 8"
              opacity="0.25"
            />
            <path
              d="M 120 950 Q 520 840 1020 920 T 1500 890"
              stroke="#445B42"
              strokeWidth="1"
              strokeDasharray="8 14"
              opacity="0.2"
            />

            {/* Major Arterial 1: Cyber City to Aerocity Spine */}
            <path
              d="M 200 950 C 420 800, 600 650, 850 520 C 1100 390, 1280 280, 1450 150"
              stroke="#1A281B"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 200 950 C 420 800, 600 650, 850 520 C 1100 390, 1280 280, 1450 150"
              stroke="url(#corridor-gradient)"
              strokeWidth="2.5"
              strokeDasharray="12 16"
              className="animate-pulse"
              style={{ animationDuration: '4s' }}
            />

            {/* Major Arterial 2: Outer Ring Expressway */}
            <path
              d="M 150 320 C 400 450, 720 580, 980 750 C 1200 890, 1380 980, 1500 1080"
              stroke="#152016"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 150 320 C 400 450, 720 580, 980 750 C 1200 890, 1380 980, 1500 1080"
              stroke="url(#arterial-gradient)"
              strokeWidth="2"
              strokeDasharray="8 12"
            />

            {/* Cross-Transit Corridor 3 */}
            <path
              d="M 350 200 C 500 420, 650 680, 750 850 C 850 1000, 920 1100, 1050 1180"
              stroke="#445B42"
              strokeWidth="1.5"
              strokeDasharray="5 10"
              opacity="0.4"
            />

            {/* Urban Grid Connectors */}
            <path d="M 600 650 L 980 750" stroke="#445B42" strokeWidth="1" strokeDasharray="3 6" opacity="0.45" />
            <path d="M 850 520 L 720 580" stroke="#445B42" strokeWidth="1" strokeDasharray="3 6" opacity="0.45" />
            <path d="M 850 520 L 1150 620" stroke="#445B42" strokeWidth="1" strokeDasharray="3 6" opacity="0.45" />
            <path d="M 420 800 L 520 900" stroke="#445B42" strokeWidth="1" strokeDasharray="3 6" opacity="0.4" />

            {/* Primary Telemetry Node A: Aerocity Gateway */}
            <g transform="translate(850, 520)">
              <circle cx="0" cy="0" r="90" fill="url(#hub-glow)" />
              <circle cx="0" cy="0" r="45" stroke="#A2BD86" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" className="animate-spin" style={{ animationDuration: '24s' }} />
              <circle cx="0" cy="0" r="28" stroke="#445B42" strokeWidth="1" opacity="0.7" />
              <circle cx="0" cy="0" r="14" fill="#445B42" opacity="0.4" />
              <circle cx="0" cy="0" r="6" fill="#A2BD86" />
              <circle cx="0" cy="0" r="22" stroke="#A2BD86" strokeWidth="1.5" className="animate-ping" style={{ animationDuration: '3.5s' }} />
              
              {/* Node Data Tag */}
              <rect x="25" y="-35" width="180" height="42" rx="4" fill="#060806" stroke="#445B42" strokeWidth="1" opacity="0.92" />
              <text x="35" y="-20" fill="#A2BD86" fontSize="10" fontFamily="monospace" fontWeight="bold">
                HUB 01 · AEROCITY
              </text>
              <text x="35" y="-6" fill="#92A58D" fontSize="8.5" fontFamily="monospace">
                42 ACTIVE UNITS // 100Hz
              </text>
            </g>

            {/* Secondary Telemetry Node B: Cyber Hub Terminal */}
            <g transform="translate(420, 800)">
              <circle cx="0" cy="0" r="70" fill="url(#hub-glow)" opacity="0.7" />
              <circle cx="0" cy="0" r="32" stroke="#445B42" strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />
              <circle cx="0" cy="0" r="5" fill="#A2BD86" />
              <circle cx="0" cy="0" r="18" stroke="#A2BD86" strokeWidth="1" className="animate-ping" style={{ animationDuration: '4.5s' }} />

              <rect x="20" y="-30" width="160" height="38" rx="4" fill="#060806" stroke="#445B42" strokeWidth="1" opacity="0.9" />
              <text x="30" y="-17" fill="#A2BD86" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                HUB 02 · CYBER HUB
              </text>
              <text x="30" y="-5" fill="#92A58D" fontSize="8" fontFamily="monospace">
                38 ACTIVE UNITS // STABLE
              </text>
            </g>

            {/* Tertiary Telemetry Node C: NCR Corridor North */}
            <g transform="translate(1200, 320)">
              <circle cx="0" cy="0" r="60" fill="url(#hub-glow)" opacity="0.6" />
              <circle cx="0" cy="0" r="25" stroke="#445B42" strokeWidth="1" opacity="0.5" />
              <circle cx="0" cy="0" r="4.5" fill="#A2BD86" />
              <circle cx="0" cy="0" r="16" stroke="#A2BD86" strokeWidth="1" className="animate-ping" style={{ animationDuration: '5s' }} />

              <rect x="18" y="-28" width="150" height="36" rx="4" fill="#060806" stroke="#445B42" strokeWidth="1" opacity="0.88" />
              <text x="26" y="-16" fill="#A2BD86" fontSize="9" fontFamily="monospace" fontWeight="bold">
                HUB 03 · DIPLOMATIC
              </text>
              <text x="26" y="-5" fill="#92A58D" fontSize="7.5" fontFamily="monospace">
                CORRIDOR VERIFIED
              </text>
            </g>

            {/* Active Moving Telemetry Markers (Cab Units in Transit) */}
            <g transform="translate(620, 660)">
              <circle cx="0" cy="0" r="4" fill="#F5F8F2" />
              <circle cx="0" cy="0" r="10" stroke="#A2BD86" strokeWidth="1" opacity="0.6" />
              <text x="12" y="3" fill="#A2BD86" fontSize="8" fontFamily="monospace">DL-01-MK-48</text>
            </g>

            <g transform="translate(1040, 420)">
              <circle cx="0" cy="0" r="4" fill="#F5F8F2" />
              <circle cx="0" cy="0" r="10" stroke="#A2BD86" strokeWidth="1" opacity="0.6" />
              <text x="12" y="3" fill="#A2BD86" fontSize="8" fontFamily="monospace">HR-26-CV-90</text>
            </g>
          </svg>

          {/* Sweeping Radar Horizon Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(162,189,134,0.08)_60deg,transparent_90deg)] animate-spin pointer-events-none" style={{ animationDuration: '18s' }} />
        </motion.div>

        {/* Layer 2: 3D Spatial Floating HUD Elements (Midground Depth) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: 'translateZ(25px)' }}
          aria-hidden="true"
        >
          {/* Top-Right Spatial Reticle Coordinates */}
          <div className="hidden md:flex absolute top-24 right-12 flex-col items-end gap-1 font-mono text-[9px] text-text-muted/70 tracking-widest uppercase">
            <span className="text-[#A2BD86] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              LIVE SPATIAL MESH
            </span>
            <span>NCR SECTOR: 28.6139° N, 77.2090° E</span>
            <span>HARDWARE RADAR: 100Hz CALIBRATED</span>
          </div>

          {/* Bottom-Left Corridor Telemetry HUD */}
          <div className="hidden md:flex absolute bottom-24 left-12 flex-col items-start gap-1 font-mono text-[9px] text-text-muted/70 tracking-widest uppercase">
            <span className="text-[#A2BD86] font-semibold">SAFETY CORRIDOR 01</span>
            <span>ENCRYPTED BLE GUARDIAN: ACTIVE</span>
            <span>LATENCY: &lt;14ms REAL-TIME</span>
          </div>
        </div>

        {/* Layer 3: Foreground Content (Floating Forward in 3D Space) */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ transform: 'translateZ(65px)' }}
        >
          {children}
        </div>
      </motion.div>

      {/* Atmospheric Horizon Light & Cinematic Fade Masks */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(6,8,6,0.35)_0%,rgba(6,8,6,0.85)_75%,#060806_100%)] pointer-events-none z-10" />
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#060806] via-[#060806]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#060806] via-[#060806]/90 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 grain-layer opacity-[0.04] mix-blend-soft-light pointer-events-none z-[15]" />
    </div>
  )
}
