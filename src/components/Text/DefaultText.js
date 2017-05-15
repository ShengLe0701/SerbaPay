import React, { Component } from 'react'
import { Text } from 'react-native'
import { colors } from '../../styles/global'

const textStyle = {
    fontFamily: 'OpenSans',
    color: colors.color,
}

export class DefaultText extends Component {
    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps)
    }
    render() {
        return (
            <Text ref={component => this._root = component} style={[textStyle, this.props.style]} onPress={this.props.onPress}>
                {this.props.children}
            </Text>
        )
    }
}

