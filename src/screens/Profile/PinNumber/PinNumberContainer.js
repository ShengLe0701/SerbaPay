import {connect} from 'react-redux'
import PinNumber from './PinNumber'
import {actions} from '../reducer'

const mstp = state => ({
    visible: state.profile.showPinNumberModal
})

const mdtp = {
    closeModal: () => dispatch => dispatch(actions.showPinNumberModal(false)),
    onDone: () => dispatch => dispatch(actions.showPinNumberModal(false))
}

export default connect(mstp, mdtp)(PinNumber)
