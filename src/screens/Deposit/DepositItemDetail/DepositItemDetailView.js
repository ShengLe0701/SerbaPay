import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, Image, TouchableHighlight, Modal, Platform, WebView } from 'react-native'
import { DefaultText, LinkText } from '../../../components/Text'
import { colors, styles, sizes } from '../../../styles/global'
import { Alert } from '../../../components/Alert'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Share, {ShareSheet, Button} from 'react-native-share'

//modals
import VerifyPhone from '../../VerifyPhone'
import Notifications from '../../Dashboard/Notifications'
import Calendar from '../../Dashboard/Calendar'

import Spinner from 'react-native-loading-spinner-overlay';


var DepositBodyHeight = sizes.height - sizes.iosPaddingAdjust - sizes.headerHeight;
var DepositBodyWidth = sizes.width;

const pageStyles = StyleSheet.create({
    page: {
        flex: 1,
//        paddingTop: sizes.iosPaddingAdjust,
    },

    alert: {
        paddingTop: Platform.OS === 'ios' ? sizes.iosPaddingAdjust : 0,
        height: Platform.OS === 'ios' ? sizes.iosPaddingAdjust + sizes.alertHeight : sizes.alertHeight,
    },
    toolBar: {
        height: sizes.headerHeight,
        backgroundColor: colors.primaryBg,
        flexDirection: 'row',
        paddingRight: 20,
        paddingLeft: 20,
        justifyContent: 'space-between',
        alignItems:'center',
    },
    toolBarButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    toolBarLeft: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    toolBarRight: {
        flex:1,
    },
    toolBarIconTouchable: {
        backgroundColor: colors.primaryBg,
        flexDirection:'row',
        alignItems:'center',
    },
    toolBarIcon: {
        fontSize: 26,
        color: colors.primaryText,
    },
    toolBarIconN: {
        fontSize: 11,
        fontWeight: 'bold',
        color: colors.primaryText,
    },
    toolBarIconNView: {
        backgroundColor: colors.danger,
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 3,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 20,
    },
    toolBarClockIcon: {
        marginRight: 5
    },

    toolBarTitle: {
        flex:2.5,
        color:'#FFF',
        fontSize:23,
        fontWeight:'bold',
        textAlign:'center'
    },
    toolBarTitle1: {
        flex:2.5,
        color:'#FFF',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    },
    toolBarIconTitle: {
        color:'#FFF',
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center'
    },

    statusBar: {
        backgroundColor: colors.primaryBg,
        height : sizes.iosPaddingAdjust,
        width : sizes.width,
    },

    Webview: {
        height:DepositBodyHeight,
        width:DepositBodyWidth,
    }
    
})

const StatusBar = props => {
    return (
        <View style={pageStyles.statusBar}>
        </View>
    )
}

const ToolBarIcon = props => {
    const {icon, onPress, style, n} = props
    return (
        <TouchableHighlight onPress={onPress} >
            <View style={pageStyles.toolBarIconTouchable}>
                <FontAwesome name={icon} style={[style, pageStyles.toolBarIcon]} />
                {n && (
                    <View style={pageStyles.toolBarIconNView}>
                        <DefaultText style={pageStyles.toolBarIconN}>{n}</DefaultText>
                    </View>
                )}
            </View>
        </TouchableHighlight>
    )
}

const ToolBar = props => {
    const {depositchannellist, depositgroupname, deposititemindex} = props
    var name = depositchannellist[depositgroupname][deposititemindex].name
    
    return (
        <View style={pageStyles.toolBar}>
            <TouchableHighlight style={[pageStyles.toolBarLeft, pageStyles.toolBarButtonsContainer]}
                                underlayColor={'transparent'} 
                                onPress={()=> {props.gotoBack()}}>
                <View style={pageStyles.toolBarIconTouchable}>
                    <ToolBarIcon icon='chevron-left'/>
                    <DefaultText style={pageStyles.toolBarIconTitle}>Back</DefaultText>
                </View>
            </TouchableHighlight>
            <DefaultText style={ name && name.length < 12 ? pageStyles.toolBarTitle : pageStyles.toolBarTitle1 }>
                {name}
            </DefaultText>
            <View style={[pageStyles.toolBarRight, pageStyles.toolBarButtonsContainer]}>
            </View>
        </View>
    )
}

const ActionWebView = props => {
    const {depositchannellist, depositgroupname, deposititemindex} = props

    if( depositgroupname && deposititemindex>=0) {
        var actionURL = depositchannellist[depositgroupname][deposititemindex].action_url

        return ( 
            <WebView style={pageStyles.Webview}
                source={{uri: actionURL}}
                scalesPageToFit={true}
                onNavigationStateChange={props.onNavigationStateChange}
                onMessage = {props.onMessage}
            /> 
        )
    }
    else {
        return ( 
            <View/> 
        )

    }
}

export class DepositItemDetailView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loadingSpinner : false,
        };

    }

    componentDidMount() {
        console.log('Deposit did mount')
    }
    
    static propTypes = {
        gotoBack: React.PropTypes.func.isRequired,
    }

    renderAlert(){
        // validate mobile
        if (!this.props.user.is_phone_verified) {
            // TODO: verify Modal
            return (
                <Alert style={pageStyles.alert} onPress={this.props.showVerifyPhoneModal}>
                    You have not completed your profile yet
                </Alert>
            )
        }
        else if (!this.props.user.is_email_verified){
            return (
                <Alert style={pageStyles.alert} onPress={this.props.gotoProfile}>
                    You have not completed your profile yet
                </Alert>
            )
        }
        return null
    }

    onNavigationStateChange = (navState) => {
        this.setState({
        loadingSpinner: navState.loading,
        });
    };    

    onMessage = e => {
        this.setState({
        message: e.nativeEvent.data,//window.postMessage
        })
    };


    render() {

        return (
            <View style={pageStyles.page}>
                <Spinner visible={this.state.loadingSpinner} />

                <StatusBar/>
                <ToolBar {...this.props}
                    gotoBack={this.props.gotoBack}
                />
                <ActionWebView {...this.props} 
                        onNavigationStateChange={this.onNavigationStateChange}
                        onMessage={this.onMessage}/>
            </View>
        )
    }
}

export default DepositItemDetailView
