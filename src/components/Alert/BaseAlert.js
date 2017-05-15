import React, { Component } from 'react'
import { DefaultText } from '../Text'
import {View, StyleSheet, TouchableHighlight, Platform} from 'react-native'
import {colors, sizes, styles } from '../../styles/global'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export class BaseAlert extends Component {
    static defaultProps = {
        style: {},
        onPress: nope => nope
    }
    render() {
        const {style, onPress, ...props} = this.props
        return (
            <TouchableHighlight onPress={onPress} style={[alertStyles.baseStyle, style]}>
                <View {...props} style={alertStyles.alert}>
                    <FontAwesome name='exclamation-triangle' size={16} color={'white'} style={alertStyles.alertIcon}/>
                    <DefaultText style={alertStyles.alertTxt}>
                        {props.children}
                    </DefaultText>
                </View>
            </TouchableHighlight>
        )
    }
}

const alertStyles = StyleSheet.create({
    baseStyle: {
        backgroundColor: colors.warning,
        height: sizes.alertHeight,
    },
    alert: {
        backgroundColor: colors.warning,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    alertTxt: {
        color: colors.warningTxt
    },
    alertIcon: {
        marginRight: 8
    }
})

export default BaseAlert
