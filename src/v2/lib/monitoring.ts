type V2ErrorContext = {
  source?: string
  componentStack?: string
  route?: string
  extra?: Record<string, unknown>
}

type V2ErrorPayload = {
  app: 'chalk-v2'
  releaseId: string
  sourceMapHint: string
  source: string
  message: string
  stack?: string
  componentStack?: string
  route?: string
  url?: string
  userAgent?: string
  extra?: Record<string, unknown>
}

function normalizeError(error: unknown): { message: string; stack?: string } {
  if (error instanceof Error) {
    return { message: error.message, stack: error.stack }
  }
  if (typeof error === 'string') {
    return { message: error }
  }
  try {
    return { message: JSON.stringify(error) }
  } catch (_err) {
    return { message: 'Unknown V2 error' }
  }
}

function monitoringEndpoint(): string {
  return process.env.V2_MONITORING_ENDPOINT || ''
}

export function v2ReleaseId(): string {
  return process.env.V2_RELEASE_ID || 'chalk-v2-unknown'
}

export function captureV2Error(error: unknown, context: V2ErrorContext = {}): void {
  const normalized = normalizeError(error)
  const payload: V2ErrorPayload = {
    app: 'chalk-v2',
    releaseId: v2ReleaseId(),
    sourceMapHint: 'Webpack emits source maps; Path A/B requires uploading or associating these maps with the monitoring provider release.',
    source: context.source || 'unknown',
    message: normalized.message,
    stack: normalized.stack,
    componentStack: context.componentStack,
    route: context.route,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    extra: context.extra
  }

  const endpoint = monitoringEndpoint()
  if (!endpoint || typeof window === 'undefined') {
    console.error('CHALK 2.0 monitored error', payload)
    return
  }

  const body = JSON.stringify(payload)
  try {
    if (navigator.sendBeacon) {
      const sent = navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }))
      if (sent) return
    }
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true
    }).catch(sendError => {
      console.error('Unable to send CHALK 2.0 monitoring event', sendError)
    })
  } catch (sendError) {
    console.error('Unable to send CHALK 2.0 monitoring event', sendError)
  }
}

export function installV2GlobalErrorHandlers(): void {
  if (typeof window === 'undefined') return
  const w = window as typeof window & { __chalkV2MonitoringInstalled?: boolean }
  if (w.__chalkV2MonitoringInstalled) return
  w.__chalkV2MonitoringInstalled = true

  window.addEventListener('error', event => {
    captureV2Error(event.error || event.message, {
      source: 'window.error',
      route: window.location.pathname,
      extra: { filename: event.filename, lineno: event.lineno, colno: event.colno }
    })
  })

  window.addEventListener('unhandledrejection', event => {
    captureV2Error(event.reason, {
      source: 'window.unhandledrejection',
      route: window.location.pathname
    })
  })
}
