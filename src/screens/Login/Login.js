import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { DefaultText, LightText } from '../../components/Text'
import { TextInput } from '../../components/Input'
import { ShadowButton } from '../../components/Button'

import { colors, styles, textStyles } from '../../styles/global'

const pageStyles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
        padding: 30,
        backgroundColor: colors.primaryBg,
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
        color: colors.primaryText,
        marginBottom: 40,
    },
    form: {
        backgroundColor: colors.primaryBg
    },
    button: {
        marginTop: 16,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 25,
    },
    input: {
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#9b9b9b',
    },
    inputEmail: {

        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    inputPassword: {
        borderTopWidth: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    },
    link: {
        color: colors.primaryText,
        textAlign: 'center'
    }
})


export class Login extends Component {
    constructor(props) {
        super(props)
        // state
        this.state = {
            //Tan
            // email: '',
            // password: ''
            
            email: 'rex@serbapay.com',
            password: '123qweasd'
            ////
        }
        // bindings
        this.focusNextField.bind(this)
        this.submit.bind(this)
    }
    focusNextField (nextField) {
        this.refs[nextField].focus()
    }

    submit(){
        let data = {
            username: this.state.email,
            password: this.state.password
        }
        this.props.submit(data)
    }
    render() {
        return (
            <View style={pageStyles.page}>
                <DefaultText style={pageStyles.title}>
                    Welcome Back
                </DefaultText>
                <LightText style={pageStyles.subtitle}>
                    Login to your account to start
                </LightText>
                <View style={pageStyles.form}>
                    <TextInput
                        ref='emailField'
                        boxStyle={[pageStyles.input, pageStyles.inputEmail]}
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        placeholder='Email or Phone Number'
                        keyboardType='email-address'
                        onSubmitEditing={() => this.focusNextField('passwordInput')}
                    />
                    <TextInput
                        ref={'passwordInput'}
                        boxStyle={[pageStyles.input, pageStyles.inputPassword]}
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                        placeholder='Password'
                        returnKeyType='done'
                        blurOnSubmit={true}
                        onSubmitEditing={() => this.submit()}
                        secureTextEntry
                    />
                    <ShadowButton
                        style={pageStyles.button}
                        states={{
                            default: {
                                text: 'Sign In',
                                onPress: () => this.submit(),
                                backgroundColor: colors.primary
                            },
                            loading: {
                                text: 'Logging in...',
                                backgroundColor: colors.primary,
                                spinner: true
                            }
                        }}
                        buttonState={this.props.loading ? 'loading' : 'default'}
                        />
                    <DefaultText style={[textStyles.link, pageStyles.link]} onPress={this.props.gotoRecover}>
                        Forgot your password?
                    </DefaultText>
                </View>
            </View>
        )
    }
}


Login.propTypes = {
    submit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    gotoRecover: React.PropTypes.func.isRequired
}

export default Login
