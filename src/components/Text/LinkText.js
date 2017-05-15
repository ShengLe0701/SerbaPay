import React, { Component } from 'react'
import { Text } from 'react-native'
import { colors, styles } from '../../styles/global'

const textStyle = {
    fontFamily: 'OpenSans-Light',
    fontSize: 13,
    textDecorationLine: 'underline',
    color: colors.primary
}

export class LinkText extends Component {
    render() {
        return (
            <Text style={[textStyle, this.props.style]} {...this.props} >
                {this.props.children}
            </Text>
        )
    }
}

