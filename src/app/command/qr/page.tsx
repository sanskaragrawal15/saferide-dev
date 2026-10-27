'use client'

import { useState } from 'react'
import { CommandNav } from '@/components/command/CommandNav'
import { QrCode, RefreshCw, ShieldCheck, Clock, CheckCircle2, Copy } from 'lucide-react'

export default function CommandQRPage() {
  const [selectedVehicle, setSelectedVehicle] = useState('DL 01 AB 4829')
  const [selectedDriver, setSelectedDriver] = useState('Rajesh Singh (DRV-8921)')
  const [token, setToken] = useState('sr_pair_8a92f09c12b740e1_exp600')
  const [copied, setCopied] = useState(false)
  const [expiresIn, setExpiresIn] = useState(580)

  const handleGenerate = () => {
    const randomHex = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10)
    setToken(`sr_pair_${randomHex}_exp600`)
    setExpiresIn(600)
  }

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-16 md:pt-20 pb-20">
      <CommandNav />

      <div className="container-full pt-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-border-subtle/50">
            <div>
              <div className="flex items-center gap-2 font-mono text-micro text-mint mb-1.5">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                <span>CRYPTOGRAPHIC SHIFT PROVISIONING</span>
              </div>
              <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
                QR DRIVER & VEHICLE PAIRING.
              </h1>
            </div>

            <div className="font-mono text-micro text-text-muted">
              <span>SECURITY: SINGLE-USE ROTATING TOKEN (10 MIN EXPIRY)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle space-y-6">
              <h3 className="font-display text-headline uppercase text-text-primary">
                PROVISION SHIFT TOKEN
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-micro text-text-muted mb-2 uppercase">
                    Select Vehicle Plate
                  </label>
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary font-mono text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                  >
                    <option value="DL 01 AB 4829">DL 01 AB 4829 (Maruti Dzire Tour)</option>
                    <option value="DL 03 CA 9081">DL 03 CA 9081 (Honda City)</option>
                    <option value="HR 26 CV 3310">HR 26 CV 3310 (Tata Tigor EV)</option>
                    <option value="DL 04 MK 1108">DL 04 MK 1108 (Maruti Ertiga)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-micro text-text-muted mb-2 uppercase">
                    Assign Driver Profile
                  </label>
                  <select
                    value={selectedDriver}
                    onChange={(e) => setSelectedDriver(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary font-mono text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                  >
                    <option value="Rajesh Singh (DRV-8921)">Rajesh Singh (DRV-8921)</option>
                    <option value="Amit Verma (DRV-8922)">Amit Verma (DRV-8922)</option>
                    <option value="Vikram Malhotra (DRV-8923)">Vikram Malhotra (DRV-8923)</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerate}
                  className="btn-primary w-full py-3.5 text-label justify-center gap-2 mt-4"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>GENERATE FRESH PAIRING TOKEN</span>
                </button>
              </div>

              <div className="p-4 rounded-md bg-[#0A0D0B] border border-border-subtle font-mono text-micro text-text-muted space-y-1.5">
                <div>• Single-use server token; invalidates immediately upon driver scan.</div>
                <div>• Contains zero permanent master keys or database credentials.</div>
                <div>• Hardware Guardian validates token signature over BLE.</div>
              </div>
            </div>

            {/* QR Card */}
            <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle flex flex-col items-center justify-center text-center shadow-2xl space-y-6">
              <div className="font-mono text-micro text-mint uppercase">
                Display to Driver on Mobile Scan
              </div>

              {/* High-Contrast Stylized SVG QR Code */}
              <div className="p-6 rounded-2xl bg-white shadow-2xl flex items-center justify-center">
                <svg width="220" height="220" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" fill="white" />
                  {/* Outer corner boxes */}
                  <rect x="10" y="10" width="24" height="24" fill="#050605" />
                  <rect x="14" y="14" width="16" height="16" fill="white" />
                  <rect x="18" y="18" width="8" height="8" fill="#050605" />

                  <rect x="66" y="10" width="24" height="24" fill="#050605" />
                  <rect x="70" y="14" width="16" height="16" fill="white" />
                  <rect x="74" y="18" width="8" height="8" fill="#050605" />

                  <rect x="10" y="66" width="24" height="24" fill="#050605" />
                  <rect x="14" y="70" width="16" height="16" fill="white" />
                  <rect x="18" y="74" width="8" height="8" fill="#050605" />

                  {/* Data matrix pattern dots */}
                  <rect x="42" y="14" width="6" height="6" fill="#050605" />
                  <rect x="52" y="20" width="6" height="6" fill="#050605" />
                  <rect x="44" y="38" width="8" height="8" fill="#050605" />
                  <rect x="58" y="44" width="8" height="8" fill="#050605" />
                  <rect x="24" y="44" width="8" height="8" fill="#050605" />
                  <rect x="74" y="44" width="8" height="8" fill="#050605" />
                  <rect x="42" y="66" width="8" height="8" fill="#050605" />
                  <rect x="54" y="74" width="8" height="8" fill="#050605" />
                  <rect x="68" y="68" width="8" height="8" fill="#050605" />
                  <rect x="78" y="78" width="8" height="8" fill="#050605" />
                </svg>
              </div>

              {/* Token String */}
              <div className="w-full">
                <div className="font-mono text-micro text-text-muted mb-1">PROVISION TOKEN:</div>
                <div className="flex items-center justify-between p-3 rounded-md bg-bg-elevated border border-border-subtle font-mono text-micro text-mint break-all">
                  <span>{token}</span>
                  <button onClick={handleCopy} className="text-text-muted hover:text-mint ml-2">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-micro text-text-muted">
                <Clock className="w-3.5 h-3.5 text-mint" />
                <span>Expires in ~9m 40s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
