import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // SafeRide Logo Dual-Tone Palette
        // Primary Logo Accent: Olive Sage (#A2BD86)
        mint: '#A2BD86',
        'mint-bright': '#B6D39A',
        'mint-dim': 'rgba(162, 189, 134, 0.6)',
        'mint-subtle': 'rgba(162, 189, 134, 0.15)',
        'mint-faint': 'rgba(162, 189, 134, 0.08)',

        // Secondary Logo Accent: Deep Forest Pine (#445B42)
        pine: '#445B42',
        'pine-deep': '#2E3F2D',
        'pine-subtle': 'rgba(68, 91, 66, 0.25)',
        'pine-faint': 'rgba(68, 91, 66, 0.12)',

        // Explicit Sage aliases
        sage: '#A2BD86',
        'sage-bright': '#B6D39A',
        'sage-dim': 'rgba(162, 189, 134, 0.6)',
        'sage-subtle': 'rgba(162, 189, 134, 0.15)',

        // Backgrounds - Grounded Organic Obsidian
        'bg-primary': '#060806',
        'bg-secondary': '#0A0E0A',
        'bg-surface': '#0F140F',
        'bg-elevated': '#141B14',
        'bg-void': '#030403',

        // Text
        'text-primary': '#F5F8F2',
        'text-secondary': '#B0BDB0',
        'text-muted': '#829381',
        'text-subtle': '#5E6B5D',

        // Borders
        'border-subtle': 'rgba(162, 189, 134, 0.14)',
        'border-strong': 'rgba(162, 189, 134, 0.32)',

        // Semantic
        warning: '#D4A373',
        error: '#D95D39',
        success: '#A2BD86',
        info: '#829381',

        background: '#060806',
        foreground: '#F5F8F2',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'var(--font-montserrat)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-outfit)', 'var(--font-montserrat)', 'system-ui', 'sans-serif'],
        body: ['var(--font-montserrat)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(4rem, 10vw, 12rem)', { lineHeight: '0.88', letterSpacing: '-0.045em', fontWeight: '700' }],
        'display-xl': ['clamp(3.25rem, 8vw, 9rem)', { lineHeight: '0.9', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-lg': ['clamp(2.75rem, 6vw, 6.5rem)', { lineHeight: '0.92', letterSpacing: '-0.035em', fontWeight: '700' }],
        'display-md': ['clamp(2rem, 4vw, 4.25rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.75rem)', { lineHeight: '1.0', letterSpacing: '-0.025em', fontWeight: '600' }],
        'headline-lg': ['clamp(1.25rem, 2.25vw, 1.9rem)', { lineHeight: '1.18', letterSpacing: '-0.015em', fontWeight: '500' }],
        'headline': ['clamp(1.125rem, 1.8vw, 1.5rem)', { lineHeight: '1.22', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body-xl': ['1.25rem', { lineHeight: '1.8', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.8', letterSpacing: '-0.008em' }],
        'body': ['1rem', { lineHeight: '1.9', letterSpacing: '-0.006em' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.9', letterSpacing: '-0.004em' }],
        'label': ['0.75rem', { lineHeight: '1.6', letterSpacing: '0.28em' }],
        'micro': ['0.6875rem', { lineHeight: '1.6', letterSpacing: '0.32em' }],
        'nano': ['0.625rem', { lineHeight: '1.6', letterSpacing: '0.38em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
      },
      borderRadius: {
        none: '0',
        sm: '1px',
        DEFAULT: '2px',
        md: '6px',
        lg: '10px',
        xl: '14px',
        '2xl': '18px',
        '3xl': '26px',
        full: '9999px',
      },
      transitionDuration: {
        fastest: '90ms',
        fast: '150ms',
        normal: '280ms',
        slow: '420ms',
        slower: '680ms',
        slowest: '900ms',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'snap': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        none: 'none',
        hairline: '0 1px 0 rgba(255, 255, 255, 0.01)',
        'inset-hair': 'inset 0 1px 0 rgba(255, 255, 255, 0.015)',
        panel: '0 60px 120px -80px rgba(0, 0, 0, 0.95)',
        slab: '0 40px 90px -60px rgba(0, 0, 0, 0.9)',
        frame: '0 120px 160px -120px rgba(0, 0, 0, 0.98)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-ink': 'radial-gradient(120% 120% at 50% 0%, rgba(162, 189, 134, 0.05) 0%, transparent 55%), radial-gradient(80% 80% at 50% 100%, rgba(68, 91, 66, 0.04) 0%, transparent 70%)',
        'vignette-strong': 'radial-gradient(ellipse at center, transparent 40%, rgba(1, 2, 1, 0.9) 100%)',
        'scan-fade': 'linear-gradient(180deg, transparent 0%, rgba(3, 4, 3, 0.8) 100%)',
      },
      keyframes: {
        'grain-shift': {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '25%': { transform: 'translate3d(-1%, 1%, 0)' },
          '50%': { transform: 'translate3d(1%, -1%, 0)' },
          '75%': { transform: 'translate3d(-0.5%, -0.5%, 0)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.02) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.08) translate3d(-1%, -1%, 0)' },
        },
        'text-reveal': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'line-fade': {
          '0%': { opacity: '0', transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { opacity: '1', transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'float-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'grain-shift': 'grain-shift 8s steps(2) infinite',
        'ken-burns': 'ken-burns 18s ease-out forwards',
        'text-reveal': 'text-reveal 900ms var(--ease-out-expo, cubic-bezier(0.16,1,0.3,1)) both',
        'line-fade': 'line-fade 700ms var(--ease-out-expo, cubic-bezier(0.16,1,0.3,1)) both',
        'scan': 'scan 6s linear infinite',
        'float-subtle': 'float-subtle 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config