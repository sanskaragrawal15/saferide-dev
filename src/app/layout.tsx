import type { Metadata, Viewport } from 'next'
import { Inter, Outfit, Montserrat, IBM_Plex_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { LiquidFilterDefs } from '@/components/effects/LiquidFilterDefs'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://saferide.app'),
  title: {
    default: 'SafeRide — Connected Mobility & Human-First Safety',
    template: '%s | SafeRide',
  },
  description: 'Connected mobility and thoughtful safety technology, bringing passengers, drivers, and fleets closer to a more confident journey.',
  keywords: ['SafeRide', 'mobility', 'safety', 'fleet management', 'connected vehicles', 'ride booking', 'driver safety'],
  authors: [{ name: 'SafeRide' }],
  creator: 'SafeRide',
  publisher: 'SafeRide',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://saferide.app',
    siteName: 'SafeRide',
    title: 'SafeRide — Connected Mobility & Human-First Safety',
    description: 'Connected mobility and thoughtful safety technology for passengers, drivers, and fleets.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SafeRide - Connected Mobility & Human-First Safety',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SafeRide — Connected Mobility & Human-First Safety',
    description: 'Connected mobility and thoughtful safety technology for passengers, drivers, and fleets.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#050605',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en-IN"
      className={`${montserrat.variable} ${outfit.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased relative selection:bg-mint-subtle selection:text-text-primary font-body">
        {/* Global Liquid Distortion SVG Filters */}
        <LiquidFilterDefs />

        {/* Cinematic Film Grain Texture Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[60] grain-layer opacity-[0.12] mix-blend-soft-light" aria-hidden="true" />
        <div className="fixed inset-0 pointer-events-none z-[55] grain-layer-animated opacity-[0.08] mix-blend-overlay" aria-hidden="true" />

        {/* Subtle Ambient Vignette */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(162,189,134,0.025),transparent_70%)]" aria-hidden="true" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-vignette-strong" aria-hidden="true" />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[70] btn-primary"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}