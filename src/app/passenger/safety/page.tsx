'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { ArrowLeft, Plus, Shield, Phone, User, Trash2, CheckCircle2 } from 'lucide-react'

export default function PassengerSafetyPage() {
  const { currentUser, addEmergencyContact } = useAppStore()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [relation, setRelation] = useState('')
  const [success, setSuccess] = useState(false)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) return
    addEmergencyContact({ name, phone, relation: relation || 'Contact' })
    setName('')
    setPhone('')
    setRelation('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 md:pt-28 pb-16">
      <div className="container-full">
        <div className="max-w-[1380px] mx-auto">
          {/* Back */}
          <div className="mb-6">
            <Link
              href="/passenger"
              className="inline-flex items-center gap-2 text-micro font-mono text-text-muted hover:text-mint transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO PASSENGER OVERVIEW</span>
            </Link>
          </div>

          {/* Header */}
          <div className="pb-8 mb-8 border-b border-border-subtle/50">
            <div className="flex items-center gap-2 font-mono text-micro text-mint mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint" />
              <span>CRISIS AUTOMATION</span>
            </div>
            <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary">
              EMERGENCY CONTACTS & PREFERENCES.
            </h1>
            <p className="text-body text-text-secondary mt-2 max-w-xl">
              Configured contacts automatically receive your encrypted live location and vehicle plate number whenever you trigger the emergency SOS.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Contact List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="font-mono text-micro text-text-muted uppercase">Active Emergency Circle</div>

              {currentUser.emergencyContacts && currentUser.emergencyContacts.length > 0 ? (
                currentUser.emergencyContacts.map((contact, idx) => (
                  <div
                    key={contact.phone + idx}
                    className="p-6 rounded-xl bg-bg-surface border border-border-subtle flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-mint/20 border border-mint/40 flex items-center justify-center font-bold text-mint font-mono">
                        {contact.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-display font-semibold text-text-primary text-body">
                          {contact.name}
                        </div>
                        <div className="font-mono text-micro text-text-muted">
                          {contact.phone} • {contact.relation}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-micro text-mint">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>SMS SYNCED</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 rounded-xl bg-bg-surface border border-border-subtle text-center text-text-muted font-mono text-body-sm">
                  No emergency contacts configured yet. Add your trusted contacts below.
                </div>
              )}
            </div>

            {/* Right: Add Form */}
            <div className="lg:col-span-5 p-6 md:p-8 rounded-xl bg-bg-surface border border-border-subtle">
              <h3 className="font-display text-headline uppercase text-text-primary mb-4">
                ADD TRUSTED CONTACT
              </h3>

              {success && (
                <div className="p-3 mb-4 rounded-md bg-mint-subtle border border-mint/30 text-mint font-mono text-micro flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Contact successfully saved and activated.</span>
                </div>
              )}

              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block font-mono text-micro text-text-muted mb-1.5 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Pooja Sharma"
                    className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                  />
                </div>

                <div>
                  <label className="block font-mono text-micro text-text-muted mb-1.5 uppercase">
                    Phone Number (SMS Enabled)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98100 12345"
                    className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                  />
                </div>

                <div>
                  <label className="block font-mono text-micro text-text-muted mb-1.5 uppercase">
                    Relationship
                  </label>
                  <input
                    type="text"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    placeholder="e.g. Spouse / Sibling / Colleague"
                    className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 text-label justify-center mt-2"
                >
                  SAVE EMERGENCY CONTACT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
