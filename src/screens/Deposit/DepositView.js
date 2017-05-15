import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, Image, TouchableHighlight, Modal, Platform } from 'react-native'
import { DefaultText, LinkText } from '../../components/Text'
import { colors, styles, sizes } from '../../styles/global'
import { Alert } from '../../components/Alert'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Share, {ShareSheet, Button} from 'react-native-share'

//modals
import VerifyPhone from '../VerifyPhone'
import Notifications from '../Dashboard/Notifications'
import Calendar from '../Dashboard/Calendar'

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
    },
    toolBarRight: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    toolBarIconTouchable: {
        backgroundColor: colors.primaryBg,
        padding: 5
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
        flex:1,
        color:'#FFF',
        fontSize:23,
        fontWeight:'bold',
        textAlign:'center'
    },

    statusBar: {
        backgroundColor: colors.primaryBg,
        height : sizes.iosPaddingAdjust,
        width : sizes.width,
    },



    depositView:{
//      flex:1,
        width: sizes.width,
        height: DepositBodyHeight,
    },
    groupItem:{
        flex:1,
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderColor:'#a9a9a9',
        height:DepositBodyHeight/4,
    },
    groupItem1:{
        flex:1,
        marginLeft: DepositBodyWidth/20,
        marginRight: DepositBodyWidth/20,
    },
    
    groupItem_row1:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    groupItem_row2:{
        flex:3,
        flexDirection: 'row',
        alignItems:'center'
    },
    groupItem_row3:{
        flex:3,
        flexDirection: 'row',
    },

    GroupItemText1 :{
        color: 'rgb(0, 0, 0)',
        fontSize: 19,
        textAlign:'center',
    },
    GroupItemText2 :{
        color: 'rgb(0, 0, 0)',
        fontSize: 15,
        textAlign:'center',
    },

    channelItem: {
        width: DepositBodyWidth / 2.5,
        paddingRight : DepositBodyWidth / 20,
    },
    channelItem1: {
        flex:1,
    },
    channelItem2: {
        flex:4,
        borderWidth : 1,
        borderRadius : 15,
        borderColor:'#a9a9a9',
        alignItems:'center',
        justifyContent:'center',
    },
    channelItem3: {
        flex:1,
    },
    
    channelItemImage: {
        width: DepositBodyWidth / 4,
        height: DepositBodyHeight / 15,
        resizeMode :'contain',
    },
    channelItemText: {
        fontSize: 14,
    },    
    channelItemText1: {
        fontSize: 10,
    },  

    GroupItemScrollView: {
        flex:3,
        flexDirection : 'row',
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
    let shareOptions = {
        title: "React Native",
        message: "React Native!",
        url: "http://facebook.github.io/react-native/",
        subject: "Share My App",
    }
    return (
        <View style={pageStyles.toolBar}>
            <View style={[pageStyles.toolBarLeft, pageStyles.toolBarButtonsContainer]}>
                <ToolBarIcon icon='gift' onPress={()=>{Share.open(shareOptions)}} />
            </View>
            <DefaultText style={pageStyles.toolBarTitle}>
                Deposit
            </DefaultText>
            <View style={[pageStyles.toolBarRight, pageStyles.toolBarButtonsContainer]}>
                <View/>
                <View style={{flexDirection:'row'}}>
                    <ToolBarIcon icon='clock-o' onPress={props.gotoCalendar}
                        style={pageStyles.toolBarClockIcon} />
                    <ToolBarIcon icon='bell-o' onPress={props.gotoNotifications} n={2} />
                </View>
            </View>
        </View>
    )
}

const DepositChannelListView = props => {
    const {depositchannellist} = props;

    let returnValue =[];

    if( depositchannellist )
    {
        var groupKeys = Object.keys(depositchannellist);
        for( i = 0 ; i < groupKeys.length ; i ++ )
        {
            returnValue.push(
                <GroupItem {...props} key={'groupItem' + i} groupName={groupKeys[i]}/>
            );        
        }
    }

    return (
        <ScrollView>
            {returnValue}
        </ScrollView>
    )
}

