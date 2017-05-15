// ------------------------------------
// Constants
// ------------------------------------
MODALS_SHOWHIDE = 'MODALS_SHOWHIDE'

// ------------------------------------
// Actions
// ------------------------------------

export const showModal = (id, show) => ({
    type: MODALS_SHOWHIDE,
    id,
    show,
})

// ACTIONS
export const actions = {
    showModal,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const initialState = {
}

const ACTION_HANDLERS = {
    [MODALS_SHOWHIDE]: (state, action) => ({...state, [action.id]: action.show}),
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
