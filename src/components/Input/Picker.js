import {Picker as P, Platform, StyleSheet} from 'react-native'
import React, { Component } from 'react'

const elStyle = StyleSheet.create({
    picker: {width: Platform.OS === 'ios' ? 250 : undefined}
})

export class Picker extends Component {
    render() {
        const {style, children, ...props} = this.props
        return (
            <P {...props} style={[style, elStyle.picker]}>
                {children}
            </P>
        )
    }
}

export default Picker
