'use client'

import { motion } from 'framer-motion'

interface MorphingLiquidBlobProps {
  className?: string
  intensity?: 'subtle' | 'medium' | 'vibrant'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function MorphingLiquidBlob({
  className = '',
  intensity = 'medium',
  size = 'lg',
}: MorphingLiquidBlobProps) {
  const sizeMap = {
    sm: 'w-[280px] h-[280px]',
    md: 'w-[420px] h-[420px]',
    lg: 'w-[580px] h-[580px]',
    xl: 'w-[820px] h-[820px]',
  }

  const opacityMap = {
    subtle: 'opacity-20',
    medium: 'opacity-35',
    vibrant: 'opacity-50',
  }

  return (
    <div
      className={`pointer-events-none absolute overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Morphing Liquid Gradient Orb 1 */}
      <motion.div
        animate={{
          scale: [1, 1.15, 0.95, 1],
          rotate: [0, 90, 180, 360],
          x: [0, 25, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`morphing-liquid-blob absolute rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-[radial-gradient(ellipse_at_center,rgba(162,189,134,0.18)_0%,rgba(68,91,66,0.12)_45%,transparent_70%)] blur-[70px] ${sizeMap[size]} ${opacityMap[intensity]}`}
        style={{ filter: 'url(#liquid-distortion)' }}
      />

      {/* Morphing Liquid Counter-Orb 2 */}
      <motion.div
        animate={{
          scale: [1.1, 0.9, 1.2, 1.1],
          rotate: [360, 240, 120, 0],
          x: [20, -35, 15, 20],
          y: [-15, 25, -25, -15],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`morphing-liquid-blob-slow absolute rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-[radial-gradient(ellipse_at_center,rgba(68,91,66,0.22)_0%,rgba(46,63,45,0.12)_50%,transparent_75%)] blur-[80px] ${sizeMap[size]} ${opacityMap[intensity]}`}
      />
    </div>
  )
}
