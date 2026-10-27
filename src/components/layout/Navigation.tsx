'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, useScroll } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

interface NavigationProps {
  transparent?: boolean
  className?: string
}

const navItems = [
  { href: '/experience', label: 'Experience' },
  { href: '/safety', label: 'Safety' },
  { href: '/technology', label: 'Technology' },
  { href: '/fleets', label: 'For Fleets' },
]

export function Navigation({ transparent = true, className }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const isTransparent = transparent && !scrolled && !mobileMenuOpen

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isTransparent
            ? 'bg-transparent border-b border-transparent shadow-none'
            : 'ios-liquid-header',
          className
        )}
        role="banner"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
          <nav
            className={cn(
              'w-full flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
              scrolled ? 'h-16' : 'h-20'
            )}
            aria-label="Main navigation"
          >
            {/* Brand Logo - Official Dual-Tone Logo Graphic */}
            <Link
              href="/"
              className="flex items-center gap-3 group relative z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mint"
              aria-label="SafeRide Home"
            >
              <div className="relative h-8 md:h-9 w-auto flex items-center">
                <Image
                  src="/logo-dark-mode.png"
                  alt="SafeRide"
                  width={140}
                  height={44}
                  priority
                  className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links - Luxury Minimalist Typography */}
            <div className="hidden xl:flex items-center gap-7 lg:gap-9">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 text-[13px] font-heading font-medium tracking-[0.03em] transition-all duration-200 rounded-full',
                      isActive
                        ? 'text-white bg-white/[0.1] shadow-inner'
                        : 'text-white/65 hover:text-white hover:bg-white/[0.06]'
                    )}
                  >
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Right Action Buttons - Apple VisionOS Liquid Glass Button */}
            <div className="hidden md:flex items-center gap-3 relative z-10">
              <a
                href="#waitlist"
                className="btn-ios-glass !px-6 !py-2.5"
              >
                Join Waitlist
              </a>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              className="xl:hidden p-2 text-white/70 hover:text-white transition-colors focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>

          {/* Mobile Overlay Navigation Menu - Liquid Glass Panel Dropdown */}
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="xl:hidden py-4 border-t border-white/[0.1] space-y-2"
              role="navigation"
              aria-label="Mobile menu"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block px-4 py-2.5 rounded-xl text-[14px] font-heading font-medium tracking-wide transition-colors',
                    pathname === item.href
                      ? 'text-mint bg-white/[0.08]'
                      : 'text-white/75 hover:text-white hover:bg-white/[0.04]'
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2.5">
                <a
                  href="#waitlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-ios-glass w-full text-center !py-3"
                >
                  Join Waitlist
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </header>
    </>
  )
}
