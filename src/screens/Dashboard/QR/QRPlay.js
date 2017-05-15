import {connect} from 'react-redux'
import {actions} from './reducer'
import React, { Component } from 'react'
import { View, TouchableHighlight, StyleSheet, Modal } from 'react-native'
import { DefaultText, LightText, SemiBoldText } from '../../../components/Text'
import { BaseHeader } from '../../../components/Headers'

export class QRPlay extends Component {
    render() {
        return (
            <View>
                <DefaultText>
                    PLAY
                </DefaultText>
            </View>
        )
    }
}

export default QRPlay
