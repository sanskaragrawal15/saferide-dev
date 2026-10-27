'use client'

export function LiquidFilterDefs() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -left-[9999px] -top-[9999px] h-0 w-0 opacity-0 overflow-hidden"
    >
      <defs>
        {/* Organic Morphing Liquid Distortion Filter */}
        <filter id="liquid-distortion" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.018"
            numOctaves="3"
            seed="2"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="24s"
              values="0.012 0.018;0.018 0.012;0.014 0.022;0.012 0.018"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Refined Liquid Glass Edge Refraction */}
        <filter id="liquid-refraction" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.03 0.04"
            numOctaves="2"
            result="fineNoise"
          >
            <animate
              attributeName="baseFrequency"
              dur="18s"
              values="0.03 0.04;0.04 0.025;0.025 0.035;0.03 0.04"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="fineNoise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </defs>
    </svg>
  )
}
