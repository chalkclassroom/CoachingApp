import * as React from 'react'

export type PillVariant = 'neutral' | 'warn' | 'warm' | 'danger' | 'success' | 'brand' | 'gold' | 'purple'

const map: Record<PillVariant, { bg: string; fg: string }> = {
  neutral: { bg: 'var(--v2-bg-soft)', fg: 'var(--v2-muted)' },
  warn:    { bg: 'var(--v2-gold-soft)', fg: '#B45309' },
  warm:    { bg: 'var(--v2-warm-soft)', fg: 'var(--v2-warm-dark)' },
  danger:  { bg: 'var(--v2-danger-soft)', fg: 'var(--v2-danger)' },
  success: { bg: 'var(--v2-success-soft)', fg: '#166534' },
  brand:   { bg: 'var(--v2-brand-soft)', fg: 'var(--v2-brand-darker)' },
  gold:    { bg: 'var(--v2-gold-soft)', fg: '#B45309' },
  purple:  { bg: 'rgba(111, 57, 196, 0.12)', fg: '#5B21B6' }
}

export function Pill(props: { variant?: PillVariant | string; children: React.ReactNode; style?: React.CSSProperties }) {
  const v = props.variant ?? 'neutral'
  const c = map[v as PillVariant] || map.neutral
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.1rem 0.5rem',
        borderRadius: 4,
        fontSize: '0.7rem',
        fontWeight: 600,
        background: c.bg,
        color: c.fg,
        ...(props.style || {})
      }}
    >
      {props.children}
    </span>
  )
}
