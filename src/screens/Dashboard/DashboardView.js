import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, Image, TouchableHighlight, Modal, Platform } from 'react-native'
import { DefaultText, LinkText } from '../../components/Text'
import { colors, styles, sizes } from '../../styles/global'
import { Alert } from '../../components/Alert'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Share, {ShareSheet, Button} from 'react-native-share'

//modals
import VerifyPhone from '../VerifyPhone'
import Notifications from './Notifications'
import Calendar from './Calendar'
import QR from './QR'


const pageStyles = StyleSheet.create({
    page: {flex: 1},
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
        justifyContent: 'space-between'
    },
    toolBarButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    toolBarLeft: {
    },
    toolBarRight: {
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
    scanRow: {
        backgroundColor: colors.primaryBg,
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanRowButton: {
        backgroundColor: colors.primaryBg,
        flexDirection: 'column',
        alignItems: 'center'
    },
    scanRowPlayButton: {
        marginLeft: 50
    },
    scanRowButtonText: {
        color: colors.primaryText,
        marginTop: 5,
        fontSize: 18
    },
    buttonArea: {
        paddingTop: 25,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    buttonAreaRow: {
        marginBottom: 28,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    buttonAreaButton: {
        width: 85,
        flexDirection: 'column',
        alignItems: 'center',
    },
    buttonAreaButtonTxt: {
        marginTop: 5,
        fontSize: 12
    }
})

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
            <View style={[pageStyles.toolBarRight, pageStyles.toolBarButtonsContainer]}>
                <ToolBarIcon icon='clock-o' onPress={props.gotoCalendar}
                    style={pageStyles.toolBarClockIcon} />
                <ToolBarIcon icon='bell-o' onPress={props.gotoNotifications} n={2} />
            </View>
        </View>
    )
}

const ScanRow = props => {
    const {showScan, showPlay} = props
    return (
        <View style={pageStyles.scanRow}>
            <TouchableHighlight onPress={showScan}>
                <View style={pageStyles.scanRowButton}>
                    <Image source={require('./img/scan.png')} />
                    <DefaultText style={pageStyles.scanRowButtonText}>
                        Scan
                    </DefaultText>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={pageStyles.scanRowPlayButton} onPress={showPlay}>
                <View style={pageStyles.scanRowButton}>
                    <Image source={require('./img/play.png')} />
                    <DefaultText style={pageStyles.scanRowButtonText}>
                        Play
                    </DefaultText>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const BAButton = props => {
    const { color, text, icon } = props

    return (
        <View style={pageStyles.buttonAreaButton}>
            <FontAwesome name={icon} size={35} color={color} />
            <DefaultText style={[pageStyles.buttonAreaButtonTxt, {color}]} >
                {text}
            </DefaultText>
        </View>
    )
}

const ButtonArea = props => {
    return (
        <View style={pageStyles.buttonArea}>
            <View style={pageStyles.buttonAreaRow}>
                <BAButton icon='hand-lizard-o' color='#ef4036' text='Withdrawal' />
                <BAButton icon='exchange' color='#F89A36' text='Transfer' />
                <BAButton icon='shield' color='#FDB515' text='HIT' />
                <BAButton icon='file-text' color='#67BE61' text='Loan' />
            </View>
            <View style={pageStyles.buttonAreaRow}>
                <BAButton icon='mobile' color='#4274B9' text='Topup' />
                <BAButton icon='television' color='#23A35E' text='TV' />
                <BAButton icon='bolt' color='#984D9E' text='PDAM' />
                <BAButton icon='shield' color='#4274B9' text='PLN' />
            </View>
            <View style={pageStyles.buttonAreaRow}>
                <BAButton icon='internet-explorer' color='#EF4036' text='Internet' />
                <BAButton icon='phone' color='#4274B9' text='Bills' />
                <BAButton icon='bolt' color='#C02135' text='DOKU' />
                <BAButton icon='pie-chart' color='#FDB515' text='Split Bill' />
            </View>
        </View>
    )
}

export class DashboardView extends Component {
    componentDidMount() {
        console.log('dashboard did mount')
    }
    static propTypes = {
        gotoProfile: React.PropTypes.func.isRequired,
        showNotificationsModal: React.PropTypes.func.isRequired,
        showCalendarModal: React.PropTypes.func.isRequired,
        showQRScanModal: React.PropTypes.func.isRequired,
        showQRPlayModal: React.PropTypes.func.isRequired,
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
    render() {


        return (
            <View style={pageStyles.page}>
                <VerifyPhone/>
                <Notifications/>
                <Calendar/>
                <QR/>
                {this.renderAlert()}
                <ToolBar
                    gotoNotifications={this.props.showNotificationsModal}
                    gotoCalendar={this.props.showCalendarModal}
                />
                <ScanRow
                    showScan={this.props.showQRScanModal}
                    showPlay={this.props.showQRPlayModal}
                />
                <ScrollView>
                    <ButtonArea/>
                </ScrollView>
            </View>
        )
    }
}

export default DashboardView
