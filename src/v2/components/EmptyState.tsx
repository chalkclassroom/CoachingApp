import * as React from 'react'

export function EmptyState(props: { icon?: React.ReactNode; title: string; description: string; cta?: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 220,
      textAlign: 'center',
      padding: '2rem',
      color: 'var(--v2-muted)'
    }}>
      {props.icon && <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{props.icon}</div>}
      <h3 style={{ color: 'var(--v2-ink)', fontSize: '1rem', marginBottom: '0.35rem' }}>{props.title}</h3>
      <p style={{ maxWidth: 420, fontSize: '0.88rem', lineHeight: 1.55 }}>{props.description}</p>
      {props.cta && <div style={{ marginTop: '1rem' }}>{props.cta}</div>}
    </div>
  )
}
