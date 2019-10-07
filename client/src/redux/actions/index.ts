import { AUTH_OK, AUTH_FORBIDDEN, AUTH_ERROR, API_OK, USER_LOGOUT, USER_OK } from './types'
import { Dispatch } from 'redux'
import { store } from '../store'
import { Case } from 'models/Case'

export const logout = () => {
  return {
    type: USER_LOGOUT,
  }
}

export const getCases = () => async (dispatch: Dispatch) => {
  try {
    let id = store.getState().user.userId
    let response = await fetch(process.env.REACT_APP_API_URL + `/users/${id}/cases`, {
      method: 'GET',
      credentials: 'include',
    })
    let cases = await response.json()
    if (response.status === 200) {
      dispatch({ type: API_OK, payload: { cases } })
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
    let data = await response.json()
    let id = data.id
    if (response.status === 200) {
      dispatch({ type: USER_OK, payload: {emailValid: true, userId: id} })
    } else {
      dispatch({ type: AUTH_FORBIDDEN, payload: 'Email not in the whitelist' })
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Error with server' })
  }
}

export const getPendingCases = () => async (dispatch: Dispatch) => {
  try {
    let id = store.getState().user.userId
    let response = await fetch(process.env.REACT_APP_API_URL + `/users/${id}/cases/pending`, {
      method: 'GET',
      credentials: 'include',
    })
    let pendingCases: Case[] = await response.json()
    if (response.status === 200) {
      dispatch({ type: API_OK, payload: { pendingCases } })
    } else {
      dispatch({ type: AUTH_OK, payload: false })
    }
  } catch (error) {
    dispatch({ type: AUTH_OK, payload: false })
  }
}

export const acceptPendingCase = (caseId: number, details: any) => async (dispatch: Dispatch) => {
  try {
    let response = await fetch(process.env.REACT_APP_API_URL + `/cases/${caseId}/transfer/accept`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        details: details,
      }),
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

export const createCase = (props: any) => async (dispatch: Dispatch) => {
  try {
    let id = store.getState().user.userId
    let response = await fetch(process.env.REACT_APP_API_URL + `/users/${id}/cases`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        caseDesc: props.caseDesc,
        clientId: props.clientId,
      }),
    })
    let data = await response.json()
    if (response.status === 201) {
      dispatch({ type: API_OK, payload: data })
    } else {
      dispatch({ type: AUTH_OK, payload: false })
    }
  } catch (error) {
    dispatch({ type: AUTH_OK, payload: false })
  }
}

export const transferCaseToUser = (caseId: number, details: any) => async (dispatch: Dispatch) => {
  try {
    let response = await fetch(process.env.REACT_APP_API_URL + `/cases/${caseId}/transfer`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        details: details,
      }),
    })
    let postedEvent: Case = await response.json()
    if (response.status === 200) {
      dispatch({ type: API_OK, payload: { postedEvent } })
    } else {
      dispatch({ type: AUTH_OK, payload: false })
    }
  } catch (error) {
    dispatch({ type: AUTH_OK, payload: false })
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
      dispatch({ type: AUTH_OK, payload: {authenticated: true} })
    } else {
      dispatch({ type: AUTH_FORBIDDEN, payload: 'Invalid token' })
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Auth error' })
  }
}
