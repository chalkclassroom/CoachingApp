import * as React from 'react'

const GRADIENTS = [
  'linear-gradient(135deg, #f0523d, #d63a26)',  // warm
  'linear-gradient(135deg, #00b2ff, #0091d4)',  // brand
  'linear-gradient(135deg, #f0a623, #ea7c1e)',  // gold
  'linear-gradient(135deg, #6f39c4, #f0523d)',  // purple-warm
  'linear-gradient(135deg, #2ECC71, #00b2ff)',  // success-brand
  'linear-gradient(135deg, #00b2ff, #f0a623)',  // brand-gold
]

function hashIndex(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0
  return Math.abs(h) % GRADIENTS.length
}

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase() || '')
    .join('')
}

export function Avatar(props: { name?: string; initials?: string; size?: number; seed?: string }) {
  const initials = props.initials ?? (props.name ? initialsFromName(props.name) : '?')
  const seed = props.seed ?? props.name ?? initials
  const size = props.size ?? 36
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: GRADIENTS[hashIndex(seed)],
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: size * 0.38,
        flexShrink: 0,
        userSelect: 'none'
      }}
    >
      {initials}
    </div>
  )
}
