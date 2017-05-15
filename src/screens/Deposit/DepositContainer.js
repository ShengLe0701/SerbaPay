import React, { Component } from 'react'
import {connect} from 'react-redux'
import DepositView from './DepositView'
import goToScreen from '../../lib/utils/goToScreen'
import {showVerifyModal} from '../VerifyPhone/reducer'
import { actions as notifActions } from '../Dashboard/Notifications/reducer'
import { actions as calendarActions } from '../Dashboard/Calendar/reducer'
import {actions} from './reducer'



const mstp = state => ({
    user: state.auth.user,
    justRegistered: state.register.firstTime,
    depositchannellist: state.deposit.channellist,
})


const mdtp = {
    gotoProfile: goToScreen('/profile'),
    gotoDepositGroupDetail: goToScreen('/depositGroupDetail'),
    gotoDepositItemDetail: goToScreen('/depositItemDetail'),

    getDepositChannelList: actions.postData,
    setDepositGroupName: actions.setDepositGroupName,
    setDepositItemIndex: actions.setDepositItemIndex,

    showVerifyPhoneModal: () => dispatch => dispatch(showVerifyModal(true)),
    showNotificationsModal: () => dispatch => dispatch(notifActions.showModal(true)),
    showCalendarModal: () => dispatch => dispatch(calendarActions.showModal(true)),
}

export default connect(mstp, mdtp)(DepositView)
