import * as React from 'react'

export type StatTone = 'brand' | 'warm' | 'gold' | 'success'

const iconBg: Record<StatTone, { bg: string; fg: string }> = {
  brand:   { bg: 'var(--v2-brand-soft)', fg: 'var(--v2-brand-dark)' },
  warm:    { bg: 'var(--v2-warm-soft)', fg: 'var(--v2-warm)' },
  gold:    { bg: 'var(--v2-gold-soft)', fg: 'var(--v2-gold)' },
  success: { bg: 'var(--v2-success-soft)', fg: 'var(--v2-success)' }
}

const deltaColor: Record<'up'|'warn'|'flat', string> = {
  up: 'var(--v2-success)',
  warn: 'var(--v2-warm)',
  flat: 'var(--v2-muted)'
}

export function Stat(props: {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
  tone?: StatTone
  delta?: { text: string; trend: 'up' | 'warn' | 'flat' }
}) {
  const tone = props.tone ?? 'brand'
  return (
    <div style={{
      background: 'var(--v2-white)',
      borderRadius: 'var(--v2-radius)',
      padding: '1.2rem 1.35rem',
      border: '1px solid var(--v2-line-soft)',
      position: 'relative',
      boxShadow: 'var(--v2-shadow-sm)'
    }}>
      {props.icon && (
        <div style={{
          position: 'absolute',
          top: '1rem', right: '1rem',
          width: 36, height: 36,
          borderRadius: 9,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.05rem',
          background: iconBg[tone].bg,
          color: iconBg[tone].fg
        }}>
          {props.icon}
        </div>
      )}
      <div style={{
        fontSize: '0.7rem', fontWeight: 600,
        color: 'var(--v2-muted)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase'
      }}>
        {props.label}
      </div>
      <div style={{
        fontSize: '2rem', fontWeight: 700,
        letterSpacing: '-0.03em',
        margin: '0.35rem 0 0.15rem',
        color: 'var(--v2-ink)'
      }}>
        {props.value}
      </div>
      {props.delta && (
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: deltaColor[props.delta.trend] }}>
          {props.delta.text}
        </div>
      )}
    </div>
  )
}
