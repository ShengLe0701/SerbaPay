import React, { Component } from 'react'
import { Register } from './Register'
import APIClient from '../../lib/APIClient'
import * as actions from '../../reducers/register/actions'
import {connect} from 'react-redux'


const mstp = state => ({
    loading: state.register.loading  || state.auth.loading
})

const mdtp = {
    submit: actions.postData,
}

export default connect(mstp,mdtp)(Register)

