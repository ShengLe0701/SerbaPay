import PersonalData from './PersonalData'
import { connect } from 'react-redux'
import { actions } from '../reducer'

const mstp = state => ({
    visible: state.profile.showPersonalDataModal,
    user: state.auth.user,
    loadingEmailVerification: state.profile.loadingEmailVerification,
    loadingMemberInfo: state.profile.loadingMemberInfo,
})

const mdtp = {
    closeModal: () => dispatch => dispatch(actions.showPersonalDataModal(false)),
    requestEmailVerification: actions.requestEmailVerification,
    editMemberInfo: actions.editMemberInfo,
}

export default connect(mstp, mdtp)(PersonalData)
