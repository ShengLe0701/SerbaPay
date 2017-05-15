import {connect} from 'react-redux'
import Transactions from './Transactions'
import {actions} from './reducer'
import _ from 'lodash'

const mstp = state => ({
    visible: state.transactions.visible,
    transactions: _.values(state.transactions.transactions),
})

const mdtp = {
    closeModal: () => dispatch => dispatch(actions.showModal(false)),
}

export default connect(mstp, mdtp)(Transactions)
