import * as React from 'react'

export type ButtonProps = {
  variant?: 'default' | 'primary' | 'accent' | 'warm' | 'ghost'
  size?: 'sm' | 'md'
  icon?: React.ReactNode
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  disabled?: boolean
  type?: 'button' | 'submit'
  style?: React.CSSProperties
  className?: string
  title?: string
}

const styles: { [k: string]: React.CSSProperties } = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontFamily: 'var(--v2-font)',
    fontWeight: 600,
    borderRadius: 'var(--v2-radius-pill)',
    border: '1px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap'
  },
  md: { fontSize: '0.88rem', padding: '0.55rem 1.1rem' },
  sm: { fontSize: '0.78rem', padding: '0.4rem 0.85rem' },
  default: { background: 'var(--v2-white)', color: 'var(--v2-ink-soft)', borderColor: 'var(--v2-line)' },
  primary: { background: 'var(--v2-ink)', color: 'var(--v2-white)', borderColor: 'var(--v2-ink)' },
  accent: { background: 'var(--v2-brand)', color: 'var(--v2-white)', borderColor: 'var(--v2-brand)' },
  warm: { background: 'var(--v2-warm)', color: 'var(--v2-white)', borderColor: 'var(--v2-warm)' },
  ghost: { background: 'transparent', color: 'var(--v2-ink-soft)', borderColor: 'transparent' }
}

export function Button(p: ButtonProps) {
  const { variant = 'default', size = 'md', icon, children, ...rest } = p
  const combined: React.CSSProperties = {
    ...styles.base,
    ...(size === 'sm' ? styles.sm : styles.md),
    ...styles[variant],
    ...(p.style || {})
  }
  return (
    <button
      type={rest.type || 'button'}
      onClick={rest.onClick}
      disabled={rest.disabled}
      style={combined}
      className={rest.className}
      title={rest.title}
    >
      {icon}
      {children}
    </button>
  )
}
