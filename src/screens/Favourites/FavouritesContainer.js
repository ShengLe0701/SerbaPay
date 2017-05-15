import React, { Component } from 'react'
import {connect} from 'react-redux'
import FavouritesView from './FavouritesView'
import goToScreen from '../../lib/utils/goToScreen'

const mstp = state => ({
})

const mdtp = {
    gotoProfile: goToScreen('/profile')
}

export default connect(mstp, mdtp)(FavouritesView)
