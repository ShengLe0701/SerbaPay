import {connect} from 'react-redux'
import VerifyPhone from './VerifyPhone'
import { actions } from './reducer'

const mstp = state => ({
    visible: state.verifyPhone.visible,
    submitting: state.verifyPhone.submitting,
    gettingOtp: state.verifyPhone.gettingOtp,
    user: state.auth.user,
    code: state.verifyPhone.code,
})

const mdtp = {
    closeModal: () => dispatch => dispatch(actions.showVerifyModal(false)),
    submit: actions.submit,
    getOtp: actions.getOtp,
    editCode: actions.editCode,
}

export default connect(mstp, mdtp)(VerifyPhone)
