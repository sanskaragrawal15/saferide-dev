'use client'

import { useState } from 'react'
import { MapPin, Navigation, Shield, ArrowUpRight, Share2, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PassengerInterfaceReveal() {
  const [selectedRide, setSelectedRide] = useState<'city' | 'prime' | 'ev'>('prime')
  const [sosActive, setSosActive] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const handleShareClick = () => {
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 3000)
  }

  return (
    <section className="py-24 md:py-32 bg-bg-primary border-b border-border-subtle/40 relative overflow-hidden" id="booking-preview">
      {/* Subtle Mesh Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(162,189,134,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container-full relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-border-subtle/40">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-micro font-mono text-mint mb-4 border border-mint/20">
                <span className="w-1.5 h-1.5 rounded-full bg-mint shadow-[0_0_6px_#A2BD86]" />
                <span className="tracking-[0.2em]">03 / THE EXPERIENCE</span>
              </div>
              <h2 className="font-heading font-extrabold uppercase tracking-tight text-white leading-[0.95] text-4xl sm:text-6xl lg:text-7xl">
                CALM. TRANSPARENT. SECURE.
              </h2>
            </div>
            <a
              href="#waitlist"
              className="btn-primary text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap px-8 py-4 rounded-full soft-ui hover:bg-mint/95 shadow-[0_10px_30px_rgba(162,189,134,0.2)]"
            >
              <span>GET EARLY ACCESS</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </a>
          </div>

          {/* Passenger Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Ride Selection */}
            <div className="lg:col-span-5 bento-card rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col gap-6">
              <div className="font-mono text-micro text-mint uppercase tracking-wider pb-3 border-b border-border-subtle/40 flex items-center justify-between">
                <span>RIDE PREVIEW</span>
                <span className="text-[#8FA08B] font-semibold">COMING SOON</span>
              </div>

              {/* Coordinates */}
              <div className="space-y-3">
                <div className="soft-ui rounded-xl p-3.5">
                  <div className="font-mono text-[10px] text-text-muted mb-1 uppercase">Pickup</div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-mint flex-shrink-0" />
                    <span className="text-sm text-text-primary font-medium">Safe Pickup Location</span>
                  </div>
                </div>

                <div className="soft-ui rounded-xl p-3.5">
                  <div className="font-mono text-[10px] text-text-muted mb-1 uppercase">Destination</div>
                  <div className="flex items-center gap-2.5">
                    <Navigation className="w-4 h-4 text-mint flex-shrink-0" />
                    <span className="text-sm text-text-primary font-medium">Your Destination</span>
                  </div>
                </div>
              </div>

              {/* Ride Options */}
              <div className="space-y-2.5 pt-1">
                {/* Option 1: City */}
                <div
                  onClick={() => setSelectedRide('city')}
                  className={cn(
                    'p-3.5 rounded-xl cursor-pointer transition-all border flex items-center justify-between',
                    selectedRide === 'city'
                      ? 'liquid-glass-elevated border-mint/50 shadow-md'
                      : 'soft-ui hover:border-white/10'
                  )}
                >
                  <div>
                    <div className="font-heading font-semibold text-text-primary text-sm flex items-center gap-2">
                      <span>SafeRide City</span>
                      {selectedRide === 'city' && <span className="w-1.5 h-1.5 rounded-full bg-mint" />}
                    </div>
                    <div className="text-xs text-[#909D8E] mt-0.5">Everyday Verified Ride</div>
                  </div>
                  <span className="font-mono font-bold text-mint text-xs">UPFRONT</span>
                </div>

                {/* Option 2: Prime */}
                <div
                  onClick={() => setSelectedRide('prime')}
                  className={cn(
                    'p-3.5 rounded-xl cursor-pointer transition-all border flex items-center justify-between',
                    selectedRide === 'prime'
                      ? 'liquid-glass-elevated border-mint/50 shadow-md'
                      : 'soft-ui hover:border-white/10'
                  )}
                >
                  <div>
                    <div className="font-heading font-semibold text-text-primary text-sm flex items-center gap-2">
                      <span>SafeRide Prime</span>
                      {selectedRide === 'prime' && <span className="w-1.5 h-1.5 rounded-full bg-mint" />}
                    </div>
                    <div className="text-xs text-[#909D8E] mt-0.5">Top-Rated Captain</div>
                  </div>
                  <span className="font-mono font-bold text-mint text-xs">PREMIUM</span>
                </div>

                {/* Option 3: EV */}
                <div
                  onClick={() => setSelectedRide('ev')}
                  className={cn(
                    'p-3.5 rounded-xl cursor-pointer transition-all border flex items-center justify-between',
                    selectedRide === 'ev'
                      ? 'liquid-glass-elevated border-mint/50 shadow-md'
                      : 'soft-ui hover:border-white/10'
                  )}
                >
                  <div>
                    <div className="font-heading font-semibold text-text-primary text-sm flex items-center gap-2">
                      <span>SafeRide Green</span>
                      {selectedRide === 'ev' && <span className="w-1.5 h-1.5 rounded-full bg-mint" />}
                    </div>
                    <div className="text-xs text-[#909D8E] mt-0.5">100% Electric</div>
                  </div>
                  <span className="font-mono font-bold text-mint text-xs">CLEAN</span>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="#waitlist"
                className="btn-primary w-full py-3.5 rounded-full text-center text-xs font-mono font-bold tracking-wider uppercase justify-center soft-ui hover:bg-mint/95 shadow-md mt-1"
              >
                JOIN LAUNCH WAITLIST
              </a>
            </div>

            {/* Right Column: Visualizer */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="relative rounded-2xl md:rounded-3xl p-1 bg-gradient-to-b from-white/[0.08] via-border-subtle/50 to-transparent shadow-2xl">
                <div className="relative aspect-[16/10] w-full rounded-[14px] md:rounded-[22px] bg-[#070908] overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 360" fill="none">
                    <path
                      d="M 60 280 Q 200 240, 280 190 T 440 140 T 540 80"
                      stroke="#1B221E"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 60 280 Q 200 240, 280 190 T 440 140 T 540 80"
                      stroke="#A2BD86"
                      strokeWidth="2.5"
                      strokeDasharray="6 8"
                      strokeLinecap="round"
                    />
                    <circle cx="60" cy="280" r="5" fill="#A2BD86" />
                    <circle cx="280" cy="190" r="7" fill="#A2BD86" />
                    <circle cx="280" cy="190" r="14" stroke="#A2BD86" strokeWidth="1" opacity="0.4" />
                    <circle cx="540" cy="80" r="5" fill="#A2BD86" />
                  </svg>

                  {/* Top Strip */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between liquid-glass rounded-xl px-4 py-2 font-mono text-micro">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-mint shadow-[0_0_8px_#A2BD86]" />
                      <span className="text-text-primary font-medium">PROTECTED CORRIDOR</span>
                    </div>
                    <span className="text-mint font-semibold">MONITORING ACTIVE</span>
                  </div>

                  {/* Bottom Strip */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between gap-3 liquid-glass-elevated rounded-xl p-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-mint" />
                      <span className="font-mono text-micro text-text-primary">SAFETY ACTIVE</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleShareClick}
                        className="btn-secondary text-micro py-2 px-3 rounded-lg flex items-center gap-1.5"
                      >
                        <Share2 className="w-3.5 h-3.5 text-mint" />
                        <span>{copiedLink ? 'LINK COPIED' : 'SHARE LIVE TRIP'}</span>
                      </button>

                      <button
                        onClick={() => setSosActive(!sosActive)}
                        className={cn(
                          'py-2 px-3.5 rounded-lg text-micro font-mono font-bold transition-all',
                          sosActive
                            ? 'bg-red-600 text-white'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                        )}
                      >
                        {sosActive ? 'SOS SENT' : 'EMERGENCY SOS'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Driver Pill */}
              <div className="bento-card rounded-2xl p-4 flex items-center justify-between gap-4 font-mono text-micro">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#445B42]/30 border border-mint/40 flex items-center justify-center text-mint">
                    <Shield className="w-5 h-5 text-mint" />
                  </div>
                  <div>
                    <div className="text-text-primary font-heading font-semibold text-sm">SafeRide Verified Driver</div>
                    <div className="text-[#8FA08B] text-xs font-body">ID Verified • Secret PIN Matched</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-mint font-mono text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
