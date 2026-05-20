import * as React from 'react'
import { Avatar } from '../components/Avatar'
import { useTheme } from '../hooks/useTheme'

const NAV_ITEMS = [
  { key: 'home', label: 'Home', path: '/v2/home' },
  { key: 'teachers', label: 'Teachers', path: '/v2/teachers' },
  { key: 'observation', label: 'Observation', path: '/v2/observation' },
  { key: 'plans', label: 'Plans', path: '/v2/plans' },
  { key: 'training', label: 'Training', path: '/v2/training' }
]

export function AppShell(props: {
  activeKey: string
  user?: { name: string; role?: string }
  children: React.ReactNode
  onNavigate?: (path: string) => void
}) {
  const { theme, toggle } = useTheme()
  const userName = props.user?.name ?? 'Guest'

  return (
    <>
      <nav style={{
        background: 'var(--v2-white)',
        borderBottom: '1px solid var(--v2-line)',
        padding: '0.85rem 1.75rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
          <div style={{
            width: 32, height: 32,
            background: 'var(--v2-ink)',
            color: 'var(--v2-white)',
            borderRadius: 7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '0.9rem'
          }}>C</div>
          <span>CHALK</span>
          <span style={{
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            background: 'var(--v2-warm)',
            color: '#fff',
            padding: '0.12rem 0.5rem',
            borderRadius: 4,
            fontWeight: 700,
            textTransform: 'uppercase',
            marginLeft: '0.45rem'
          }}>2.0</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.25rem',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          {NAV_ITEMS.map(item => {
            const active = item.key === props.activeKey
            return (
              <a
                key={item.key}
                onClick={(e) => { e.preventDefault(); props.onNavigate?.(item.path) }}
                href={item.path}
                style={{
                  fontSize: '0.88rem',
                  fontWeight: active ? 600 : 500,
                  color: active ? 'var(--v2-brand-darker)' : 'var(--v2-muted)',
                  padding: '0.55rem 1rem',
                  borderRadius: 8,
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'color 0.15s',
                  textDecoration: 'none'
                }}
              >
                {item.label}
                {active && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-0.95rem',
                    left: '1rem', right: '1rem',
                    height: 2,
                    background: 'var(--v2-brand)',
                    borderRadius: 2
                  }} />
                )}
              </a>
            )
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button
            onClick={toggle}
            title="Toggle theme"
            style={{
              width: 36, height: 36,
              borderRadius: '50%',
              background: 'var(--v2-bg-soft)',
              border: '1px solid transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', cursor: 'pointer'
            }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.55rem',
            padding: '0.3rem 0.85rem 0.3rem 0.3rem',
            background: 'var(--v2-bg-soft)',
            borderRadius: 'var(--v2-radius-pill)',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--v2-ink-soft)',
            cursor: 'pointer'
          }}>
            <Avatar name={userName} size={28} />
            <span>{userName.split(' ')[0]}</span>
          </div>
        </div>
      </nav>
      <main>{props.children}</main>
    </>
  )
}
