import React, { Component } from 'react'
import {connect} from 'react-redux'
import DepositGroupDetailView from './DepositGroupDetailView'
import goToScreen from '../../../lib/utils/goToScreen'
import {showVerifyModal} from '../../VerifyPhone/reducer'
import { actions as notifActions } from '../../Dashboard/Notifications/reducer'
import { actions as calendarActions } from '../../Dashboard/Calendar/reducer'
import {actions} from '../reducer'



const mstp = state => ({
    depositgroupname : state.deposit.groupname,
    deposititemindex : state.deposit.itemindex,
    depositchannellist: state.deposit.channellist,
})


const mdtp = {
    gotoBack: goToScreen('/deposit'),
    gotoDepositItemDetail: goToScreen('/depositItemDetail'),
    setDepositItemIndex: actions.setDepositItemIndex,

}

export default connect(mstp, mdtp)(DepositGroupDetailView)
