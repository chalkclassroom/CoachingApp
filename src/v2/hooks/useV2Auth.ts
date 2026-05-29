import * as React from 'react'
import { useV2Firebase } from '../lib/firebase'
import { V2User } from '../lib/types'

type AuthState = {
  user: V2User | null
  loading: boolean
  error: Error | null
}

export function useV2Auth(): AuthState {
  const firebase = useV2Firebase()
  const [state, setState] = React.useState<AuthState>({
    user: null,
    loading: true,
    error: null
  })

  React.useEffect(() => {
    let active = true

    const unsubscribe = firebase.auth.onAuthStateChanged(async authUser => {
      if (!active) {
        return
      }

      if (!authUser) {
        setState({ user: null, loading: false, error: null })
        return
      }

      setState(current => ({ ...current, loading: true, error: null }))

      try {
        const userDoc: any = await firebase.getUserInformation()
        if (!active) {
          return
        }

        setState({
          user: {
            uid: authUser.uid,
            email: authUser.email || userDoc?.email || '',
            isAnonymous: authUser.isAnonymous,
            firstName: userDoc?.firstName || 'Coach',
            lastName: userDoc?.lastName || '',
            role: userDoc?.role || '',
            programs: userDoc?.programs || (userDoc?.program ? [userDoc.program] : undefined),
            sites: userDoc?.sites
          },
          loading: false,
          error: null
        })
      } catch (error) {
        if (!active) {
          return
        }
        setState({ user: null, loading: false, error: error as Error })
      }
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [firebase])

  return state
}
