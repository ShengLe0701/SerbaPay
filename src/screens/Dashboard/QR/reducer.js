import APIClient from '../../../lib/APIClient'
import {Alert} from 'react-native'
import {push} from 'react-router-redux'
// ------------------------------------
// Constants
// ------------------------------------
QR_SHOW_MODAL = 'QR_SHOW_MODAL'
QR_SHOW_TAB = 'QR_SHOW_TAB'

// ------------------------------------
// Actions
// ------------------------------------

export const showModal = (flag) => ({
    type: QR_SHOW_MODAL,
    visible: flag
})

export const showTab = tab => ({
    type: QR_SHOW_TAB,
    tab
})

export const actions = {
    showModal,
    showTab,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const initialState = {
    visible: false,
    activeTab: 'scan',
}

const ACTION_HANDLERS = {
    [QR_SHOW_MODAL]: (state, action) => ({...state, visible: action.visible}),
    [QR_SHOW_TAB]: (state, action) => ({...state, activeTab: action.tab}),
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
