import { applyMiddleware, createStore, compose, Middleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import rootReducer from './root-reducer'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware: Middleware[] = [thunk]

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger')
  middleware.unshift(createLogger())
}

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createPersistedStore = () => {
  const store = createStore(
    persistedReducer,
    {},
    composeEnhancers(applyMiddleware(...middleware))
  )

  const persistor = persistStore(store)

  return { store, persistor }
}

type PersistedStoreFunctionReturn = ReturnType<typeof createPersistedStore>
type PersistedStore = PersistedStoreFunctionReturn['store']

export type RootState = ReturnType<PersistedStore['getState']>
export type AppDispatch = PersistedStore['dispatch']

export default createPersistedStore
