import {connect} from 'react-redux'
import Notifications from './Notifications'
import {actions} from './reducer'

const mstp = state => ({
    visible: state.notificationsView.visible
})

const mdtp = {
    closeModal: () => dispatch => dispatch(actions.showModal(false)),
}

export default connect(mstp, mdtp)(Notifications)
