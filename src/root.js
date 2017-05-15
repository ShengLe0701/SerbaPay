import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import appStore from './store'
import { Router } from './router'
import { syncHistoryWithStore } from 'react-router-redux'
import {
  nativeHistory,
} from 'react-router-native'
import pushNotifications from './components/PushNotifications'
import {actions as notificationActions} from './reducers/notifications'

// connect notifications with redux
const RouterWithNotifications = connect(null, notificationActions)(pushNotifications(Router))

// redux
const store = appStore({})
const history = syncHistoryWithStore(nativeHistory, store)
history.push('/')
//history.push('/depositgroupdetail')

export class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterWithNotifications history={history}/>
            </Provider>
        )
    }
}

export default Root
