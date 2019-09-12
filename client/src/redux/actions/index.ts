import { AUTH_OK, AUTH_FORBIDDEN, AUTH_ERROR, API_OK, USER_LOGOUT } from './types'
import { Dispatch } from 'redux'

export const logout = () => {
  return {
    type: USER_LOGOUT,
  }
}

export const getCases = () => async (dispatch: Dispatch) => {
  try {
    let id = 1
    let response = await fetch(process.env.REACT_APP_API_URL + `/users/${id}/cases`, {
      method: 'GET',
      credentials: 'include',
    })
    let data = await response.json()
    if (response.status === 200) {
      dispatch({ type: API_OK, payload: data })
    } else {
      dispatch({ type: AUTH_OK, payload: false })
    }
  } catch (error) {
    dispatch({ type: AUTH_OK, payload: false })
  }
}

export const login = (props: any) => async (dispatch: Dispatch) => {
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
    if (response.status === 200) {
      dispatch({ type: AUTH_OK, payload: true })
    } else {
      dispatch({ type: AUTH_FORBIDDEN, payload: 'Invalid login credentials' })
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Auth error' })
  }
}
