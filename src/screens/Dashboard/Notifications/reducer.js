import APIClient from '../../../lib/APIClient'
import {Alert} from 'react-native'
import {push} from 'react-router-redux'
// ------------------------------------
// Constants
// ------------------------------------
NOTIFICATIONS_SHOW_MODAL = 'NOTIFICATIONS_SHOW_MODAL'

// ------------------------------------
// Actions
// ------------------------------------

export const showModal = (flag) => ({
    type: NOTIFICATIONS_SHOW_MODAL,
    visible: flag
})

export const actions = {
    showModal,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const initialState = {
    visible: false
}

const ACTION_HANDLERS = {
    [NOTIFICATIONS_SHOW_MODAL]: (state, action) => ({...state, visible: action.visible}),
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
