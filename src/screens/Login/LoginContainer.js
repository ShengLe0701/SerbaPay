import React, { Component } from 'react'
import {Login} from './Login'
import APIClient from '../../lib/APIClient'
import {actions} from './reducer'
import {connect} from 'react-redux'
import goToScreen from '../../lib/utils/goToScreen'

const mstp = state => ({
    loading: state.login.loading || state.auth.loading,
})

const mdtp = {
    submit: actions.postData,
    gotoRecover: goToScreen('/reset-password'),
}

export default connect(mstp, mdtp)(Login)
