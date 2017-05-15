import {connect} from 'react-redux'
import Calendar from './Calendar'
import {actions} from './reducer'
import {actions as transactionActions } from '../Transactions/reducer'

const mstp = state => ({
    visible: state.calendar.visible
})

const mdtp = {
    closeModal: () => dispatch => dispatch(actions.showModal(false)),
    showTransactionsForDay: transactionActions.showModal,
}

export default connect(mstp, mdtp)(Calendar)
