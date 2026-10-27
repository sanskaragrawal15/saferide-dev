'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setName('')
      setEmail('')
      setMessage('')
    }, 4000)
  }

  return (
    <div className="bg-bg-primary text-text-primary pt-24 md:pt-32 pb-20">
      <div className="container-full">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 font-mono text-micro text-mint mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-mint" />
            <span>OPERATIONAL SUPPORT & INQUIRIES</span>
          </div>

          <h1 className="text-display-md md:text-display-lg font-display uppercase tracking-tight text-text-primary mb-8">
            CONTACT SAFERIDE.
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-xl bg-bg-surface border border-border-subtle flex items-start gap-4">
                <Phone className="w-5 h-5 text-mint mt-1" />
                <div>
                  <div className="font-display font-semibold text-text-primary mb-1 uppercase text-body">
                    24/7 COMMAND DESK
                  </div>
                  <div className="font-mono text-body text-mint font-bold">+91 1800 102 7233</div>
                  <div className="font-mono text-micro text-text-muted mt-1">
                    Toll-free across India for active passenger & fleet inquiries
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-bg-surface border border-border-subtle flex items-start gap-4">
                <Mail className="w-5 h-5 text-mint mt-1" />
                <div>
                  <div className="font-display font-semibold text-text-primary mb-1 uppercase text-body">
                    DIRECT INQUIRIES
                  </div>
                  <div className="font-mono text-body-sm text-text-primary">support@saferide.app</div>
                  <div className="font-mono text-body-sm text-text-primary mt-1">fleets@saferide.app</div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-bg-surface border border-border-subtle flex items-start gap-4">
                <MapPin className="w-5 h-5 text-mint mt-1" />
                <div>
                  <div className="font-display font-semibold text-text-primary mb-1 uppercase text-body">
                    OPERATIONS HEADQUARTERS
                  </div>
                  <div className="text-body-sm text-text-secondary leading-relaxed">
                    SafeRide Mobility Labs
                    <br />
                    Aerocity Horizon Tower, Level 4
                    <br />
                    New Delhi 110037, India
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 p-8 md:p-10 rounded-2xl bg-bg-surface border border-border-subtle shadow-xl">
              <h2 className="font-display text-display-sm uppercase text-text-primary mb-2">
                SEND A MESSAGE
              </h2>
              <p className="text-body-sm text-text-secondary mb-8">
                Our fleet engineering and passenger assistance teams reply within 4 operational hours.
              </p>

              {submitted ? (
                <div className="p-4 rounded-md bg-mint-subtle border border-mint/30 text-mint font-mono text-body-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Your message has been transmitted to our operations team.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-micro text-text-muted mb-1.5 uppercase">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Aarav Sharma"
                        className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-micro text-text-muted mb-1.5 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-micro text-text-muted mb-1.5 uppercase">
                      Message / Fleet Inquiry
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your inquiry (e.g. corporate travel, fleet partnership, hardware inquiry)..."
                      className="w-full p-4 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-3.5 text-label justify-center shadow-mint-glow"
                  >
                    TRANSMIT DISPATCH MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
