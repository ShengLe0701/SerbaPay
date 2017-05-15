import APIClient from '../../lib/APIClient'
import {Alert} from 'react-native'
import {push} from 'react-router-redux'
// ------------------------------------
// Constants
// ------------------------------------
VERIFYMOBILE_SHOW_MODAL = 'VERIFYMOBILE_SHOW_MODAL'
VERIFYMOBILE_EDIT_CODE = 'VERIFYMOBILE_EDIT_CODE'
VERIFYMOBILE_SUBMITTING = 'VERIFYMOBILE_SUBMITTING'
VERIFYMOBILE_GETTING_OTP = 'VERIFYMOBILE_GETTING_OTP'
EMPTY_CODE = [' ', ' ', ' ', ' ', ' ', ' ']

// ------------------------------------
// Actions
// ------------------------------------

export const showVerifyModal = (flag) => ({
    type: VERIFYMOBILE_SHOW_MODAL,
    visible: flag
})

export const submit = () => (dispatch, getState) => {
    // submit data
    const code = [...getState().verifyPhone.code].join('')

    dispatch(submitting(true))
    // clean the code
    dispatch(editCode(EMPTY_CODE))

    const state = getState()
    const data = {
        token: state.auth.token,
        otp_code: code
    }

    const client = new APIClient()
    client.post('/member/verify-otp', data)
        .then(data => {
            dispatch(submitting(false))
            if (!data.status){
                Alert.alert('Error', data.message)
            }
            else {
                if (data.message)
                    Alert.alert(data.message)
                dispatch(showVerifyModal(false))
            }
        })
        .catch(err => {
            dispatch(submitting(false))
            console.error(err)
        })
}

export const submitting = submitting => ({
    type: VERIFYMOBILE_SUBMITTING,
    submitting
})

export const gettingOtp = gettingOtp => ({
    type: VERIFYMOBILE_GETTING_OTP,
    gettingOtp
})

export const getOtp = () => (dispatch, getState) => {
    // submit data
    dispatch(gettingOtp(true))
    const state = getState()
    const data = {
        token: state.auth.token
    }

    const client = new APIClient()
    client.post('/member/get-otp', data)
        .then(data => {
            dispatch(gettingOtp(false))
            if (!data.status){
                Alert.alert('Error', data.message)
            }
            else {
                console.log('get again', data)
                if (data.message)
                    Alert.alert(data.message)
            }
        })
        .catch(err => {
            dispatch(gettingOtp(false))
            console.error(err)
        })
}

export const editCode = code => dispatch => {
    dispatch(_setCode(code))
    // submit when complete
    if (code.every(item => parseInt(item))){
        dispatch(submit())
    }
}

const _setCode = code => ({
    type: VERIFYMOBILE_EDIT_CODE,
    code
})

export const actions = {
    showVerifyModal,
    submit,
    submitting,
    getOtp,
    editCode,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const initialState = {
    visible: false,
    submitting: false,
    gettingOtp: false,
    showLink: false,
    code: EMPTY_CODE,
}

const ACTION_HANDLERS = {
    [VERIFYMOBILE_SHOW_MODAL]: (state, action) => ({...state, visible: action.visible}),
    [VERIFYMOBILE_SUBMITTING]: (state, action) => ({...state, submitting: action.submitting}),
    [VERIFYMOBILE_GETTING_OTP]: (state, action) => ({...state, gettingOtp: action.gettingOtp}),
    [VERIFYMOBILE_EDIT_CODE]: (state, action) => ({...state, code: action.code}),
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
