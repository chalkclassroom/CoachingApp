import * as React from 'react'

export function Card(props: { children: React.ReactNode; style?: React.CSSProperties; padding?: string }) {
  return (
    <div
      style={{
        background: 'var(--v2-white)',
        borderRadius: 'var(--v2-radius)',
        padding: props.padding ?? '1.35rem',
        border: '1px solid var(--v2-line-soft)',
        boxShadow: 'var(--v2-shadow-sm)',
        ...(props.style || {})
      }}
    >
      {props.children}
    </div>
  )
}

export function CardHeader(props: { title: React.ReactNode; action?: React.ReactNode; badge?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
      <div style={{ fontSize: '0.95rem', fontWeight: 600, letterSpacing: '-0.01em', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        {props.title}
        {props.badge}
      </div>
      {props.action && (
        <div style={{ fontSize: '0.8rem', color: 'var(--v2-brand-dark)', fontWeight: 600, cursor: 'pointer' }}>
          {props.action}
        </div>
      )}
    </div>
  )
}
