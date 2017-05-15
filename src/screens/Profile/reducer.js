import APIClient from '../../lib/APIClient'
import {Alert} from 'react-native'
import { push } from 'react-router-redux'
import { actions as phoneActions } from '../VerifyPhone/reducer'
import { actions as authActions } from '../../reducers/auth'
import { actions as modalActions } from '../../components/Input/ModalInput/reducer'
import { clientGetUserDataInfo } from '../../reducers/auth'

// ------------------------------------
// Constants
// ------------------------------------
PROFILE_SHOW_COMPLETE = 'PROFILE_SHOW_COMPLETE'
PROFILE_SHOW_ADDRESS = 'PROFILE_SHOW_ADDRESS'
PROFILE_SHOW_PERSONAL_DATA = 'PROFILE_SHOW_PERSONAL_DATA'
PROFILE_SHOW_BANK_ACCOUNT = 'PROFILE_SHOW_BANK_ACCOUNT'
PROFILE_SHOW_LOGIN_PASSWORD = 'PROFILE_SHOW_LOGIN_PASSWORD'
PROFILE_SHOW_PIN_NUMBER = 'PROFILE_SHOW_PIN_NUMBER'
PROFILE_SET_SEC_QUESTIONS = 'PROFILE_SET_SEC_QUESTIONS'
PROFILE_LOADING_EMAIL_VERIFICATION = 'PROFILE_LOADING_EMAIL_VERIFICATION'
PROFILE_LOADING_MEMBER_INFO = 'PROFILE_LOADING_MEMBER_INFO'

// ------------------------------------
// Actions
// ------------------------------------


export const showAddressModal = (show) => ({
    type: PROFILE_SHOW_ADDRESS,
    show
})

export const showPersonalDataModal = (show) => ({
    type: PROFILE_SHOW_PERSONAL_DATA,
    show
})

export const showBankAccountModal = (show) => ({
    type: PROFILE_SHOW_BANK_ACCOUNT,
    show
})

export const showLoginPasswordModal = (show) => ({
    type: PROFILE_SHOW_LOGIN_PASSWORD,
    show
})

export const showPinNumberModal = (show) => ({
    type: PROFILE_SHOW_PIN_NUMBER,
    show
})

// ---------- COMPLETE PROFILE -----------------
export const showCompleteModal = (show) => ({
    type: PROFILE_SHOW_COMPLETE,
    show
})

export const showCompleteProfileModal = () => (dispatch, getState) => {
    const state = getState()
    // show verify mobile
    const {is_phone_verified, is_secret_question_set, is_pin_set} = state.auth.user
    // show required modal
/*    if (!is_phone_verified) {
        dispatch(phoneActions.showVerifyModal(true))
    } else if (!is_secret_question_set || !is_pin_set){
        dispatch(showCompleteModal(true))
    }*/

    // correccion temporal para poder probar la interface de completar perfil
    if (!is_secret_question_set || !is_pin_set){
        dispatch(authActions.getUserDataInfo())
        dispatch(showCompleteModal(true))
    }
}

// Get security questions form API
export const getSecQuestions = () => (dispatch, getState) => {
    const state = getState()
    const {token} = state.auth
    const client = new APIClient(token)

    client.getData('/get-secret-question-list')
        .then(data => dispatch(setSecQuestions(data)))
}

// set the questions
export const setSecQuestions = questions => ({
    type: PROFILE_SET_SEC_QUESTIONS,
    secQuestions: questions,
})
// post security fields
export const postCompleteProfile = data => (dispatch, getState) => {
    const state = getState()
    const {token} = state.auth
    const client = new APIClient(token)
    client.postData('/member/set-security', data, {showSuccessAlert: true}).then(data => {
        if (data.status){
            // reload user data
            authActions.getUserDataInfo()
            dispatch(showCompleteModal(false))
        }
    })
}

// ----------- PERSONAL DATA -----------
export const requestEmailVerification = () => (dispatch, getState) => {
    const state = getState()
    const {token} = state.auth
    const client = new APIClient(token)

    // prevent doing it twice
    if (!state.profile.loadingEmailVerification){
        dispatch(loadingEmailVerification(true))
        client.postData('/member/request-email-verification', {}, {showSuccessAlert: true})
            .then(data => {
                dispatch(loadingEmailVerification(false))
            })
    }

}

export const editMemberInfo = (field, value, modalId) => (dispatch, getState) => {
    const state = getState()
    const {token} = state.auth
    const client = new APIClient(token)

    switch(field){
    case 'full_name':
        field = 'name'
        break
    }

    const data = {
        [field]: value
    }

    dispatch(loadingMemberInfo(true))
    client.postData('/member/set-info', data)
        .then(data => {
            dispatch(loadingMemberInfo(false))
            if (data.status === 1){
                dispatch(loadingMemberInfo(true))
                // update user data from server
                clientGetUserDataInfo(token, dispatch).then(data => {
                    dispatch(loadingMemberInfo(false))
                    // close modal
                    dispatch(modalActions.showModal(modalId, false))
                })
            }
        })
}

export const loadingMemberInfo = flag => ({
    type: PROFILE_LOADING_MEMBER_INFO,
    flag,
})

export const loadingEmailVerification = flag => ({
    type: PROFILE_LOADING_EMAIL_VERIFICATION,
    flag,
})

// ACTIONS
export const actions = {
    // profile
    showCompleteModal,
    showAddressModal,
    showPersonalDataModal,
    showBankAccountModal,
    showLoginPasswordModal,
    showPinNumberModal,
    showCompleteProfileModal,

    // complete profile
    getSecQuestions,
    setSecQuestions,
    postCompleteProfile,

    // personalData
    requestEmailVerification,
    loadingEmailVerification,
    editMemberInfo,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const initialState = {
    showCompleteModal: false,
    showAddressModal: false,
    showPersonalDataModal: false,
    showBankAccountModal: false,
    showLoginPasswordModal: false,
    showPinNumberModal: false,

    // complete profile status
    seqQuestions: [],
    loadingCompleteData: false,
    loadingEmailVerification: false,
    loadingMemberInfo: false,
}

const ACTION_HANDLERS = {
    [PROFILE_SHOW_COMPLETE]: (state, action) => ({...state, showCompleteModal: action.show}),
    [PROFILE_SHOW_ADDRESS]: (state, action) => ({...state, showAddressModal: action.show}),
    [PROFILE_SHOW_PERSONAL_DATA]: (state, action) => ({...state, showPersonalDataModal: action.show}),
    [PROFILE_SHOW_BANK_ACCOUNT]: (state, action) => ({...state, showBankAccountModal: action.show}),
    [PROFILE_SHOW_LOGIN_PASSWORD]: (state, action) => ({...state, showLoginPasswordModal: action.show}),
    [PROFILE_SHOW_PIN_NUMBER]: (state, action) => ({...state, showPinNumberModal: action.show}),
    [PROFILE_SET_SEC_QUESTIONS]: (state, action) => ({...state, secQuestions: action.secQuestions}),
    [PROFILE_LOADING_EMAIL_VERIFICATION]: (state, action) => ({...state, loadingEmailVerification: action.flag}),
    [PROFILE_LOADING_MEMBER_INFO]: (state, action) => ({...state, loadingMemberInfo: action.flag}),
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
