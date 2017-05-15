import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { routerMiddleware } from 'react-router-redux'
import {
  nativeHistory,
} from 'react-router-native'

export default initialState => {
    const middleware = routerMiddleware(nativeHistory)
    const enhancer = compose(
        applyMiddleware(thunk),
        applyMiddleware(middleware),
        global.reduxNativeDevTools ? global.reduxNativeDevTools(/*options*/) : nope => nope,
    )
    const store = createStore(reducer, initialState, enhancer)
    // If you have other enhancers & middlewares
    // update the store after creating / changing to allow devTools to use them
    if (global.reduxNativeDevTools) {
        global.reduxNativeDevTools.updateStore(store)
    }
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(() => {
            const nextRootReducer = require('./reducers/index').default
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}

