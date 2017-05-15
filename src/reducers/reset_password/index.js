import APIClient from '../../lib/APIClient'
import {Alert} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { Platform } from 'react-native'

// ------------------------------------
// Constants
// ------------------------------------
RPASSWORD_LOADING = 'RPASSWORD_LOADING'
RPASSWORD_SUBMIT_DATA = 'RPASSWORD_SUBMIT_DATA'
RPASSWORD_RESPONSE_DATA = 'RPASSWORD_RESPONSE_DATA'

// ------------------------------------
// Actions
// ------------------------------------
const postData = (formdata) => dispatch => {
    dispatch(loading(true))
    client = new APIClient()

    let data = {...formdata}
    data.device = DeviceInfo.getBrand() + ' ' + DeviceInfo.getModel()
    data.device_id = DeviceInfo.getUniqueID()
    data.client_id = 'dummy'
    data.platform = Platform.OS

    client.post('/member/reset-password', data)
        .then(r => {
            dispatch(loading(false))
            dispatch(loadResponse(r))
        })
}

const loadResponse = rsp => dispatch => {
    let tmsg = ''
    if (rsp.status){
    }else{
        tmsg = 'Error'
        dispatch({
            type: RPASSWORD_RESPONSE_DATA,
            error: rsp.message
        })
    }
    if (rsp.message){
        Alert.alert(
            tmsg,
            rsp.message,
            [
                {text: 'OK'},
            ]
        )
    }
}


const loading = (flag) => ({
    type: RPASSWORD_LOADING,
    loading: flag
})

export const actions = {
    postData
}
// ------------------------------------
// Action Handlers
// ------------------------------------

const initialState = {
    loading: false,
    error: null,
}

const ACTION_HANDLERS = {
    [RPASSWORD_RESPONSE_DATA]: (state, action) => ({...state, error: action.error}),
    [RPASSWORD_SUBMIT_DATA]: (state, action) => ({...state, pais: action.payload}),
    [RPASSWORD_LOADING]: (state, action) => ({...state, loading: action.loading}),
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
