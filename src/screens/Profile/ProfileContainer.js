import React, { Component } from 'react'
import {connect} from 'react-redux'
import ProfileView from './ProfileView'
import goToScreen from '../../lib/utils/goToScreen'
import {actions} from './reducer'

const mstp = state => ({
    profileCompleted: (
        // (state.auth.user.is_phone_verified === 1) &&
        (state.auth.user.is_pin_set === 1) &&
        (state.auth.user.is_secret_question_set === 1)
    ),
    user: state.auth.user,
})

const mdtp = {
    gotoVerifyMobile: goToScreen('/verify-mobile'),
    gotoDeposit: goToScreen('/deposit'),
    fnShowCompleteModal: actions.showCompleteModal,
    fnShowAddressModal: actions.showAddressModal,
    fnShowCompleteProfileModal: actions.showCompleteProfileModal,
    fnShowPersonalDataModal: () => dispatch => dispatch(actions.showPersonalDataModal(true)),
    fnShowBankAccountModal: () => dispatch => dispatch(actions.showBankAccountModal(true)),
    fnShowLoginPasswordModal: () => dispatch => dispatch(actions.showLoginPasswordModal(true)),
    fnShowPinNumberModal: () => dispatch => dispatch(actions.showPinNumberModal(true)),
}

export default connect(mstp, mdtp)(ProfileView)
