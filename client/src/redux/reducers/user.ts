import { USER_OK } from '../actions/types'

const INITIAL_STATE = {
  userId: 0,
  emailValid: false,
}

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case USER_OK:
      return { ...state, emailValid: action.payload.emailValid, userId: action.payload.userId }
    default:
      return state
  }
}
