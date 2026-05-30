import * as React from 'react'

export function Skeleton(props: { width?: number | string; height?: number | string; style?: React.CSSProperties }) {
  return (
    <span
      className="v2-skeleton"
      style={{
        display: 'inline-block',
        width: props.width ?? '100%',
        height: props.height ?? 16,
        borderRadius: 6,
        ...(props.style || {})
      }}
    />
  )
}

export function TableSkeleton(props: { rows?: number; cols?: number }) {
  const rows = Array.from({ length: props.rows ?? 6 })
  const cols = Array.from({ length: props.cols ?? 5 })
  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: 'grid', gridTemplateColumns: `repeat(${cols.length}, 1fr)`, gap: '0.75rem', alignItems: 'center' }}>
          {cols.map((__, colIndex) => (
            <Skeleton key={colIndex} height={colIndex === 0 ? 28 : 18} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function StatSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
      {[0, 1, 2, 3].map(index => (
        <div key={index} style={{ background: 'var(--v2-white)', border: '1px solid var(--v2-line-soft)', borderRadius: 'var(--v2-radius)', padding: '1rem' }}>
          <Skeleton width={42} height={42} style={{ marginBottom: '0.85rem' }} />
          <Skeleton width="60%" height={14} style={{ marginBottom: '0.65rem' }} />
          <Skeleton width="35%" height={28} />
        </div>
      ))}
    </div>
  )
}
