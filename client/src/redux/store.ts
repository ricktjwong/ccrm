import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { USER_LOGOUT } from '../redux/actions/types'
import reduxThunk from 'redux-thunk'
import appReducer from './reducers'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = (state: any, action: any) => {
  if (action.type === USER_LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer, applyMiddleware(reduxThunk))
let persistor = persistStore(store)

export {
  store,
  persistor,
}
