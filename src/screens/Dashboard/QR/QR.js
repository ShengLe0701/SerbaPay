import {connect} from 'react-redux'
import {actions} from './reducer'
import React, { Component } from 'react'
import { View, TouchableHighlight, StyleSheet, Modal, ScrollView } from 'react-native'
import { DefaultText, LightText, SemiBoldText } from '../../../components/Text'
import { BaseHeader } from '../../../components/Headers'
import { colors } from '../../../styles/global'
import QRScan from './QRScan'
import QRPlay from './QRPlay'

const pageStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        margin: 20,
    },
    menu: {
        height: 100,
        borderTopColor: colors.disabled,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        fontSize: 20,
    }
})



export class QR extends Component {
    static propTypes = {
        closeModal: React.PropTypes.func.isRequired,
        visible: React.PropTypes.bool.isRequired,
        activeTab: React.PropTypes.string.isRequired,
        showScan: React.PropTypes.func.isRequired,
        showPlay: React.PropTypes.func.isRequired,
    }

    render() {
        const {activeTab, visible, closeModal, showScan, showPlay} = this.props
        return (
            <Modal visible={this.props.visible} onRequestClose={this.props.closeModal} >
                <BaseHeader
                    onBackPress={this.props.closeModal}
                    title='' />
                <ScrollView style={pageStyles.mainContainer}>
                    {activeTab === 'scan' ? (
                        <QRScan/>
                    ): (
                        <QRPlay/>
                    )}
                </ScrollView>
                <View style={pageStyles.menu}>
                    <DefaultText onPress={showPlay} style={pageStyles.button}>Play</DefaultText>
                    <DefaultText onPress={showScan} style={pageStyles.button}>Scan</DefaultText>
                </View>
            </Modal>
        )
    }
}

export default QR
