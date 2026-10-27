import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="bg-bg-primary text-text-primary pt-24 md:pt-32 pb-20">
      <div className="container-full">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center gap-2 font-mono text-micro text-mint mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-mint" />
            <span>OPERATIONAL TERMS</span>
          </div>

          <h1 className="text-display-md md:text-display-lg font-display uppercase tracking-tight text-text-primary mb-8">
            TERMS OF SERVICE.
          </h1>

          <div className="space-y-8 text-body text-text-secondary leading-relaxed font-sans">
            <section className="p-6 rounded-xl bg-bg-surface border border-border-subtle space-y-3">
              <h2 className="font-display text-headline uppercase text-text-primary">
                1. SCOPE OF MOBILITY PLATFORM
              </h2>
              <p>
                SafeRide provides a connected technology platform that links passengers with certified commercial vehicle operators and fleet owners. All commercial cabs comply with local transport regulations, fitness testing, and commercial permit mandates.
              </p>
            </section>

            <section className="p-6 rounded-xl bg-bg-surface border border-border-subtle space-y-3">
              <h2 className="font-display text-headline uppercase text-text-primary">
                2. SAFETY TOOLS & REALISTIC CAPABILITIES
              </h2>
              <p>
                SafeRide journey awareness features, including the press-and-hold SOS, corridor deviation tracking, and onboard vehicle safety devices, are assistive supervisory tools designed to enhance traveler peace of mind. SafeRide does not guarantee the prevention of all accidents or criminal acts, and does not replace statutory municipal police or emergency response services.
              </p>
            </section>

            <section className="p-6 rounded-xl bg-bg-surface border border-border-subtle space-y-3">
              <h2 className="font-display text-headline uppercase text-text-primary">
                3. FARE GUARANTEES
              </h2>
              <p>
                All quoted fares in the SafeRide booking application represent fixed commitments for the designated route without arbitrary algorithmic surge increases. Tolls and state entry permits are itemized transparently prior to confirmation.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
