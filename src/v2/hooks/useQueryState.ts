import * as React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export function useQueryState<T extends string>(key: string, defaultValue: T, allowedValues: readonly T[]): [T, (nextValue: T) => void] {
  const history = useHistory()
  const location = useLocation()
  const allowedKey = allowedValues.join('|')

  const value = React.useMemo(() => {
    const params = new URLSearchParams(location.search)
    const raw = params.get(key) as T | null
    return raw && allowedValues.includes(raw) ? raw : defaultValue
  }, [allowedKey, allowedValues, defaultValue, key, location.search])

  const setValue = React.useCallback((nextValue: T) => {
    const params = new URLSearchParams(location.search)
    if (nextValue === defaultValue) {
      params.delete(key)
    } else {
      params.set(key, nextValue)
    }
    const search = params.toString()
    history.replace({
      pathname: location.pathname,
      search: search ? `?${search}` : '',
      hash: location.hash
    })
  }, [defaultValue, history, key, location.hash, location.pathname, location.search])

  return [value, setValue]
}
