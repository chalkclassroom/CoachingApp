import * as React from 'react'
import { ToastTone, useToastItems } from '../hooks/useToast'

const toneStyle: Record<ToastTone, { background: string; color: string; border: string }> = {
  success: { background: 'var(--v2-success-soft)', color: 'var(--v2-success)', border: 'var(--v2-success)' },
  error: { background: 'var(--v2-warm-soft)', color: 'var(--v2-warm-dark)', border: 'var(--v2-warm)' },
  info: { background: 'var(--v2-brand-soft)', color: 'var(--v2-brand-darker)', border: 'var(--v2-brand)' }
}

export function Toast() {
  const { items, dismiss } = useToastItems()
  if (items.length === 0) {
    return null
  }

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1000, display: 'grid', gap: '0.65rem', maxWidth: 360 }}>
      {items.map(item => {
        const tone = toneStyle[item.tone]
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => dismiss(item.id)}
            style={{
              textAlign: 'left',
              background: tone.background,
              color: tone.color,
              border: `1px solid ${tone.border}`,
              borderRadius: 8,
              padding: '0.8rem 0.95rem',
              boxShadow: 'var(--v2-shadow-md)',
              fontWeight: 600,
              fontSize: '0.84rem'
            }}
          >
            {item.message}
          </button>
        )
      })}
    </div>
  )
}
