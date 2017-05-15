import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { DefaultText, LightText } from '../../components/Text'
import { TextInput } from '../../components/Input'
import { ShadowButton } from '../../components/Button'

import { colors, styles, textStyles } from '../../styles/global'

const pageStyles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 5,
    },
    content: {
        marginTop: 20,
    }
})


export default class Terms extends Component {
    constructor(props) {
        super(props)
        // state
        this.state = {
            email: '',
            password: ''
        }
        // bindings
        this.focusNextField.bind(this)
    }
    focusNextField (nextField) {
        this.refs[nextField].focus()
    }

    render() {
        return (
            <ScrollView style={pageStyles.page}>
                <DefaultText style={pageStyles.content}>

Generate again
Select All
Tristique ut, integer, pid pulvinar sagittis eros et, mattis integer lorem massa, in massa pellentesque. Sit, hac parturient, pellentesque tempor mus purus in cursus, ac eros mus massa mattis aenean rhoncus velit, tortor in vut. In? Mid pellentesque porttitor scelerisque pulvinar a! Phasellus magna, in adipiscing odio in. Massa magna eu penatibus duis vel elit aenean! Ut augue facilisis lacus mus et pulvinar, pulvinar velit etiam cum, enim pulvinar? Dolor rhoncus a, sit enim aliquet? Porta in tortor? Vel cursus. Porttitor dignissim ridiculus dapibus mauris turpis sagittis magna, aliquam? Elementum nec hac nunc duis lacus cursus, cursus nisi rhoncus nisi. Eros sed, ac purus integer, auctor risus dis, massa integer lectus. In ultricies auctor porttitor! Vel augue ridiculus elementum velit.

Vel in nec augue mauris cras etiam duis mid nunc cras a rhoncus porta mid? Magnis pulvinar, non a, duis. Sociis magna turpis! Lacus sit, tristique nisi in cras! Porta in velit, elementum, ac integer ultricies placerat. Purus enim? Et vut, turpis elit egestas! Aliquam mauris turpis? Integer enim? Amet velit, mattis cursus eu adipiscing. Sagittis turpis tristique nisi. Rhoncus natoque? Elit? Nascetur dolor dolor turpis tortor, a. Elementum nec, parturient, ridiculus urna, proin placerat placerat vut cras aenean et egestas scelerisque eros integer nascetur odio in dictumst quis, velit turpis arcu diam urna, turpis auctor et nunc, elementum aenean rhoncus ridiculus porttitor tortor dignissim a ac cursus, sociis! Cursus eu, lundium sed auctor? Nascetur urna, magna odio turpis.
                </DefaultText>
            </ScrollView>
        )
    }
}
