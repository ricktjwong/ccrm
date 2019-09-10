import { AUTH_SUCCESS, AUTH_ERROR } from './types'
import { Dispatch } from 'redux'

export const signout = () => {
  sessionStorage.clear()
  return {
    type: AUTH_SUCCESS,
    payload: '',
  }
}

export const signin = (props: any, callback: any) => async (dispatch: Dispatch) => {
  try {
    let response = await fetch('http://localhost:9000/users/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: props.email,
        password: props.password,
      }),
    })
    let data = await response.json()
    if (data.isValid) {
      dispatch({ type: AUTH_SUCCESS, payload: 'user' })
      sessionStorage.setItem('user', 'user')
      callback()
    } else {
      dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' })
      callback()
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' })
    callback()
  }
}
