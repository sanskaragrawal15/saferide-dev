'use client'

import { cn } from '@/lib/utils'

export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'mint'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', size = 'md', children, className }: BadgeProps) {
  const variants = {
    default: 'bg-bg-elevated text-text-secondary border border-border-subtle',
    success: 'bg-success/20 text-success border border-success/30',
    warning: 'bg-warning/20 text-warning border border-warning/30',
    error: 'bg-error/20 text-error border border-error/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    mint: 'bg-mint-subtle text-mint border border-mint/30',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-micro',
    md: 'px-3 py-1 text-label',
    lg: 'px-4 py-1.5 text-body-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-sm',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}

export interface StatusDotProps {
  status: 'online' | 'offline' | 'warning' | 'error' | 'pending'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
}

export function StatusDot({ status, size = 'md', label, className }: StatusDotProps) {
  const sizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  }

  const statusStyles = {
    online: 'bg-success shadow-[0_0_8px_#38A169,0_0_16px_#38A169]',
    offline: 'bg-text-muted',
    warning: 'bg-warning shadow-[0_0_8px_#F5A623,0_0_16px_#F5A623]',
    error: 'bg-error shadow-[0_0_8px_#E53E3E,0_0_16px_#E53E3E]',
    pending: 'bg-warning animate-pulse-subtle',
  }

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        className={cn(
          'rounded-full',
          sizes[size],
          statusStyles[status]
        )}
        aria-hidden="true"
      />
      {label && <span className="text-body-sm text-text-secondary">{label}</span>}
    </span>
  )
}