import React, { Component } from 'react'
import {ResetPassword} from './ResetPassword'
import APIClient from '../../lib/APIClient'
import {actions} from '../../reducers/reset_password'
import {connect} from 'react-redux'


const mstp = state => ({
    loading: state.reset_password.loading
})

const mdtp = {
    submit: actions.postData,
}

export default connect(mstp,mdtp)(ResetPassword)
