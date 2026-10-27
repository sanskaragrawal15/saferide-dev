'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAppStore, Trip } from '@/lib/store'
import { Car, Radio, Shield, MapPin, Navigation, Power, CheckCircle2, XCircle, ArrowUpRight, AlertTriangle, PhoneCall } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DriverDashboard() {
  const { driverOnline, setDriverOnline, activeTrip, updateTripStatus } = useAppStore()

  const [simulatedRequest, setSimulatedRequest] = useState<Trip | null>(
    activeTrip && activeTrip.status === 'requested' ? activeTrip : null
  )

  const handleToggleOnline = () => {
    setDriverOnline(!driverOnline)
  }

  const handleAcceptRequest = () => {
    if (activeTrip) {
      updateTripStatus(activeTrip.id, 'accepted')
    }
    setSimulatedRequest(null)
  }

  const handleRejectRequest = () => {
    setSimulatedRequest(null)
  }

  const handleProgressTrip = (nextStatus: Trip['status']) => {
    if (activeTrip) {
      updateTripStatus(activeTrip.id, nextStatus)
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 md:pt-28 pb-16">
      <div className="container-full">
        <div className="max-w-[1380px] mx-auto">
          {/* Top Bar with Online/Offline Switch */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-border-subtle/50">
            <div>
              <div className="flex items-center gap-2 font-mono text-micro text-mint mb-2">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                <span>COMMERCIAL CAB DRIVER CONSOLE</span>
              </div>
              <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
                DRIVER PORTAL.
              </h1>
            </div>

            {/* Online/Offline Toggle Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleToggleOnline}
                className={cn(
                  'px-6 py-3 rounded-md font-mono text-label font-bold flex items-center gap-3 transition-all',
                  driverOnline
                    ? 'bg-mint text-bg-primary shadow-mint-glow hover:bg-mint/90'
                    : 'bg-bg-elevated text-text-muted border border-border-subtle hover:text-text-primary'
                )}
              >
                <Power className="w-4 h-4" />
                <span>{driverOnline ? 'ONLINE & ACCEPTING TRIPS' : 'OFFLINE / OFF DUTY'}</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 font-mono text-micro text-text-muted border-l border-border-subtle pl-4">
                <span>VEHICLE: DL 01 AB 4829</span>
                <span className="text-border-subtle">•</span>
                <span className="text-mint">ROOFTOP SIGN: ON</span>
              </div>
            </div>
          </div>

          {/* Sub Navigation Strip */}
          <div className="flex flex-wrap items-center gap-3 mb-10 font-mono text-micro">
            <Link href="/driver" className="px-4 py-2 rounded-sm bg-mint text-bg-primary font-bold">
              CONSOLE
            </Link>
            <Link href="/driver/trips" className="px-4 py-2 rounded-sm bg-bg-surface text-text-secondary hover:text-text-primary border border-border-subtle">
              COMPLETED SHIFTS
            </Link>
            <Link href="/driver/vehicle" className="px-4 py-2 rounded-sm bg-bg-surface text-text-secondary hover:text-text-primary border border-border-subtle">
              VEHICLE & GUARDIAN
            </Link>
            <Link href="/driver/safety" className="px-4 py-2 rounded-sm bg-bg-surface text-text-secondary hover:text-text-primary border border-border-subtle">
              DRIVER SAFETY
            </Link>
            <Link href="/driver/profile" className="px-4 py-2 rounded-sm bg-bg-surface text-text-secondary hover:text-text-primary border border-border-subtle">
              DRIVER CREDENTIALS
            </Link>
          </div>

          {/* Incoming Request Alert Modal or Card if active */}
          {driverOnline && simulatedRequest && (
            <div className="mb-10 p-6 md:p-8 rounded-xl bg-[#0F1410] border-2 border-mint shadow-mint-glow-lg animate-pulse-subtle">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-micro text-mint mb-2">
                    <Radio className="w-4 h-4 text-mint animate-pulse" />
                    <span className="font-bold uppercase">INCOMING PASSENGER REQUEST • 14.2 KM</span>
                  </div>
                  <h3 className="text-display-sm font-display text-text-primary mb-2">
                    ₹{simulatedRequest.fare} Guaranteed Fare
                  </h3>
                  <div className="space-y-1 font-mono text-body-sm text-text-secondary">
                    <div>PICKUP: {simulatedRequest.pickup}</div>
                    <div>DEST: {simulatedRequest.destination}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleRejectRequest}
                    className="btn-danger text-label px-6 py-3.5"
                  >
                    DECLINE
                  </button>
                  <button
                    onClick={handleAcceptRequest}
                    className="btn-primary text-label px-8 py-3.5 shadow-mint-glow"
                  >
                    ACCEPT TRIP (25s)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Trip Workflow if assigned */}
          {activeTrip && activeTrip.status !== 'completed' && activeTrip.status !== 'requested' ? (
            <div className="mb-12 p-8 rounded-xl bg-bg-surface border border-border-subtle shadow-2xl">
              <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-border-subtle font-mono text-micro">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-mint animate-pulse" />
                  <span className="text-mint font-bold uppercase">
                    ACTIVE ASSIGNMENT • {activeTrip.id}
                  </span>
                </div>
                <span className="text-text-muted">
                  CURRENT STAGE: <span className="text-text-primary font-bold uppercase">{activeTrip.status.replace('_', ' ')}</span>
                </span>
              </div>

              {/* Passenger Info & Locations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle">
                    <div className="text-micro font-mono text-text-muted mb-1 uppercase">Passenger Details</div>
                    <div className="text-body font-bold text-text-primary">Aarav Sharma</div>
                    <div className="font-mono text-micro text-mint mt-1">4.92 ★ Passenger Rating</div>
                  </div>

                  <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle font-mono text-micro space-y-2">
                    <div>
                      <span className="text-text-muted">PICKUP:</span> {activeTrip.pickup}
                    </div>
                    <div>
                      <span className="text-text-muted">DEST:</span> {activeTrip.destination}
                    </div>
                  </div>
                </div>

                {/* Workflow Transitions */}
                <div className="p-6 rounded-lg bg-bg-elevated border border-border-subtle flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-micro text-mint mb-2 uppercase">Trip Status Progression</div>
                    <p className="text-body-sm text-text-secondary leading-relaxed mb-6">
                      Click the sequential action button below as you progress through the passenger journey.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {activeTrip.status === 'accepted' && (
                      <button
                        onClick={() => handleProgressTrip('en_route')}
                        className="btn-primary w-full py-3.5 text-label justify-center"
                      >
                        STEP 1: MARK EN ROUTE TO PICKUP
                      </button>
                    )}

                    {activeTrip.status === 'en_route' && (
                      <button
                        onClick={() => handleProgressTrip('arrived')}
                        className="btn-primary w-full py-3.5 text-label justify-center"
                      >
                        STEP 2: CONFIRM ARRIVAL AT PICKUP
                      </button>
                    )}

                    {activeTrip.status === 'arrived' && (
                      <button
                        onClick={() => handleProgressTrip('in_progress')}
                        className="btn-primary w-full py-3.5 text-label justify-center"
                      >
                        STEP 3: START TRANSIT (PASSENGER ABOARD)
                      </button>
                    )}

                    {activeTrip.status === 'in_progress' && (
                      <button
                        onClick={() => handleProgressTrip('completed')}
                        className="btn-primary w-full py-3.5 text-label justify-center"
                      >
                        STEP 4: COMPLETE JOURNEY & COLLECT FARE (₹{activeTrip.fare})
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Standby Card */
            <div className="mb-12 p-10 rounded-xl bg-bg-surface border border-border-subtle text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mint/10 border border-mint/20 flex items-center justify-center text-mint">
                <Car className="w-8 h-8" />
              </div>
              <h2 className="text-display-sm font-display text-text-primary uppercase mb-2">
                {driverOnline ? 'AWAITING DISPATCH' : 'DRIVER OFFLINE'}
              </h2>
              <p className="text-body text-text-secondary max-w-md mx-auto mb-6">
                {driverOnline
                  ? 'Your vehicle is linked to the SafeRide dispatch network. Keep this screen open to receive instant ride requests.'
                  : 'Toggle the switch above to go online and begin receiving passenger assignments.'}
              </p>
            </div>
          )}

          {/* Today's Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-mono text-micro">
            <div className="p-6 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="text-text-muted mb-2">TODAY'S EARNINGS</div>
              <div className="text-display-sm font-display text-mint font-bold">₹2,840</div>
              <div className="text-text-muted mt-2">6 Trips Completed</div>
            </div>

            <div className="p-6 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="text-text-muted mb-2">ONLINE HOURS</div>
              <div className="text-display-sm font-display text-text-primary font-bold">5h 42m</div>
              <div className="text-text-muted mt-2">Shift active</div>
            </div>

            <div className="p-6 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="text-text-muted mb-2">DRIVER RATING</div>
              <div className="text-display-sm font-display text-mint font-bold">4.96 ★</div>
              <div className="text-text-muted mt-2">1,480 lifetime reviews</div>
            </div>

            <div className="p-6 rounded-xl bg-bg-surface border border-border-subtle">
              <div className="text-text-muted mb-2">GUARDIAN BLE</div>
              <div className="text-display-sm font-display text-text-primary font-bold">100% OK</div>
              <div className="text-text-muted mt-2">Hardware synced</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
