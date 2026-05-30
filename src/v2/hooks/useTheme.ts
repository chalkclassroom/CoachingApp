import { useEffect, useState, useCallback } from 'react'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'chalk-v2-theme'

function readSaved(): Theme {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'dark' || v === 'light') return v
  } catch (e) { /* localStorage may not be available */ }
  return 'light'
}

/**
 * Theme hook. Default is light. Persists to localStorage.
 * No system-preference fallback by design — the team chose light as default.
 */
export function useTheme(rootRef?: HTMLElement | null) {
  const [theme, setTheme] = useState<Theme>(readSaved)

  useEffect(() => {
    const el = rootRef ?? document.documentElement.querySelector<HTMLElement>('.v2-root')
    if (el) el.setAttribute('data-theme', theme)
    try { localStorage.setItem(STORAGE_KEY, theme) } catch (e) { /* ignore */ }
  }, [theme, rootRef])

  const toggle = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }, [])

  return { theme, setTheme, toggle }
}
