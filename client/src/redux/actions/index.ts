import { AUTH_OK, AUTH_FORBIDDEN, AUTH_ERROR } from './types'
import { Dispatch } from 'redux'

export const signout = () => {
  sessionStorage.clear()
  return {
    type: AUTH_OK,
    payload: false,
  }
}

export const signin = (props: any) => async (dispatch: Dispatch) => {
  try {
    let response = await fetch(process.env.REACT_APP_API_URL + '/users/authenticate', {
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
    if (response.status === 200) {
      dispatch({ type: AUTH_OK, payload: true })
      sessionStorage.setItem('user', data.id)
    } else {
      dispatch({ type: AUTH_FORBIDDEN, payload: 'Invalid login credentials' })
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Auth error' })
  }
}