const GroupItem = props => {
    const {depositchannellist, onGotoDepositGroupDetail, groupName} = props

    let returnValue =[];

    for( i = 0 ; i < depositchannellist[groupName].length ; i ++ )
    {
        returnValue.push(
            <ChannelItem {...props} key={'channelItem' + i} itemIndex={i} data={depositchannellist[groupName][i]}/>
        );        
    }

    return ( 
        <View style={pageStyles.groupItem}>
            <View style={pageStyles.groupItem1}>
                <View style={pageStyles.groupItem_row1} >
                    <DefaultText style={pageStyles.GroupItemText1}>
                        {groupName} 
                    </DefaultText>
                    <TouchableHighlight underlayColor={'transparent'} onPress={()=> onGotoDepositGroupDetail(groupName)}>
                        <DefaultText style={pageStyles.GroupItemText2}>
                            See All >
                        </DefaultText>
                    </TouchableHighlight>               
                </View>
                <ScrollView style={pageStyles.GroupItemScrollView}>
                    <View style={pageStyles.groupItem_row2}>
                        {returnValue}
                    </View>
                </ScrollView>
            </View>
        </View> 
    )
}


const ChannelItem = props => {
    const {data, onGotoDepositItemDetail,groupName, itemIndex} = props
    return (
        <TouchableHighlight style={pageStyles.channelItem} underlayColor={'transparent'} onPress={()=> onGotoDepositItemDetail(groupName, itemIndex)}>
            <View style={pageStyles.channelItem1}>
                <View style={{flex:1}} />
                <View style={pageStyles.channelItem2}>
                    <Image source={{uri:data.image_url}} style={pageStyles.channelItemImage} />
                </View>
                <View style={{flex:0.3}} />
                <View style={pageStyles.channelItem3}>
                    <DefaultText style={data.name.length < 20 ? pageStyles.channelItemText : pageStyles.channelItemText1}>
                        {data.name}
                    </DefaultText>
                </View>
                <View style={{flex:1}} />
            </View>
        </TouchableHighlight>
    )
}



export class DepositView extends Component {

    static propTypes = {
        gotoProfile: React.PropTypes.func.isRequired,

        showNotificationsModal: React.PropTypes.func.isRequired,
        showCalendarModal: React.PropTypes.func.isRequired,
        
        getDepositChannelList: React.PropTypes.func.isRequired,
        setDepositGroupName : React.PropTypes.func.isRequired,
        setDepositItemIndex : React.PropTypes.func.isRequired,

        gotoDepositGroupDetail: React.PropTypes.func.isRequired,
        gotoDepositItemDetail: React.PropTypes.func.isRequired,

    }

    componentDidMount() {
        console.log('Deposit did mount')
        this.props.getDepositChannelList();

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

    onGotoDepositGroupDetail(groupName) {
        this.props.setDepositGroupName(groupName);
        this.props.gotoDepositGroupDetail();
    }

    onGotoDepositItemDetail(groupName, itemIndex) {
        this.props.setDepositGroupName(groupName)
        this.props.setDepositItemIndex(itemIndex)
        this.props.gotoDepositItemDetail()
    }

    
    render() {

        return (
            <View style={pageStyles.page}>
                <StatusBar/>
                {this.renderAlert()}
                <ToolBar
                    gotoNotifications={this.props.showNotificationsModal}
                    gotoCalendar={this.props.showCalendarModal}
                />
                <DepositChannelListView onGotoDepositGroupDetail={this.onGotoDepositGroupDetail.bind(this)} 
                                        onGotoDepositItemDetail = {this.onGotoDepositItemDetail.bind(this)}  {...this.props}/>
            </View>
        )
    }
}

export default DepositView
