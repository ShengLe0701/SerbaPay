import React, { Component } from 'react'
import { View, ScrollView, ListView, Modal, StyleSheet } from 'react-native'
import { DefaultText, LightText, SemiBoldText } from '../../../components/Text'
import { CancelDoneHeader } from '../../../components/Headers'
import { colors } from '../../../styles/global'
import moment from 'moment'

const pageStyles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    notif: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        paddingRight: 85,
        paddingLeft: 25,
        paddingTop: 15,
        paddingBottom: 15,
    },
    notifTitle: {
        fontSize: 14,
        marginBottom: 5,
    },
    notifText: {
        marginBottom: 11,
        fontSize: 12,
    },
    notifDate: {
        fontSize: 11,
        color: colors.inactive
    },
    notifNew: {
        position: 'absolute',
        top: 15,
        right: 25,
        borderRadius: 7,
        backgroundColor: colors.danger,
        padding: 3,
        paddingRight: 10,
        paddingLeft: 10,
    },
    notiNewText: {
        color: colors.primaryText,
        fontSize: 12,
        fontWeight: 'bold'
    }
})

const Notification = props => {
    const {title, text, isNew, date, id} = props
    return (
        <View style={pageStyles.notif} key={id}>
            {
                isNew &&
                <View style={pageStyles.notifNew}>
                    <DefaultText style={pageStyles.notiNewText}>NEW</DefaultText>
                </View>
            }
            <SemiBoldText style={pageStyles.notifTitle}>
                {title}
            </SemiBoldText>
            <LightText style={pageStyles.notifText}>
                {text}
            </LightText>
            <DefaultText style={pageStyles.notifDate}>
                {moment(date).format("MMMM Do, h:mm:ss a")}
            </DefaultText>
        </View>
    )
}

export class Notifications extends Component {
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                {id: 1, title: 'Login password updated', isNew: true, text: 'Please inform our customer service if you didnot perform this action', date: new Date()},
                {id: 2, title: 'Login password updated', isNew: true, text: 'Please inform our customer service if you didnot perform this action', date: new Date()},
                {id: 3, title: 'Login password updated', isNew: false, text: 'Please inform our customer service if you didnot perform this action', date: new Date()},
                {id: 4, title: 'Login password updated', isNew: false, text: 'Please inform our customer service if you didnot perform this action', date: new Date()},
                {id: 5, title: 'Login password updated', isNew: false, text: 'Please inform our customer service if you didnot perform this action', date: new Date()},
                {id: 6, title: 'Login password updated', isNew: false, text: 'Please inform our customer service if you didnot perform this action', date: new Date()},
                {id: 7, title: 'Login password updated', isNew: false, text: 'Please inform our customer service if you didnot perform this action', date: new Date()},
                {id: 8, title: 'Login password updated', isNew: false, text: 'Please inform our customer service if you didnot perform this action', date: new Date()},
            ])
        }
    }

    static propTypes = {
        closeModal: React.PropTypes.func.isRequired,
        visible: React.PropTypes.bool.isRequired,
    }

    render() {
        return (
            <Modal visible={this.props.visible} onRequestClose={this.props.closeModal} >
                <CancelDoneHeader
                    onDonePress={this.props.closeModal}
                    hideCancel doneText='close' title='Notification' />
                <ListView
                    style={pageStyles.mainContainer}
                    dataSource={this.state.dataSource}
                    renderRow={Notification} />
            </Modal>
        )
    }
}

export default Notifications
