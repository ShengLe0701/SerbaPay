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
        padding: 30,
        backgroundColor: colors.primaryBg
    },
    title: {
        fontSize: 18,
        marginTop: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.primaryText,
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 0,
        marginBottom: 40,
        color: colors.primaryText,

    },

    buttonWrapper: {
        marginTop: 20,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
    },
})


export class ResetPassword extends Component {
    constructor(props) {
        super(props)
        // state
        this.state = {
            email: '',
            password: ''
        }
        // bindings
        this.focusNextField.bind(this)
        this.submit.bind(this)
    }
    focusNextField (nextField) {
        this.refs[nextField].focus()
    }
    componentDidMount() {
        //this.refs.emailField.focus()
    }
    submit(){
        let data = {
            email: this.state.email
        }
        this.props.submit(data)
    }
    render() {
        return (
            <View style={pageStyles.page}>
                <DefaultText style={ pageStyles.title }>
                    Reset Password
                </DefaultText>
                <DefaultText style={ pageStyles.subtitle }>
                    Enter your registered e-mail
                </DefaultText>
                <TextInput
                    ref='emailField'
                    placeholder='E-mail'
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
                    returnKeyType='done'
                    keyboardType='email-address'
                    onSubmitEditing={() => this.submit()}
                    blurOnSubmit={true}

                />
                <View style={ pageStyles.buttonWrapper }>
                    <ShadowButton
                        states={{
                            default: {
                                text: 'Reset',
                                onPress: () => this.submit(),
                                backgroundColor: colors.primary,
                            },
                            loading: {
                                text: 'Reset',
                                spinner: true,
                                backgroundColor: colors.primary,
                            }
                        }}
                        buttonState={this.props.loading ? 'loading' : 'default'}
                        />
                </View>
            </View>
        )
    }
}

ResetPassword.propTypes = {
    submit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired
}
export default ResetPassword
