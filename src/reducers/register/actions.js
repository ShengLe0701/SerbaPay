import  * as constants from './constants'
import APIClient from '../../lib/APIClient'
import { Alert } from 'react-native'
import { push } from 'react-router-redux'
import { actions as authActions } from '../auth'
import {showVerifyModal} from '../../screens/VerifyPhone/reducer'

export const postData = (data) => dispatch => {
    dispatch(loading(true))
    client = new APIClient()
    client.post('/member/register', data)
        .then(r => {
            dispatch(loading(false))
            dispatch(loadResponse(r))
        })
}

export const loadResponse = rsp => dispatch => {
    let tmsg = ''
    if (rsp.status){
        let token = rsp.data.token
        // set the verify modal to open
        dispatch(showVerifyModal(true))
        // just registered flag
        dispatch(isFirstTime())
        // send token to auth reducer
        dispatch(authActions.authenticate(rsp.data.token))
    }else{
        tmsg = 'Error'
        dispatch({
            type: constants.REGISTER_RESPONSE_DATA,
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

export const isFirstTime = () => ({
    type: constants.REGISTER_IS_FIRST_TIME,
})

export const loading = (flag) => ({
    type: constants.REGISTER_LOADING,
    loading: flag,
})

export const handlers = {
    [constants.REGISTER_RESPONSE_DATA]: (state, action) => ({...state, error: action.error}),
    [constants.REGISTER_SUBMIT_DATA]: (state, action) => ({...state, pais: action.payload}),
    [constants.REGISTER_LOADING]: (state, action) => ({...state, loading: action.loading}),
    [constants.REGISTER_IS_FIRST_TIME]: (state, action) => ({...state, firstTime: true}),
}

export const handleAction = (state, action) => {
    const handler = handlers[action.type]
    return handler ? handler(state, action) : state
}
