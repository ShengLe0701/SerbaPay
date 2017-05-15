import APIClient from '../../lib/APIClient'
import {Alert} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { Platform } from 'react-native'
import { actions as authActions } from '../../reducers/auth'

//gloabl valule
import { globalData } from '../../app';


// ------------------------------------
// Constants
// ------------------------------------
DEPOSIT_LOADING = 'DEPOSIT_LOADING'
DEPOSIT_SUBMIT_DATA = 'DEPOSIT_SUBMIT_DATA'
DEPOSIT_RESPONSE_DATA = 'DEPOSIT_RESPONSE_DATA'
DEPOSIT_LOAD_CANNELLIST_DATA = 'DEPOSIT_LOAD_CANNELLIST_DATA'
DEPOSIT_SET_GROUPNAME = 'DEPOSIT_SET_GROUPNAME'
DEPOSIT_SET_ITEMINDEX = 'DEPOSIT_SET_ITEMINDEX'

// ------------------------------------
// Actions
// ------------------------------------
const postData = () => (dispatch, getState) => {

    const state = getState()
    const {token} = state.auth
    
    dispatch(loading(true))
    client = new APIClient()

    let data = {}
    data.token = token

    client.post('/transaction/get-deposit-channel-list', data)
        .then(r => {
            dispatch(loading(false))
            dispatch(loadResponse(r))
        })
}

const loadDepositChannelList = data => ({
    type: DEPOSIT_LOAD_CANNELLIST_DATA,
    channellist: data
})


const setDepositGroupName = name => dispatch => {
    globalData.depositGroupName = name; 
    
    dispatch({
        type: DEPOSIT_SET_GROUPNAME,
        groupname: name
    })
}

const setDepositItemIndex = index => dispatch => {
    dispatch ({
        type: DEPOSIT_SET_ITEMINDEX,
        itemindex: index
    })
}


const loadResponse = rsp => dispatch => {
    let tmsg = ''
    if (rsp.status){
//        alert('deposit list:' + JSON.stringify(rsp.data))
        dispatch(loadDepositChannelList(rsp.data))
    }else{
        tmsg = 'Error'
        dispatch({
            type: DEPOSIT_RESPONSE_DATA,
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
    type: DEPOSIT_LOADING,
    loading: flag
})

export const actions = {
    postData,
    setDepositGroupName,
    setDepositItemIndex,    
}
// ------------------------------------
// Action Handlers
// ------------------------------------

const initialState = {
    loading: false,
    error: null,
    channellist : null,
    groupname : null,
    itemindex: -1,
}

const ACTION_HANDLERS = {
    [DEPOSIT_RESPONSE_DATA]: (state, action) => ({...state, error: action.error}),
    [DEPOSIT_SUBMIT_DATA]: (state, action) => ({...state, pais: action.payload}),
    [DEPOSIT_LOADING]: (state, action) => ({...state, loading: action.loading}),
    [DEPOSIT_LOAD_CANNELLIST_DATA]: (state, action) => ({...state, channellist: action.channellist}),
    [DEPOSIT_SET_GROUPNAME]: (state, action) => ({...state, groupname: action.groupname}),
    [DEPOSIT_SET_ITEMINDEX]: (state, action) => ({...state, itemindex: action.itemindex}),
}


// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
