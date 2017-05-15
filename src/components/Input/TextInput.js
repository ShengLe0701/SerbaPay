import React, { Component } from 'react'
import { TextInput as TI, View, StyleSheet } from 'react-native'
import { colors } from '../../styles/global'

const style = StyleSheet.create({
    textStyle: {
        fontFamily: 'OpenSans',
        margin: 0,
        padding: 0,
        height: 40,
    },

    wrapper: {
        backgroundColor: colors.primaryText,
        borderRadius: 8,
        borderStyle: 'solid',
        borderColor: colors.border,
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 3,
    }
})

export class TextInput extends Component {
    focus() {
        this.refs['input'].focus()
    }
    render() {
        return (
            <View style={[style.wrapper, this.props.boxStyle]}>
                <TI
                    ref='input'
                    style={[style.textStyle, this.props.style]}
                    returnKeyType='next'
                    blurOnSubmit={false}
                    underlineColorAndroid={'rgba(0,0,0,0)'}
                    {...this.props}
                />
            </View>
        )
    }
}

