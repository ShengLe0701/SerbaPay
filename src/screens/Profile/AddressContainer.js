import React, { Component } from 'react'
import {connect} from 'react-redux'
import Address from './Address'
import {actions} from './reducer'

const mstp = state => ({
    showAddressModal: state.profile.showAddressModal
})

const mdtp = {
    fnShowAddressModal: actions.showAddressModal
}

export default connect(mstp, mdtp)(Address)
