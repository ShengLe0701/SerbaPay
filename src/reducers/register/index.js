import { handleAction } from './actions'

const initialState = {
    loading: false,
    error: null,
    firstTime: false
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = initialState, action) {
    return handleAction(state, action)
}
