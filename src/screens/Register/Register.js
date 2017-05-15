import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, Image, Platform } from 'react-native'
import { DefaultText, LightText } from '../../components/Text'
import { TextInput } from '../../components/Input'
import { ShadowButton } from '../../components/Button'

import { colors, styles } from '../../styles/global'

import DeviceInfo from 'react-native-device-info'

const pageStyles = StyleSheet.create({
    page: {
        backgroundColor: colors.primaryBg,
        flex: 1,
        flexDirection: 'column',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginTop: 80,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.primaryText
    },
    subtitle: {
        textAlign: 'center',
        color: colors.primaryText
    },
    form: {
        marginTop: 50,
        backgroundColor: colors.primaryBg
    },
    input: {
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 0,
    },
    inputTop: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    inputBottom: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    button: {
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
    }
})

export class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: ''
        }
        this.focusNextField.bind(this)
        this.submit.bind(this)
    }
    focusNextField (nextField) {
        this.refs[nextField].focus()
    }
    submit(){
        const state = this.state
        let data = {
            full_name: state.name,
            email: state.email,
            phone: state.phone,
            password: state.password
        }

        // TODO: mover codigo de dispositivo a reducer
        data.device = DeviceInfo.getBrand() + ' ' + DeviceInfo.getModel()
        data.device_id = DeviceInfo.getUniqueID()
        data.client_id = 'dummy'
        data.platform = Platform.OS

        this.props.submit(data)
    }
    render() {
        return (
            <ScrollView style={pageStyles.page}>
                <DefaultText style={pageStyles.title}>
                    Create your account
                </DefaultText>
                <LightText style={pageStyles.subtitle}>
                    some text here
                </LightText>
                <View style={pageStyles.form}>
                    <TextInput
                        ref='nameInput'
                        boxStyle={[pageStyles.input, pageStyles.inputTop]}
                        onChangeText={name => this.setState({name})}
                        value={this.state.name}
                        placeholder='Full name'
                        onSubmitEditing={() => this.focusNextField('emailInput')}
                    />
                    <TextInput
                        ref='emailInput'
                        boxStyle={pageStyles.input}
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        placeholder='Email'
                        keyboardType='email-address'
                        onSubmitEditing={() => this.focusNextField('phoneInput')}
                    />
                    <TextInput
                        ref='phoneInput'
                        boxStyle={pageStyles.input}
                        onChangeText={phone => this.setState({phone})}
                        value={this.state.phone}
                        placeholder='Phone Number'
                        onSubmitEditing={() => this.focusNextField('passwordInput')}
                        keyboardType='numeric'
                    />
                    <TextInput
                        ref={'passwordInput'}
                        boxStyle={[pageStyles.input, pageStyles.inputBottom]}
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                        placeholder='Password'
                        returnKeyType='done'
                        onSubmitEditing={() => this.submit()}
                        blurOnSubmit={true}
                        secureTextEntry
                    />
                    <ShadowButton
                        style={pageStyles.button}
                        states={{
                            default: {
                                text: 'Sign Up',
                                onPress: () => this.submit(),
                                backgroundColor: colors.primary
                            },
                            loading: {
                                text: 'Creating Account',
                                backgroundColor: colors.primary,
                                spinner: true
                            }
                        }}
                        buttonState={this.props.loading ? 'loading' : 'default'}
                    />
                </View>
            </ScrollView>
        )
    }
}


Register.propTypes = {
    submit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired
}
