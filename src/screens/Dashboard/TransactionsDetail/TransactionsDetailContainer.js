import {connect} from 'react-redux'
import TransactionsDetail from './TransactionsDetail'
import {actions} from '../Transactions/reducer'
import _ from 'lodash'

const mstp = state => ({
    visible: state.transactions.detailVisible,
    transaction: state.transactions.selected ?
        state.transactions.transactions[state.transactions.selected] :
        {},
})

const mdtp = {
    closeModal: () => dispatch => dispatch(actions.showDetailModal(false)),
}

export default connect(mstp, mdtp)(TransactionsDetail)
