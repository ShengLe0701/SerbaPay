import { connect } from 'react-redux'
import QR from './QR'
import { actions } from './reducer'

const mstp = state => ({
    visible: state.QR.visible,
    activeTab: state.QR.activeTab,
})

const mdtp = {
    closeModal: () => dispatch => dispatch(actions.showModal(false)),
    showScan: () => dispatch => dispatch(actions.showTab('scan')),
    showPlay: () => dispatch => dispatch(actions.showTab('play')),
}

export default connect(mstp, mdtp)(QR)
