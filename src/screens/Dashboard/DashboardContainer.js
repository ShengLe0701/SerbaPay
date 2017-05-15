import React, { Component } from 'react'
import {connect} from 'react-redux'
import DashboardView from './DashboardView'
import goToScreen from '../../lib/utils/goToScreen'
import {showVerifyModal} from '../VerifyPhone/reducer'
import { actions as notifActions } from './Notifications/reducer'
import { actions as calendarActions } from './Calendar/reducer'
import { actions as QRActions } from './QR/reducer'

const mstp = state => ({
    user: state.auth.user,
    justRegistered: state.register.firstTime,
})

const mdtp = {
    gotoProfile: goToScreen('/profile'),
    showVerifyPhoneModal: () => dispatch => dispatch(showVerifyModal(true)),
    showNotificationsModal: () => dispatch => dispatch(notifActions.showModal(true)),
    showCalendarModal: () => dispatch => dispatch(calendarActions.showModal(true)),
    showQRScanModal: () => dispatch => {
        dispatch(QRActions.showTab('scan'))
        dispatch(QRActions.showModal(true))
    },
    showQRPlayModal: () => dispatch => {
        dispatch(QRActions.showTab('play'))
        dispatch(QRActions.showModal(true))
    },
}

export default connect(mstp, mdtp)(DashboardView)
