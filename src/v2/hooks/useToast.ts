import * as React from 'react'

export type ToastTone = 'success' | 'error' | 'info'

export type ToastItem = {
  id: number
  tone: ToastTone
  message: string
}

type ToastContextValue = {
  items: ToastItem[]
  success(message: string): void
  error(message: string): void
  info(message: string): void
  dismiss(id: number): void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function ToastProvider(props: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([])

  const dismiss = React.useCallback((id: number) => {
    setItems(current => current.filter(item => item.id !== id))
  }, [])

  const push = React.useCallback((tone: ToastTone, message: string) => {
    const id = Date.now() + Math.round(Math.random() * 1000)
    setItems(current => [...current, { id, tone, message }])
    window.setTimeout(() => dismiss(id), 3500)
  }, [dismiss])

  const value = React.useMemo(() => ({
    items,
    success: (message: string) => push('success', message),
    error: (message: string) => push('error', message),
    info: (message: string) => push('info', message),
    dismiss
  }), [dismiss, items, push])

  return React.createElement(ToastContext.Provider, { value }, props.children)
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used inside ToastProvider')
  }
  return context
}

export function useToastItems() {
  return useToast()
}
