import React, { Component } from 'react'
import { Text } from 'react-native'
import { colors } from '../../styles/global'

const textStyle = {
    fontFamily: 'OpenSans-Semibold',
    color: colors.color
}

export class SemiBoldText extends Component {
    render() {
        return (
            <Text style={[textStyle, this.props.style]}>
                {this.props.children}
            </Text>
        )
    }
}

export default SemiBoldText
