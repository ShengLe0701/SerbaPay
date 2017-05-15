import APIClient from '../../lib/APIClient'
import {Alert} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { Platform } from 'react-native'
import { actions as authActions } from '../../reducers/auth'

// ------------------------------------
// Constants
// ------------------------------------
LOGIN_LOADING = 'LOGIN_LOADING'
LOGIN_SUBMIT_DATA = 'LOGIN_SUBMIT_DATA'
LOGIN_RESPONSE_DATA = 'LOGIN_RESPONSE_DATA'

// ------------------------------------
// Actions
// ------------------------------------
const postData = (formdata) => dispatch => {
    dispatch(loading(true))
    client = new APIClient()

    let data = {...formdata}
    data.device = DeviceInfo.getBrand() + ' ' + DeviceInfo.getModel()
    data.device_id = DeviceInfo.getUniqueID()
    data.client_id = 'dummy-id'
    data.platform = Platform.OS


    client.post('/member/login', data)
        .then(r => {
            dispatch(loading(false))
            dispatch(loadResponse(r))
        })
}

const loadResponse = rsp => dispatch => {
    let tmsg = ''
    if (rsp.status){
        dispatch(authActions.authenticate(rsp.data.token))
    }else{
        tmsg = 'Error'
        dispatch({
            type: LOGIN_RESPONSE_DATA,
            error: rsp.message
        })
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
}


const loading = (flag) => ({
    type: LOGIN_LOADING,
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
    [LOGIN_RESPONSE_DATA]: (state, action) => ({...state, error: action.error}),
    [LOGIN_SUBMIT_DATA]: (state, action) => ({...state, pais: action.payload}),
    [LOGIN_LOADING]: (state, action) => ({...state, loading: action.loading}),
}



// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
