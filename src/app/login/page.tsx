'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppStore, UserRole } from '@/lib/store'
import { Shield, ArrowRight, User, Car, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAppStore()

  const [email, setEmail] = useState('aarav@saferide.app')
  const [password, setPassword] = useState('••••••••••••')
  const [role, setRole] = useState<UserRole>('passenger')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, role)
    if (role === 'passenger') {
      router.push('/passenger')
    } else if (role === 'driver') {
      router.push('/driver')
    } else if (role === 'fleet_operator') {
      router.push('/command')
    } else {
      router.push('/command')
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-24 md:pt-32 pb-20 flex flex-col justify-center">
      <div className="container-full">
        <div className="max-w-[520px] mx-auto p-8 md:p-10 rounded-2xl bg-bg-surface border border-border-subtle shadow-2xl">
          <div className="flex items-center gap-2 font-mono text-micro text-mint mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-mint" />
            <span>AUTHENTICATED PORTAL ACCESS</span>
          </div>

          <h1 className="text-display-sm md:text-display-md font-display uppercase tracking-tight text-text-primary mb-2">
            SIGN IN TO SAFERIDE.
          </h1>
          <p className="text-body-sm text-text-secondary mb-8">
            Access your passenger console, driver shift controls, or fleet operations center.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selector Tabs */}
            <div>
              <label className="block font-mono text-micro text-text-muted mb-2 uppercase">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono text-micro">
                <button
                  type="button"
                  onClick={() => {
                    setRole('passenger')
                    setEmail('aarav@saferide.app')
                  }}
                  className={cn(
                    'p-2.5 rounded-sm border flex flex-col items-center gap-1.5 transition-all',
                    role === 'passenger'
                      ? 'bg-mint text-bg-primary font-bold shadow-mint-glow'
                      : 'bg-bg-elevated text-text-secondary border-border-subtle hover:text-text-primary'
                  )}
                >
                  <User className="w-4 h-4" />
                  <span>PASSENGER</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRole('driver')
                    setEmail('rajesh.driver@saferide.app')
                  }}
                  className={cn(
                    'p-2.5 rounded-sm border flex flex-col items-center gap-1.5 transition-all',
                    role === 'driver'
                      ? 'bg-mint text-bg-primary font-bold shadow-mint-glow'
                      : 'bg-bg-elevated text-text-secondary border-border-subtle hover:text-text-primary'
                  )}
                >
                  <Car className="w-4 h-4" />
                  <span>DRIVER</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRole('fleet_operator')
                    setEmail('ops.kavita@saferide.app')
                  }}
                  className={cn(
                    'p-2.5 rounded-sm border flex flex-col items-center gap-1.5 transition-all',
                    role === 'fleet_operator'
                      ? 'bg-mint text-bg-primary font-bold shadow-mint-glow'
                      : 'bg-bg-elevated text-text-secondary border-border-subtle hover:text-text-primary'
                  )}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>FLEET OPS</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block font-mono text-micro text-text-muted mb-2 uppercase">
                Email Address / Mobile
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 font-mono text-micro">
                <span className="text-text-muted uppercase">Password</span>
                <Link href="/forgot-password" className="text-mint hover:underline">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-bg-elevated border border-border-subtle text-text-primary text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3.5 text-label justify-center shadow-mint-glow"
            >
              <span>CONTINUE AS {role.replace('_', ' ').toUpperCase()}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </form>

          <div className="pt-6 mt-6 border-t border-border-subtle text-center font-mono text-micro text-text-muted">
            Don't have an account yet?{' '}
            <Link href="/register" className="text-mint hover:underline">
              Create SafeRide Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
