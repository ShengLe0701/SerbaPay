import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../../styles/global'
import AwesomeButton from 'react-native-awesome-button'

const style = StyleSheet.create({
    buttonStyle: {
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 35,
        paddingRight: 35
    },
    buttonText: {
        fontSize: 17,
        fontFamily: 'OpenSans-Light',
        color: colors.primaryText
    },
})

export class Button extends Component {
    render() {
        return (
            <AwesomeButton
                labelStyle={style.buttonText}
                backgroundStyle={style.buttonStyle}
                {...this.props}
            />
        )
    }
}

