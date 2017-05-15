import ModalInput from './ModalInput'
import {connect} from 'react-redux'
import {actions} from './reducer'

const mstp = state => ({
    modals: state.modals
})

const mdtp = {
    closeModal: actions.showModal
}

const mergeprops = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        show: stateProps.modals[ownProps.modalId] || false,
        closeModal: dispatchProps.closeModal.bind(null, ownProps.modalId, false),
        showModal: dispatchProps.closeModal.bind(null, ownProps.modalId, true),
    }
}

export default connect(mstp, mdtp, mergeprops)(ModalInput)
