import { combineReducers } from 'redux'
// ... other reducers
import register from './register'
import auth from './auth'
import notifications from './notifications'
import login from '../screens/Login/reducer'
import profile from '../screens/Profile/reducer'
import verifyPhone from '../screens/VerifyPhone/reducer'
import notificationsView from '../screens/Dashboard/Notifications/reducer'
import calendar from '../screens/Dashboard/Calendar/reducer'
import transactions from '../screens/Dashboard/Transactions/reducer'
import QR from '../screens/Dashboard/QR/reducer'
import reset_password from './reset_password'
import modals from '../components/Input/ModalInput/reducer'
import deposit from '../screens/Deposit/reducer'


import { routerReducer } from 'react-router-redux'

export default combineReducers({
    routing: routerReducer,
    reset_password,
    profile,
    login,
    auth,
    register,
    verifyPhone,
    notifications,
    notificationsView,
    calendar,
    transactions,
    QR,
    modals,
    deposit
})
