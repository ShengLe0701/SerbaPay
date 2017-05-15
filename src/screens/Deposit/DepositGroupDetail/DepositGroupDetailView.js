import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, Image, TouchableHighlight, Modal, Platform } from 'react-native'
import { DefaultText, LinkText } from '../../../components/Text'
import { colors, styles, sizes } from '../../../styles/global'
import { Alert } from '../../../components/Alert'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Share, {ShareSheet, Button} from 'react-native-share'

//modals
import VerifyPhone from '../../VerifyPhone'
import Notifications from '../../Dashboard/Notifications'
import Calendar from '../../Dashboard/Calendar'

var DepositBodyHeight = sizes.height - sizes.iosPaddingAdjust - sizes.headerHeight - sizes.tabsHeight;
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


    channelItem: {
        height:DepositBodyHeight/5,
        borderBottomWidth: 1,
        borderColor:'#a9a9a9',
    },
    channelItem1: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    channelItem2: {
        flex:2,
        height:DepositBodyHeight/7,
        borderWidth : 1,
        borderRadius : 15,
        borderColor:'#a9a9a9',
        alignItems:'center',
        justifyContent:'center',
    },
    channelItem3: {
        flex:3,
    },
    channelItem4: {
        flexDirection:'row',
        paddingTop:5,
    },
    
    channelItemImage: {
        width: DepositBodyWidth / 4,
        height: DepositBodyHeight / 15,
        resizeMode :'contain',
    },
    channelItemText: {
        fontSize: 17,
    },    
    channelItemText1: {
        fontSize: 15,
    },    
    channelItemText3: {
        fontSize: 15,
        color:'#a9a9a9',        
    },    
    channelItemText4: {
        fontSize: 15,
        color:'#32cd32',
    },    
    channelItemText5: {
        fontSize: 15,
        color:'#ff4500',
    },    
    
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
            <DefaultText style={ props.depositgroupname && props.depositgroupname.length < 12 ? pageStyles.toolBarTitle : pageStyles.toolBarTitle1 }>
                {props.depositgroupname}
            </DefaultText>
            <View style={[pageStyles.toolBarRight, pageStyles.toolBarButtonsContainer]}>
            </View>
        </View>
    )
}

const DepositItemListView = props => {
    const {depositchannellist, onGotoDepositGroupDetail, depositgroupname} = props

    let returnValue =[];

    for( var i = 0 ; i < depositchannellist[depositgroupname].length ; i ++ )
    {
        returnValue.push(
            <ChannelItem {...props} key={'channelItem' + i} itemIndex={i} data={depositchannellist[depositgroupname][i]}/>
        );        
    }

    return ( 
        <ScrollView>
            {returnValue}
        </ScrollView>
    )
}


const ChannelItem = props => {
    const {data, itemIndex, onGotoDepositItemDetail} = props
    return (
        <TouchableHighlight style={pageStyles.channelItem} underlayColor={'transparent'} onPress={()=> onGotoDepositItemDetail(itemIndex)}>
            <View style={pageStyles.channelItem1}>
                <View style={{flex:0.3}} />
                <View style={pageStyles.channelItem2}>
                    <Image source={{uri:data.image_url}} style={pageStyles.channelItemImage} />
                </View>
                <View style={{flex:0.3}} />
                <View style={pageStyles.channelItem3}>
                    <DefaultText style={ data.name.length < 20 ? pageStyles.channelItemText : pageStyles.channelItemText1}>
                        {data.name}
                    </DefaultText>
                    <View style={pageStyles.channelItem4}>
                        <DefaultText style={pageStyles.channelItemText3}>
                            Current Status : 
                        </DefaultText>
                        <DefaultText style={ data.is_live == '1' ? pageStyles.channelItemText4 : pageStyles.channelItemText5}>
                            {data.is_live == '1' ? ' Active' : ' Maintaining'}
                        </DefaultText>
                    </View>
                </View>
                <View style={{flex:0.3}} />
            </View>
        </TouchableHighlight>
    )
}



export class DepositGroupDetailView extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log('Deposit did mount')
    }
    
    static propTypes = {
        gotoBack: React.PropTypes.func.isRequired,

        gotoDepositItemDetail: React.PropTypes.func.isRequired,
        setDepositItemIndex: React.PropTypes.func.isRequired,        
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

    onGotoDepositItemDetail(index) {
        this.props.setDepositItemIndex(index)
        this.props.gotoDepositItemDetail()
    }

    
    render() {

        return (
            <View style={pageStyles.page}>
                <StatusBar/>
                <ToolBar {...this.props}
                    gotoBack={this.props.gotoBack}
                />            
                <DepositItemListView onGotoDepositItemDetail = {this.onGotoDepositItemDetail.bind(this)}  {...this.props}/>

            </View>
        )
    }
}

export default DepositGroupDetailView
