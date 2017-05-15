import { push } from 'react-router-redux'

// Go to specific route,
// returns a redux action
const goToScreen = (url) => () => dispatch => {
    dispatch(push(url))
}

export default goToScreen
