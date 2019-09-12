import { API_OK } from '../actions/types'

const INITIAL_STATE = {
  data: {},
}

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case API_OK:
      return { ...state, data: action.payload }
    default:
      return state
  }
}
