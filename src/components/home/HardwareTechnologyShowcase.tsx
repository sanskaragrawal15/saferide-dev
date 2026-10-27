'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Cpu, ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const hardwareSpecs = [
  {
    name: 'Secure Automotive Compute Engine',
    detail: 'Automotive-grade controller handling encrypted Bluetooth communication, verification handshakes, and local safety logic.',
    spec: 'AUTOMOTIVE EMBEDDED',
  },
  {
    name: 'Multi-Axis Motion Sensor Suite',
    detail: 'Precise motion sensing measuring acceleration vectors, abrupt deceleration, and collision profiles in real time.',
    spec: 'MULTI-AXIS INERTIAL',
  },
  {
    name: 'Acoustic Anomaly Detector',
    detail: 'High-fidelity acoustic sensor evaluating ambient noise thresholds to identify abrupt decibel spikes or physical distress.',
    spec: 'DIGITAL ACOUSTIC',
  },
  {
    name: 'Autonomous Multi-Satellite GPS',
    detail: 'Independent positioning engine providing reliable location tracking with continuous velocity verification.',
    spec: 'MULTI-CONSTELLATION GNSS',
  },
  {
    name: 'Autonomous Cellular Redundancy',
    detail: 'Secondary backup uplink delivering autonomous emergency packet transmission even when primary mobile signals degrade.',
    spec: 'REDUNDANT UPLINK',
  },
]

const pipelineSteps = [
  { label: '01 / SENSE', title: 'Vehicle Motion & Safety Sampling', desc: 'Continuous sensor monitoring and acoustic event surveillance.' },
  { label: '02 / EDGE', title: 'Intelligent Edge Filtering', desc: 'Threshold filtering eliminates minor road vibrations and potholes locally.' },
  { label: '03 / UPLINK', title: 'Encrypted Telemetry Sync', desc: 'Encrypted safety telemetry forwarded via secure mobile gateway and backup uplink.' },
  { label: '04 / ANALYZE', title: 'SafeRide Cloud Verification', desc: 'Correlates route corridor, vehicle velocity, and passenger safety status.' },
  { label: '05 / TRIAGE', title: 'Immediate Safety Dispatch', desc: 'Rapid response queue for trained safety supervisors and emergency contact alerts.' },
]

export function HardwareTechnologyShowcase() {
  const [activeSpec, setActiveSpec] = useState(0)

  return (
    <section className="section-padding bg-bg-secondary border-b border-border-subtle/40 relative overflow-hidden" id="technology-showcase">
      {/* Halftone Texture Grid */}
      <div className="absolute inset-0 halftone-pattern opacity-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(162,189,134,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container-full relative z-10">
        <div className="max-w-[1440px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-border-subtle/40">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-micro font-mono text-mint mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-mint shadow-[0_0_6px_#A2BD86]" />
                <span className="tracking-[0.2em]">06 / PHYSICAL ARCHITECTURE</span>
              </div>
              <h2 className="text-display-md md:text-display-lg font-display uppercase tracking-tight text-text-primary">
                CONNECTED HARDWARE.
                <br />
                <span className="masked-mint">SPARROW GUARDIAN v0.4.</span>
              </h2>
            </div>
            <p className="text-body text-text-secondary max-w-md leading-relaxed">
              A bespoke in-vehicle safety computer designed to provide physical proof of transit,
              tamper resistance, and autonomous telemetry.
            </p>
          </div>

          {/* Clean Hardware Architecture Bento Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            {/* Left Column: Technical Schematic Blueprint with Liquid Frosted Glass */}
            <div className="lg:col-span-7 bento-card rounded-2xl md:rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-border-subtle/40 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg liquid-glass flex items-center justify-center text-mint">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-micro text-text-primary tracking-widest uppercase font-semibold">
                      SPARROW GUARDIAN REV4
                    </span>
                  </div>
                  <span className="font-mono text-micro text-mint liquid-glass px-3 py-1 rounded-full border border-mint/20">
                    FIRMWARE v0.4 BLE
                  </span>
                </div>

                <div className="py-6 space-y-4">
                  <div className="font-display text-display-sm text-text-primary uppercase tracking-tight">
                    {hardwareSpecs[activeSpec].name}
                  </div>
                  <div className="font-mono text-micro text-mint">
                    SPECIFICATION: {hardwareSpecs[activeSpec].spec}
                  </div>
                  <p className="text-body text-text-secondary leading-relaxed">
                    {hardwareSpecs[activeSpec].detail}
                  </p>
                </div>
              </div>

              {/* Bottom Telemetry Metrics with Soft UI Insets */}
              <div className="pt-8 border-t border-border-subtle/40 grid grid-cols-3 gap-4 font-mono text-micro text-center">
                <div className="soft-ui rounded-xl p-3">
                  <div className="text-text-primary font-bold text-body">100 HZ</div>
                  <div className="text-text-muted mt-1">IMU POLLING</div>
                </div>
                <div className="soft-ui rounded-xl p-3">
                  <div className="text-mint font-bold text-body">BLE 5.0</div>
                  <div className="text-text-muted mt-1">AUTHENTICATED</div>
                </div>
                <div className="soft-ui rounded-xl p-3">
                  <div className="text-text-primary font-bold text-body">4.2V LI-ION</div>
                  <div className="text-text-muted mt-1">AUTONOMOUS BACKUP</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hardware Subsystem Selector with Tactile Soft UI Tabs */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                {hardwareSpecs.map((spec, index) => {
                  const isSelected = activeSpec === index
                  return (
                    <div
                      key={spec.name}
                      onClick={() => setActiveSpec(index)}
                      className={cn(
                        'p-4 rounded-xl cursor-pointer transition-all border flex items-center justify-between',
                        isSelected
                          ? 'liquid-glass-elevated border-mint/50 shadow-[0_10px_30px_rgba(162,189,134,0.12)] text-text-primary'
                          : 'soft-ui text-text-secondary hover:text-text-primary hover:border-white/10'
                      )}
                    >
                      <div>
                        <div className="font-display text-body font-semibold">
                          {spec.name}
                        </div>
                        <div className="font-mono text-micro text-text-muted mt-0.5">
                          {spec.spec}
                        </div>
                      </div>
                      <span className={cn('font-mono text-micro px-2.5 py-1 rounded-md', isSelected ? 'bg-mint text-bg-primary font-bold' : 'text-text-muted')}>
                        {isSelected ? 'ACTIVE' : 'INSPECT'}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div>
                <Link
                  href="/technology"
                  className="btn-secondary w-full py-4 rounded-full justify-center text-label soft-ui hover:border-mint/40"
                >
                  <span>FULL HARDWARE & FIRMWARE SPECS</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Clean Telemetry Pipeline Sequence */}
          <div className="pt-12 border-t border-border-subtle/40">
            <div className="font-mono text-micro text-mint mb-8 uppercase tracking-wider">
              TELEMETRY & SAFETY EVENT SEQUENCE
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {pipelineSteps.map((step) => (
                <div key={step.label} className="soft-ui rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-micro text-mint mb-2">{step.label}</div>
                    <div className="font-display font-semibold text-text-primary text-body mb-2">{step.title}</div>
                    <div className="text-body-sm text-text-secondary leading-relaxed">{step.desc}</div>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border-subtle/30 flex items-center gap-1.5 text-micro font-mono text-text-muted">
                    <CheckCircle2 className="w-3.5 h-3.5 text-mint" />
                    <span>VERIFIED STEP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
