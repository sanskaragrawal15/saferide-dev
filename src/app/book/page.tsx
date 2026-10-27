'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Navigation, Shield, ArrowUpRight, CheckCircle2, AlertTriangle, Share2, PhoneCall, Radio, Clock, User, Car, X, ShieldAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore, Trip } from '@/lib/store'

const quickLocations = [
  { name: 'Aerocity Hospitality District, New Delhi', lat: 28.5535, lng: 77.1215 },
  { name: 'Cyber City Tower 10, DLF Phase 2, Gurugram', lat: 28.4952, lng: 77.0894 },
  { name: 'Connaught Place Inner Circle, New Delhi', lat: 28.6315, lng: 77.2167 },
  { name: 'Noida Sector 62 Electronic City, Noida', lat: 28.6280, lng: 77.3649 },
  { name: 'IGI Airport Terminal 3 Departures, New Delhi', lat: 28.5562, lng: 77.1000 },
]

export default function BookPage() {
  const { trips, activeTrip, createTrip, updateTripStatus, triggerSos } = useAppStore()

  const [pickup, setPickup] = useState(quickLocations[0].name)
  const [destination, setDestination] = useState(quickLocations[1].name)
  const [category, setCategory] = useState<'prime' | 'fleet' | 'ev'>('fleet')
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(activeTrip)
  const [sosHolding, setSosHolding] = useState(false)
  const [sosProgress, setSosProgress] = useState(0)
  const [shareToast, setShareToast] = useState(false)
  const [concernModal, setConcernModal] = useState(false)
  const [concernText, setConcernText] = useState('')
  const [concernSubmitted, setConcernSubmitted] = useState(false)

  // SOS Press-and-hold countdown timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (sosHolding) {
      interval = setInterval(() => {
        setSosProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setSosHolding(false)
            if (currentTrip) {
              triggerSos(currentTrip.id)
            }
            return 100
          }
          return prev + 5 // 20 ticks * 150ms = 3.0s
        })
      }, 150)
    } else {
      setSosProgress(0)
    }
    return () => clearInterval(interval)
  }, [sosHolding, currentTrip, triggerSos])

  const calculateFare = (cat: 'prime' | 'fleet' | 'ev') => {
    const base = 120
    const distanceKm = 14.2
    const perKm = cat === 'prime' ? 22 : cat === 'fleet' ? 16 : 18
    return Math.round(base + distanceKm * perKm)
  }

  const handleBook = () => {
    const newTrip = createTrip({
      pickup,
      destination,
      category,
      fare: calculateFare(category),
      distanceKm: 14.2,
      durationMin: 22,
    })
    setCurrentTrip(newTrip)
  }

  const handleStepTrip = () => {
    if (!currentTrip) return
    const sequence: Trip['status'][] = ['accepted', 'en_route', 'arrived', 'in_progress', 'completed']
    const currentIndex = sequence.indexOf(currentTrip.status)
    if (currentIndex < sequence.length - 1) {
      const nextStatus = sequence[currentIndex + 1]
      updateTripStatus(currentTrip.id, nextStatus)
      setCurrentTrip({ ...currentTrip, status: nextStatus })
    }
  }

  const handleReset = () => {
    setCurrentTrip(null)
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 md:pt-28 pb-16">
      <div className="container-full">
        {/* Top Header */}
        <div className="max-w-[1380px] mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle/50 pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-micro text-mint mb-2">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              <span>SAFERIDE PASSENGER APPLICATION</span>
            </div>
            <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
              BOOK A RIDE.
            </h1>
          </div>

          <div className="flex items-center gap-3 font-mono text-micro text-text-muted">
            <span className="px-3 py-1.5 rounded-sm bg-bg-elevated border border-border-subtle">
              OPERATING ZONE: NCR (DELHI • GURUGRAM • NOIDA)
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form or Active Trip Console */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {!currentTrip || currentTrip.status === 'completed' ? (
              /* Booking Form State */
              <div className="p-6 md:p-8 rounded-xl bg-bg-surface border border-border-subtle shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                  <span className="font-mono text-micro text-text-primary font-bold uppercase">
                    JOURNEY PARAMETERS
                  </span>
                  <span className="font-mono text-micro text-mint">FIXED RATE METER</span>
                </div>

                {/* Pickup Field */}
                <div>
                  <label className="block font-mono text-micro text-text-muted mb-2 uppercase">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-mint pointer-events-none" />
                    <select
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                    >
                      {quickLocations.map((loc) => (
                        <option key={loc.name} value={loc.name}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Destination Field */}
                <div>
                  <label className="block font-mono text-micro text-text-muted mb-2 uppercase">
                    Destination
                  </label>
                  <div className="relative">
                    <Navigation className="absolute left-3.5 top-3.5 w-4 h-4 text-mint pointer-events-none" />
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                    >
                      {quickLocations.map((loc) => (
                        <option key={loc.name} value={loc.name}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Category Selector */}
                <div>
                  <label className="block font-mono text-micro text-text-muted mb-3 uppercase">
                    Select Vehicle Class
                  </label>
                  <div className="space-y-3">
                    {/* Fleet Commercial Cab */}
                    <div
                      onClick={() => setCategory('fleet')}
                      className={cn(
                        'p-4 rounded-lg cursor-pointer transition-all border flex items-center justify-between',
                        category === 'fleet'
                          ? 'bg-bg-elevated border-mint shadow-[0_0_20px_rgba(162,189,134,0.15)]'
                          : 'bg-bg-surface border-border-subtle hover:border-[#38433B]'
                      )}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-md bg-[#121714] border border-border-subtle flex items-center justify-center font-display font-bold text-mint">
                          FL
                        </div>
                        <div>
                          <div className="font-display font-semibold text-text-primary text-body">
                            SafeRide Commercial Cab
                          </div>
                          <div className="font-mono text-micro text-text-muted">
                            Rooftop Sign Illuminated • 4 Seats • 2 min
                          </div>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-body font-bold text-mint">₹{calculateFare('fleet')}</div>
                        <div className="text-micro text-text-muted">Guaranteed</div>
                      </div>
                    </div>

                    {/* SafeRide Prime Sedan */}
                    <div
                      onClick={() => setCategory('prime')}
                      className={cn(
                        'p-4 rounded-lg cursor-pointer transition-all border flex items-center justify-between',
                        category === 'prime'
                          ? 'bg-bg-elevated border-mint shadow-[0_0_20px_rgba(162,189,134,0.15)]'
                          : 'bg-bg-surface border-border-subtle hover:border-[#38433B]'
                      )}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-md bg-[#121714] border border-border-subtle flex items-center justify-center font-display font-bold text-mint">
                          PR
                        </div>
                        <div>
                          <div className="font-display font-semibold text-text-primary text-body">
                            SafeRide Prime Sedan
                          </div>
                          <div className="font-mono text-micro text-text-muted">
                            Premium Executive • Guardian BLE • 4 min
                          </div>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-body font-bold text-mint">₹{calculateFare('prime')}</div>
                        <div className="text-micro text-text-muted">Guaranteed</div>
                      </div>
                    </div>

                    {/* SafeRide EV */}
                    <div
                      onClick={() => setCategory('ev')}
                      className={cn(
                        'p-4 rounded-lg cursor-pointer transition-all border flex items-center justify-between',
                        category === 'ev'
                          ? 'bg-bg-elevated border-mint shadow-[0_0_20px_rgba(162,189,134,0.15)]'
                          : 'bg-bg-surface border-border-subtle hover:border-[#38433B]'
                      )}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-md bg-[#121714] border border-border-subtle flex items-center justify-center font-display font-bold text-mint">
                          EV
                        </div>
                        <div>
                          <div className="font-display font-semibold text-text-primary text-body">
                            SafeRide Green EV
                          </div>
                          <div className="font-mono text-micro text-text-muted">
                            Zero Emission • IoT Guardian • 5 min
                          </div>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-body font-bold text-mint">₹{calculateFare('ev')}</div>
                        <div className="text-micro text-text-muted">Guaranteed</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleBook}
                  className="btn-primary w-full py-4 text-label shadow-mint-glow hover:shadow-mint-glow-lg transition-all"
                >
                  REQUEST SAFERIDE CAB (₹{calculateFare(category)})
                </button>
              </div>
            ) : (
              /* Active Trip Console */
              <div className="p-6 md:p-8 rounded-xl bg-bg-surface border border-border-subtle shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                  <div className="flex items-center gap-2 font-mono text-micro">
                    <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                    <span className="text-mint font-bold uppercase">
                      STATUS: {currentTrip.status.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="font-mono text-micro text-text-muted">{currentTrip.id}</span>
                </div>

                {/* Driver & Vehicle Box */}
                <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-mint/20 border border-mint/40 flex items-center justify-center font-display font-bold text-mint text-body">
                      RS
                    </div>
                    <div>
                      <div className="font-display font-semibold text-text-primary text-body">
                        {currentTrip.driverName}
                      </div>
                      <div className="font-mono text-micro text-mint">
                        {currentTrip.vehiclePlate} • {currentTrip.vehicleModel}
                      </div>
                      <div className="font-mono text-[10px] text-text-muted">
                        ROOFTOP SIGN: POWERED BY SAFERIDE (ACTIVE)
                      </div>
                    </div>
                  </div>

                  <a
                    href={`tel:${currentTrip.driverPhone}`}
                    className="p-3 rounded-full bg-bg-surface border border-border-subtle text-mint hover:bg-mint hover:text-bg-primary transition-colors"
                    aria-label="Call Driver"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>

                {/* Location recap */}
                <div className="space-y-2 font-mono text-micro text-text-muted">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-mint mt-0.5" />
                    <span className="text-text-primary">{currentTrip.pickup}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Navigation className="w-3.5 h-3.5 text-mint mt-0.5" />
                    <span className="text-text-primary">{currentTrip.destination}</span>
                  </div>
                </div>

                {/* Interactive Demo Simulation Controls */}
                <div className="p-4 rounded-lg bg-[#0C0F0D] border border-border-subtle space-y-3 font-mono text-micro">
                  <div className="text-text-muted uppercase">DEMO SIMULATION CONTROLS</div>
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={handleStepTrip}
                      className="btn-secondary text-micro py-2.5 px-4 flex-1 justify-center"
                    >
                      {currentTrip.status === 'accepted'
                        ? 'DRIVER EN ROUTE →'
                        : currentTrip.status === 'en_route'
                        ? 'DRIVER ARRIVED →'
                        : currentTrip.status === 'arrived'
                        ? 'START JOURNEY →'
                        : currentTrip.status === 'in_progress'
                        ? 'COMPLETE TRIP →'
                        : 'COMPLETED'}
                    </button>
                    <button
                      onClick={handleReset}
                      className="btn-ghost text-micro py-2.5 px-3 text-text-muted hover:text-text-primary"
                    >
                      RESET
                    </button>
                  </div>
                </div>

                {/* Safety Controls Action Strip */}
                <div className="space-y-3 pt-4 border-t border-border-subtle/50">
                  <div className="font-mono text-micro text-text-muted uppercase">Trip Safety Controls</div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setShareToast(true)
                        setTimeout(() => setShareToast(false), 3000)
                      }}
                      className="btn-secondary text-micro py-3 justify-center gap-2"
                    >
                      <Share2 className="w-3.5 h-3.5 text-mint" />
                      <span>SHARE TRIP</span>
                    </button>

                    <button
                      onClick={() => setConcernModal(true)}
                      className="btn-secondary text-micro py-3 justify-center gap-2"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                      <span>REPORT CONCERN</span>
                    </button>
                  </div>

                  {/* Press-and-Hold Emergency SOS Button */}
                  <div className="relative pt-2">
                    <button
                      onMouseDown={() => setSosHolding(true)}
                      onMouseUp={() => setSosHolding(false)}
                      onTouchStart={() => setSosHolding(true)}
                      onTouchEnd={() => setSosHolding(false)}
                      className={cn(
                        'relative w-full py-4 rounded-md font-mono text-label font-bold tracking-wider overflow-hidden transition-all select-none',
                        currentTrip.sosTriggered
                          ? 'bg-error text-white shadow-[0_0_20px_#E53E3E]'
                          : 'bg-error/15 text-error border border-error/40 hover:bg-error/25'
                      )}
                    >
                      {/* Fill Progress Bar for 3s hold */}
                      {sosHolding && (
                        <div
                          className="absolute inset-y-0 left-0 bg-error/40 transition-all duration-150"
                          style={{ width: `${sosProgress}%` }}
                        />
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <ShieldAlert className="w-4 h-4" />
                        {currentTrip.sosTriggered
                          ? 'EMERGENCY SOS ACTIVE (DISPATCH ALERTED)'
                          : sosHolding
                          ? `HOLDING... ${Math.round(sosProgress)}%`
                          : 'PRESS & HOLD SOS (3 SECONDS)'}
                      </span>
                    </button>
                    <div className="text-center font-mono text-[10px] text-text-muted mt-1.5">
                      Transmits GPS coordinates to Command Centre and pre-configured emergency contacts.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Vector Map with Route & Hardware Signals */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative aspect-[16/11] w-full rounded-2xl bg-[#060807] border border-border-subtle overflow-hidden shadow-2xl p-6 flex flex-col justify-between">
              {/* Grid Canvas */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #272D28 1px, transparent 1px), linear-gradient(to bottom, #272D28 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              />

              {/* Top Vector Map Overlay */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 bg-bg-surface/90 backdrop-blur-md p-3.5 rounded-lg border border-border-subtle font-mono text-micro">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                  <span className="text-text-primary font-bold">
                    {currentTrip ? `TRANSIT: ${currentTrip.status.toUpperCase()}` : 'MAP RADAR STANDBY'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-text-muted">
                  <span>DISTANCE: 14.2 KM</span>
                  <span className="text-border-subtle">|</span>
                  <span className="text-mint">CORRIDOR: OPTIMAL</span>
                </div>
              </div>

              {/* Stylized Vector Route Canvas */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 650 420" fill="none">
                {/* City Blocks outline */}
                <rect x="80" y="80" width="100" height="70" stroke="#161B18" strokeWidth="1" fill="#0A0D0B" />
                <rect x="220" y="70" width="120" height="80" stroke="#161B18" strokeWidth="1" fill="#0A0D0B" />
                <rect x="380" y="90" width="160" height="90" stroke="#161B18" strokeWidth="1" fill="#0A0D0B" />
                <rect x="120" y="240" width="140" height="90" stroke="#161B18" strokeWidth="1" fill="#0A0D0B" />
                <rect x="320" y="250" width="180" height="100" stroke="#161B18" strokeWidth="1" fill="#0A0D0B" />

                {/* Primary Route Path */}
                <path
                  d="M 80 340 C 180 320, 240 240, 340 220 C 440 200, 480 140, 560 110"
                  stroke="#1B241E"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M 80 340 C 180 320, 240 240, 340 220 C 440 200, 480 140, 560 110"
                  stroke="#A2BD86"
                  strokeWidth="3.5"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                />

                {/* Origin Marker */}
                <circle cx="80" cy="340" r="7" fill="#A2BD86" />
                <text x="95" y="345" fill="#A0AAA2" fontSize="11" fontFamily="monospace">
                  PICKUP
                </text>

                {/* Car Position Marker */}
                <g transform="translate(340, 220)">
                  <circle cx="0" cy="0" r="8" fill="#A2BD86" />
                  <circle cx="0" cy="0" r="20" stroke="#A2BD86" strokeWidth="1" className="animate-ping opacity-60" />
                  <rect x="-18" y="-30" width="36" height="16" rx="3" fill="#111512" stroke="#272D28" />
                  <text x="0" y="-19" fill="#A2BD86" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    CAB
                  </text>
                </g>

                {/* Destination Marker */}
                <circle cx="560" cy="110" r="7" fill="#A2BD86" />
                <text x="470" y="100" fill="#A2BD86" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  DESTINATION
                </text>
              </svg>

              {/* Bottom Telemetry HUD */}
              <div className="relative z-10 bg-bg-surface/90 backdrop-blur-md p-4 rounded-xl border border-border-subtle font-mono text-micro text-text-muted flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Radio className="w-4 h-4 text-mint animate-pulse" />
                  <span className="text-text-primary font-bold">SPARROW GUARDIAN v0.4</span>
                  <span className="text-mint bg-mint-subtle px-2 py-0.5 rounded-sm">LOCKED (0x9E)</span>
                </div>
                <div className="flex items-center gap-6">
                  <span>IMU: 0.04G</span>
                  <span>ACOUSTIC: 52 dBA</span>
                  <span>GPS: 12 SATS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Toast */}
      {shareToast && (
        <div className="fixed bottom-8 right-8 z-50 p-4 rounded-md bg-bg-surface border border-mint shadow-2xl font-mono text-micro text-text-primary flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-mint" />
          <span>Encrypted live trip URL copied to clipboard for sharing.</span>
        </div>
      )}

      {/* Report Concern Modal */}
      {concernModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 md:p-8 rounded-xl bg-bg-surface border border-border-subtle shadow-2xl relative">
            <button
              onClick={() => {
                setConcernModal(false)
                setConcernSubmitted(false)
              }}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-display-sm text-text-primary mb-2">
              REPORT A JOURNEY CONCERN
            </h3>
            <p className="text-body-sm text-text-secondary mb-6">
              Our 24/7 Command Centre will review this note immediately with active vehicle telemetry.
            </p>

            {concernSubmitted ? (
              <div className="p-4 rounded-md bg-mint-subtle border border-mint/30 text-mint font-mono text-body-sm">
                Concern registered. Incident report #INC-901 opened in Command Centre.
              </div>
            ) : (
              <div className="space-y-4">
                <textarea
                  rows={4}
                  value={concernText}
                  onChange={(e) => setConcernText(e.target.value)}
                  placeholder="Describe your observation (e.g. unexpected detour, reckless driver behavior, hardware light off)..."
                  className="w-full p-3.5 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setConcernModal(false)}
                    className="btn-ghost text-micro"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={() => setConcernSubmitted(true)}
                    className="btn-primary text-micro"
                  >
                    TRANSMIT NOTE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
