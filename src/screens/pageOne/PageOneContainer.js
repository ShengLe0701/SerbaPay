import React, { Component } from 'react'
import { PageOne } from './PageOne'
import {connect} from 'react-redux'
import { push } from 'react-router-redux'
import goToScreen from '../../lib/utils/goToScreen'

const mstp = state => ({
})

const mdtp = {
    gotoLogin: goToScreen('/login'),
    gotoTerms: goToScreen('/terms'),
    gotoRegister: goToScreen('/register')
}

export default connect(mstp,mdtp)(PageOne)
