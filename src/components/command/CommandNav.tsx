'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Car, Users, Navigation, ShieldAlert, Cpu, QrCode, BarChart3, Settings } from 'lucide-react'

const commandLinks = [
  { href: '/command', label: 'Overview', icon: LayoutDashboard },
  { href: '/command/vehicles', label: 'Vehicles', icon: Car },
  { href: '/command/drivers', label: 'Drivers', icon: Users },
  { href: '/command/trips', label: 'Live Trips', icon: Navigation },
  { href: '/command/incidents', label: 'Incidents', icon: ShieldAlert },
  { href: '/command/devices', label: 'IoT Devices', icon: Cpu },
  { href: '/command/qr', label: 'QR Pairing', icon: QrCode },
  { href: '/command/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/command/settings', label: 'Settings', icon: Settings },
]

export function CommandNav() {
  const pathname = usePathname()

  return (
    <div className="border-b border-border-subtle bg-bg-surface/80 backdrop-blur-md sticky top-16 md:top-20 z-30">
      <div className="container-full">
        <div className="flex items-center justify-between overflow-x-auto py-2.5 scrollbar-none gap-2">
          <div className="flex items-center gap-1 sm:gap-2">
            {commandLinks.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-3.5 py-1.5 rounded-sm font-mono text-micro uppercase whitespace-nowrap transition-all',
                    isActive
                      ? 'bg-mint text-bg-primary font-bold shadow-[0_0_12px_rgba(162,189,134,0.25)]'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 font-mono text-micro text-text-muted pl-4 border-l border-border-subtle">
            <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            <span>RADAR: 100% OPERATIONAL</span>
          </div>
        </div>
      </div>
    </div>
  )
}
