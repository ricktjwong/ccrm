import { combineReducers } from 'redux'
import auth from './auth'
import api from './api'
import email from './email'

const appReducer = combineReducers({
  auth, api, email,
})

export default appReducer
