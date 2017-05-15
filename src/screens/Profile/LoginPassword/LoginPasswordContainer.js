import {connect} from 'react-redux'
import LoginPassword from './LoginPassword'
import {actions} from '../reducer'

const mstp = state => ({
    visible: state.profile.showLoginPasswordModal
})

const mdtp = {
    closeModal: () => dispatch => dispatch(actions.showLoginPasswordModal(false)),
    onDone: () => dispatch => dispatch(actions.showLoginPasswordModal(false))
}

export default connect(mstp, mdtp)(LoginPassword)
