import * as React from 'react'

type State = { hasError: boolean }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode; fallback?: React.ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('CHALK 2.0 render error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ padding: '2rem', color: 'var(--v2-warm-dark)' }}>
          Something went wrong loading this CHALK 2.0 view.
        </div>
      )
    }

    return this.props.children
  }
}
