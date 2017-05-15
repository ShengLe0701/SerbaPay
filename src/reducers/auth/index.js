import APIClient from '../../lib/APIClient'
import {Alert} from 'react-native'
import {push} from 'react-router-redux'
import { actions as notificationActions}  from '../notifications'

// ------------------------------------
// Constants
// ------------------------------------
AUTH_LOAD_USER_DATA = 'AUTH_LOAD_USER_DATA'
AUTH_AUTHENTICATED = 'AUTH_AUTHENTICATED'
AUTH_LOADING = 'AUTH_LOADING'
AUTH_SET_TOKEN = 'AUTH_SET_TOKEN'

// ------------------------------------
// Actions
// ------------------------------------

export const clientGetUserDataInfo = (token, dispatch) => {
    const client = new APIClient(token)

    return client.postData('/member/get-info').then(data => {
        dispatch(loadUserData(data))
        return data
    })
}

export const authenticate = (token) => dispatch => {
    dispatch(loading(true))
    dispatch(setToken(token))

    clientGetUserDataInfo(token, dispatch).then(data => {
        dispatch(authenticated(true))
        dispatch(push('/dashboard'))
        dispatch(notificationActions.updateToken())
        dispatch(loading(false))
    }).catch(err => {
        dispatch(loading(false))
    })
}

export const getUserDataInfo = () => (dispatch, getState) => {
    const state = getState()
    const {token} = state.auth

    clientGetUserDataInfo(token, dispatch)
}

export const authenticated = flag => ({
    type: AUTH_AUTHENTICATED,
    isAuthenticated: flag
})

export const loadUserData = data => ({
    type: AUTH_LOAD_USER_DATA,
    user: data
})

export const setToken = token => ({
    type: AUTH_SET_TOKEN,
    token
})

const loading = (flag) => ({
    type: AUTH_LOADING,
    loading: flag
})

export const actions = {
    authenticate,
    authenticated,
    loadUserData,
    getUserDataInfo,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const initialState = {
    loading: false,
    isAuthenticated: false,
    token: '',
    user: {}
}

const ACTION_HANDLERS = {
    [AUTH_AUTHENTICATED]: (state, action) => ({...state, isAuthenticated: action.isAuthenticated}),
    [AUTH_LOADING]: (state, action) => ({...state, loading: action.loading}),
    [AUTH_SET_TOKEN]: (state, action) => ({...state, token: action.token}),
    [AUTH_LOAD_USER_DATA]: (state, action) => ({...state, user: action.user}),
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
