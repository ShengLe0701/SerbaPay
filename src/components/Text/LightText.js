import React, { Component } from 'react'
import { Text } from 'react-native'
import { colors } from '../../styles/global'

const textStyle = {
    fontFamily: 'OpenSans-Light',
    color: colors.color
}

export class LightText extends Component {
    render() {
        return (
            <Text style={[textStyle, this.props.style]}>
                {this.props.children}
            </Text>
        )
    }
}

