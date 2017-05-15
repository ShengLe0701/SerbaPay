import React, { Component } from 'react'
import { connect } from 'react-redux'
import { navBarStyles } from './styles/global'

import {
  Link,
  nativeHistory,
  Route,
  Router as NativeRouter,
  StackRoute,
    TabsRoute,
  withRouter,
} from 'react-router-native'

// components
import { Header, CancelHeader, LeftCancelHeader } from './components/Headers'
import { TabOverlay } from './components/Tabs'

// screens
import PageOne from './screens/pageOne'
import Login from './screens/Login'
import Terms from './screens/Terms'
import Register from './screens/Register'
import ResetPassword from './screens/ResetPassword'
import Dashboard from './screens/Dashboard'
import Deposit from './screens/Deposit'
import Favourites from './screens/Favourites'
import Profile from './screens/Profile'
import DepositGroupDetail from './screens/Deposit/DepositGroupDetail'
import DepositItemDetail from './screens/Deposit/DepositItemDetail'

//gloabl valule
import { globalData } from './app';


import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

const bluePageProps = {
    navigationBarStyle: navBarStyles.bluePage,
    titleStyle: [navBarStyles.defaultTitle, navBarStyles.bluePageTitle],
    backButtonImage: require('./styles/assets/back_chevron.png'),
    hideNavBar: false
}

const whitePageProps = {
    titleStyle: navBarStyles.defaultTitle,
    navigationBarStyle: navBarStyles.defaultBar,
    hideNavBar: false
}

const styles = StyleSheet.create({
    component: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    }
})

const Master = (props) => (
    <View style={styles.component}>
        {props.children}
    </View>
)


export class Router extends Component {
    render() {
        let addressBar = false
        // if (__DEV__) {
        //     addressBar = true
        // }
        return (
            <NativeRouter history={this.props.history} addressBar={addressBar}>
                <StackRoute path="master" component={Master} >
                    <Route path="/" component={PageOne} />
                    <Route path="/terms" component={Terms} overlayComponent={Header({title: 'Terms of Service'})} />
                    <Route path="/login" component={Login} overlayComponent={Header()} />
                    <Route path="/reset-password" component={ResetPassword} overlayComponent={LeftCancelHeader()} />
                    <Route path="/register" component={Register} overlayComponent={Header()} />

                    <Route path="/depositgroupdetail" component={DepositGroupDetail}/>
                    <Route path="/deposititemdetail" component={DepositItemDetail}/>
                    
                </StackRoute>
                <TabsRoute path='mainApp' component={TabOverlay} transition="horizontal-pager">
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/deposit" component={Deposit} />
                    <Route path="/favourites" component={Favourites} />
                    <Route path="/profile" component={Profile} overlayComponent={Header({title: 'My Acccount', back: false})} />
                </TabsRoute>
            </NativeRouter>
        )
    }
}
