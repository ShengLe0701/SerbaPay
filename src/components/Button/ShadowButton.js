import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../styles/global'
import AwesomeButton from 'react-native-awesome-button'

const style = StyleSheet.create({
    buttonStyle: {
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 35,
        paddingRight: 35,

        // android
        elevation: 8,

        // ios
        shadowColor: "#222",
        shadowOpacity: 0.8,
        shadowRadius: 4,
        shadowOffset: {
            height: 4,
            width: 4
        }
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'OpenSans',
        color: colors.primaryText
    },
})

export class ShadowButton extends Component {
    render() {
        return (
            <AwesomeButton
                labelStyle={style.buttonText}
                backgroundStyle={[style.buttonStyle, this.props.style]}
                {...this.props}
            />
        )
    }
}

