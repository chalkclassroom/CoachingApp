import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const logger = createLogger();
const middleware = [logger, thunk];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
   persistedReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
)
  const persistor = persistStore(store)
  return { store, persistor }
}
