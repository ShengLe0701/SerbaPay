import {connect} from 'react-redux'
import BankAccount from './BankAccount'
import {actions} from '../reducer'

const mstp = state => ({
    visible: state.profile.showBankAccountModal
})

const mdtp = {
    closeModal: () => dispatch => dispatch(actions.showBankAccountModal(false)),
    onDone: () => dispatch => dispatch(actions.showBankAccountModal(false))
}

export default connect(mstp, mdtp)(BankAccount)
