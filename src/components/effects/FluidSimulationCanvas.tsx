'use client'

import { useEffect, useRef } from 'react'

interface FluidSimulationCanvasProps {
  className?: string
  opacity?: number
  interactive?: boolean
  particleDensity?: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  maxLife: number
  life: number
  color: string
}

export function FluidSimulationCanvas({
  className = '',
  opacity = 0.55,
  interactive = true,
  particleDensity = 65,
}: FluidSimulationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    let mouseX = width * 0.5
    let mouseY = height * 0.4
    let prevMouseX = mouseX
    let prevMouseY = mouseY
    let mouseSpeed = 0
    let isMouseOver = false
    let lastScrollY = window.scrollY

    // Fluid particles array
    const particles: Particle[] = []
    const colors = [
      'rgba(162, 189, 134, ', // Olive Sage primary accent
      'rgba(182, 211, 154, ', // Soft sage highlight
      'rgba(68, 91, 66, ',    // Forest Pine secondary accent
      'rgba(46, 63, 45, ',    // Deep pine shadow
    ]

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Pointer listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const currentX = e.clientX - rect.left
      const currentY = e.clientY - rect.top

      const dx = currentX - mouseX
      const dy = currentY - mouseY
      mouseSpeed = Math.sqrt(dx * dx + dy * dy)

      prevMouseX = mouseX
      prevMouseY = mouseY
      mouseX = currentX
      mouseY = currentY
      isMouseOver = true

      // Spawn fluid ripples on movement
      if (interactive && mouseSpeed > 2) {
        const count = Math.min(Math.floor(mouseSpeed * 0.15) + 1, 5)
        for (let i = 0; i < count; i++) {
          spawnParticle(
            mouseX + (Math.random() - 0.5) * 20,
            mouseY + (Math.random() - 0.5) * 20,
            dx * 0.12 + (Math.random() - 0.5) * 2,
            dy * 0.12 + (Math.random() - 0.5) * 2,
            Math.random() * 40 + 20
          )
        }
      }
    }

    const handleMouseLeave = () => {
      isMouseOver = false
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDiff = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      if (Math.abs(scrollDiff) > 1 && interactive) {
        // Disperse fluid waves across the width
        const count = Math.min(Math.floor(Math.abs(scrollDiff) * 0.2) + 2, 8)
        for (let i = 0; i < count; i++) {
          const px = Math.random() * width
          const py = Math.random() * height
          spawnParticle(
            px,
            py,
            (Math.random() - 0.5) * 3,
            -scrollDiff * 0.08 + (Math.random() - 0.5) * 2,
            Math.random() * 60 + 30
          )
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    canvas.addEventListener('mouseleave', handleMouseLeave)

    function spawnParticle(x: number, y: number, vx: number, vy: number, radius: number) {
      if (particles.length > 120) particles.shift()
      particles.push({
        x,
        y,
        vx,
        vy,
        radius,
        alpha: Math.random() * 0.45 + 0.25,
        life: 0,
        maxLife: Math.random() * 60 + 40,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Ambient fluid eddies
    let tick = 0

    // Main animation loop
    const render = () => {
      tick += 0.015

      // Ambient ripple injection when idle
      if (tick % 0.8 < 0.02) {
        const angle = tick * 1.5
        const ox = width * 0.5 + Math.cos(angle) * (width * 0.25)
        const oy = height * 0.45 + Math.sin(angle * 1.3) * (height * 0.2)
        spawnParticle(
          ox,
          oy,
          Math.cos(angle) * 0.8,
          Math.sin(angle) * 0.8,
          Math.random() * 80 + 40
        )
      }

      ctx.clearRect(0, 0, width, height)

      // Draw background ambient viscous fluid currents
      const grad = ctx.createRadialGradient(
        width * 0.5 + Math.sin(tick * 0.7) * (width * 0.15),
        height * 0.4 + Math.cos(tick * 0.5) * (height * 0.12),
        10,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.7
      )
      grad.addColorStop(0, 'rgba(162, 189, 134, 0.035)')
      grad.addColorStop(0.35, 'rgba(68, 91, 66, 0.025)')
      grad.addColorStop(1, 'rgba(6, 8, 6, 0)')

      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Update and render fluid particles with viscous liquid blending
      ctx.save()
      ctx.globalCompositeOperation = 'screen'

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy

        // Viscous damping
        p.vx *= 0.96
        p.vy *= 0.96

        // Gentle swirl effect
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (isMouseOver && dist < 220 && dist > 10) {
          const force = (1 - dist / 220) * 0.8
          p.vx += (-dy / dist) * force
          p.vy += (dx / dist) * force
        }

        const progress = p.life / p.maxLife
        const currentAlpha = Math.sin(progress * Math.PI) * p.alpha * opacity
        const currentRadius = p.radius * (1 + progress * 0.8)

        if (currentAlpha > 0.005) {
          const particleGrad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            currentRadius
          )
          particleGrad.addColorStop(0, `${p.color}${currentAlpha})`)
          particleGrad.addColorStop(0.5, `${p.color}${currentAlpha * 0.4})`)
          particleGrad.addColorStop(1, `${p.color}0)`)

          ctx.fillStyle = particleGrad
          ctx.beginPath()
          ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2)
          ctx.fill()
        }

        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
        }
      }

      ctx.restore()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [interactive, opacity, particleDensity])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  )
}
