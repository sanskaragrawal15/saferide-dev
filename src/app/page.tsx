import { HeroSection } from '@/components/home/HeroSection'
import { EditorialStory } from '@/components/home/EditorialStory'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ClosingStatement } from '@/components/home/ClosingStatement'

export default function HomePage() {
  return (
    <div className="bg-bg-primary text-text-primary selection:bg-mint-subtle selection:text-text-primary">
      {/* 1. Realistic India 3D Extruded Safety Map & Pure Brand Hero */}
      <HeroSection />

      {/* 2. 01 / The Mission — Women's Safety & Travel Peace of Mind */}
      <EditorialStory />

      {/* 3. 02 / The Protocol — 4-Step Safety Flow */}
      <HowItWorks />

      {/* 4. 03 / Coming Soon — Priority Early Access Waitlist */}
      <ClosingStatement />
    </div>
  )
}
