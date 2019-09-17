import { AUTH_OK, AUTH_FORBIDDEN, AUTH_ERROR, API_OK, USER_LOGOUT, EMAIL_OK } from './types'
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

export const validateEmailAndSendAuthToken = (props: any) => async (dispatch: Dispatch) => {
  try {
    let response = await fetch(process.env.REACT_APP_API_URL + '/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: props.email,
      }),
    })
    if (response.status === 200) {
      dispatch({ type: EMAIL_OK, payload: true })
    } else {
      dispatch({ type: AUTH_FORBIDDEN, payload: 'Email not in the whitelist' })
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Error with server' })
  }
}

export const validateJWTAndSetCookie = (token: string) => async (dispatch: Dispatch) => {
  try {
    let response = await fetch(process.env.REACT_APP_API_URL + '/users/login/callback', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        token: token,
      }),
    })
    if (response.status === 200) {
      dispatch({ type: AUTH_OK, payload: true })
    } else {
      dispatch({ type: AUTH_FORBIDDEN, payload: 'Invalid token' })
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Auth error' })
  }
}
