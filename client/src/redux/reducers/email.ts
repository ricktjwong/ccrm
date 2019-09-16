import { EMAIL_OK } from '../actions/types'

const INITIAL_STATE = {
  emailValid: false,
}

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case EMAIL_OK:
      return { ...state, emailValid: action.payload }
    default:
      return state
  }
}
