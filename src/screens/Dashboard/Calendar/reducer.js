import APIClient from '../../../lib/APIClient'
import {Alert} from 'react-native'
import {push} from 'react-router-redux'
// ------------------------------------
// Constants
// ------------------------------------
CALENDAR_SHOW_MODAL = 'CALENDAR_SHOW_MODAL'

// ------------------------------------
// Actions
// ------------------------------------

export const showModal = (flag) => ({
    type: CALENDAR_SHOW_MODAL,
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
    [CALENDAR_SHOW_MODAL]: (state, action) => ({...state, visible: action.visible}),
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
