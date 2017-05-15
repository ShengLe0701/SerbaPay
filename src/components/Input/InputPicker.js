import React, { Component } from 'react'
import {
    InputPicker as IP
} from 'panza'

export class InputPicker extends Component {
    render() {
        const elStyle = {paddingRight: 10}
        const {style, children, ...props} = this.props
        return (
            <IP {...props} style={[style, elStyle]}>
                {children}
            </IP>
        )
    }
}

export default InputPicker
