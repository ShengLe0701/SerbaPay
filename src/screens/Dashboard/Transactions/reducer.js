import APIClient from '../../../lib/APIClient'
import {Alert} from 'react-native'
import {push} from 'react-router-redux'
import { normalize, Schema, arrayOf } from 'normalizr'

const transaction = new Schema('transactions')
const transactions = arrayOf(transaction)

const rawData = [
    {id: 1, date: '2016-10-10', no: '234234223', description: 'foo', reference: '11232', amount: 299.12},
    {id: 2, date: '2016-10-11', no: '121242113', description: 'foo', reference: '11232', amount: 333.33},
    {id: 3, date: '2016-10-12', no: '345234234', description: 'foo', reference: '11232', amount: 422.00},
    {id: 4, date: '2016-10-13', no: '678678867', description: 'foo', reference: '11232', amount: 500.00},
    {id: 5, date: '2016-10-14', no: '231231232', description: 'foo', reference: '11232', amount: 300.00},
]

// ------------------------------------
// Constants
// ------------------------------------
const TRANSACTIONS_SHOW_MODAL = 'TRANSACTIONS_SHOW_MODAL'
const TRANSACTIONS_SHOW_D_MODAL = 'TRANSACTIONS_SHOW_D_MODAL'
const TRANSACTIONS_SELECT = 'TRANSACTIONS_SELECT'

// ------------------------------------
// Actions
// ------------------------------------

export const showModal = (flag) => ({
    type: TRANSACTIONS_SHOW_MODAL,
    visible: flag !== false
})

export const showDetailModal = (flag) => ({
    type: TRANSACTIONS_SHOW_D_MODAL,
    visible: flag !== false
})

export const selectTransaction = id => ({
    type: TRANSACTIONS_SELECT,
    id
})

export const selectAndShow = id => dispatch => {
    dispatch(selectTransaction(id))
    dispatch(showDetailModal())
}

export const actions = {
    showModal,
    showDetailModal,
    selectTransaction,
    selectAndShow,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const initialState = {
    visible: false,
    detailVisible: false,
    transactions: normalize(rawData, transactions).entities.transactions,
    selected: null,
}

const ACTION_HANDLERS = {
    [TRANSACTIONS_SHOW_MODAL]: (state, action) => ({...state, visible: action.visible}),
    [TRANSACTIONS_SHOW_D_MODAL]: (state, action) => ({...state, detailVisible: action.visible}),
    [TRANSACTIONS_SELECT]: (state, action) => ({...state, selected: action.id}),
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
