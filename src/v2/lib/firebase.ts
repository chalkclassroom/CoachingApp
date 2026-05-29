import * as React from 'react'
import Firebase, { FirebaseContext } from '../../components/Firebase'

const V2FirebaseContext = React.createContext<Firebase | null>(null)

export function V2FirebaseProvider(props: { children: React.ReactNode }) {
  const firebase = React.useContext(FirebaseContext)
  return React.createElement(V2FirebaseContext.Provider, { value: firebase }, props.children)
}

export function useV2Firebase(): Firebase {
  const firebase = React.useContext(V2FirebaseContext)
  if (!firebase) {
    throw new Error('useV2Firebase must be used inside V2FirebaseProvider')
  }
  return firebase
}
