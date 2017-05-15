import React, { Component } from 'react'
import {connect} from 'react-redux'
import CompleteProfile from './CompleteProfile'
import { actions } from '../reducer'

const mstp = state => ({
    showCompleteModal: state.profile.showCompleteModal,
    questions: state.profile.secQuestions || [],
    showPin: (state.auth.user.is_pin_set !== 1),
    showQuestion: (state.auth.user.is_secret_question_set !== 1),
    loading: state.profile.loadingCompleteData,
})

const mdtp = {
    submit: actions.postCompleteProfile,
    fnShowCompleteModal:  actions.showCompleteModal,
    getQuestions: actions.getSecQuestions,
}

export default connect(mstp, mdtp)(CompleteProfile)
