import { AUTH_OK, AUTH_FORBIDDEN, AUTH_ERROR } from '../actions/types'

const INITIAL_STATE = {
  authenticated: false,
  errorMessage: '',
}

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case AUTH_OK:
      return { ...state, authenticated: action.payload }
    case AUTH_FORBIDDEN:
      return { ...state, errorMessage: action.payload }
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload }
    default:
      return state
  }
}
