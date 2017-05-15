import APIClient from '../../lib/APIClient'
import {Alert} from 'react-native'
import {push} from 'react-router-redux'
// ------------------------------------
// Constants
// ------------------------------------
NOTIF_NEW_MESSAGE = 'NOTIF_NEW_MESSAGE'
NOTIF_TOKEN = 'NOTIF_TOKEN'

// ------------------------------------
// Actions
// ------------------------------------
export const handleMessage = message => dispatch => {
    console.log('NOTIFICACION', message)
    const {route, opened_from_tray, ...others} = message
    dispatch(newMessage({
        route,
        opened_from_tray
    }))

    if (opened_from_tray){
        // do the actions
        if (route) {
            // try going to the route
            dispatch(push(route))
        }
    }
}

export const updateToken = fcmToken => (dispatch, getState) => {
    const state = getState()
    // get the token, either from the new one or the last one
    fcmToken = fcmToken || state.notifications.token
    console.log('fcm token', fcmToken)

    if(!fcmToken){
        return false
    }

    // set the token in redux
    dispatch(setToken(fcmToken))

    // we need the user to send the token
    const token = state.auth.token
    if (token){
    } else {
        return false
    }

    const client = new APIClient()
    const data = {
        token,
        fcm_token: fcmToken
    }
    client.post('/member/set-fcm-token', data)
        .then(rsp => {
        })
        .catch(err => {
            console.error(err)
        })
}

export const setToken = token => ({
    type: NOTIF_TOKEN,
    token
})

export const newMessage = lastMessage => ({
    type: NOTIF_NEW_MESSAGE,
    lastMessage
})

export const actions = {
    newMessage,
    handleMessage,
    updateToken
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const initialState = {
    lastMessage: {},
    token: ''
}

const ACTION_HANDLERS = {
    [NOTIF_NEW_MESSAGE]: (state, action) => ({...state, lastMessage: action.lastMessage}),
    [NOTIF_TOKEN]: (state, action) => ({...state, token: action.token}),
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
