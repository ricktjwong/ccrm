import { combineReducers } from 'redux'
import auth from './auth'
import api from './api'
import user from './user'

const appReducer = combineReducers({
  auth, api, user,
})

export default appReducer
