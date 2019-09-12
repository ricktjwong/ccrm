import { combineReducers } from 'redux'
import auth from './auth'
import api from './api'

const appReducer = combineReducers({
  auth, api,
})

export default appReducer
