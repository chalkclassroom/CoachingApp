import * as React from 'react'

export function PlaceholderPage(props: { title: string; subtitle?: string }) {
  return (
    <div style={{ padding: '4rem 2.5rem', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
      <div style={{
        display: 'inline-block',
        background: 'var(--v2-warm-soft)',
        color: 'var(--v2-warm-dark)',
        padding: '0.4rem 1rem',
        borderRadius: 'var(--v2-radius-pill)',
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        marginBottom: '1.5rem'
      }}>Coming Day 2–10</div>
      <h1 style={{ fontSize: '2.4rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
        {props.title}
      </h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--v2-muted)', fontWeight: 300, lineHeight: 1.55 }}>
        {props.subtitle ?? 'This view will be built once Phase 1 (Coach Home) is signed off. The interactive mockup shows the design direction.'}
      </p>
    </div>
  )
}
