import React, { Component } from 'react'
import {
    InputRow as PanzaInputRow
} from 'panza'

const inputStyle = {
    textAlign: 'right',
    paddingRight: 13
}

const InputRow = ({style, ...other}) => (
    <PanzaInputRow {...other} style={[inputStyle, style]}/>
)

export default InputRow
