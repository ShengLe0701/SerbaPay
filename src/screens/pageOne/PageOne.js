import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { DefaultText, LightText } from '../../components/Text'
import Button from 'react-native-awesome-button'

import { colors, styles } from '../../styles/global'
import APIClient from '../../lib/APIClient'
import { push } from 'react-router-redux'
import { Link } from 'react-router-native'


const pageStyles = StyleSheet.create({
    // areas
    areaMain: {
        flexDirection: 'column',
        flex: 1
    },
    // logo
    areaLogo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        flex: 1,
        paddingTop: 10,
        flexDirection: 'column',
        alignItems: 'center'
    },

    logoText: {
        marginTop: 5,
        fontSize: 24,
    },

    areaButtons: {
        flex: 1,
        flexDirection: 'column'
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttonStyle: {
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 35,
        paddingRight: 35
    },
    buttonText: {
        fontSize: 17,
        fontFamily: 'OpenSans-Light',
        color: colors.primaryText
    },
    loginLink: {
        marginTop: 10,
        fontSize: 13,
        textDecorationLine: 'underline',
        color: colors.primary
    },

    // styles
    textStyle: {
        textAlign: 'center'
    },
    bottomLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 30
    }
})


export class PageOne extends Component {
    render() {
        return (
            <View style={[pageStyles.areaMain]}>
                <View style={pageStyles.areaLogo}>
                    <View style={pageStyles.logo}>
                        <Image source={require('./img/logo.png')}></Image>
                        <LightText style={[pageStyles.textStyle, pageStyles.logoText]}>
                            iwantPay
                        </LightText>
                    </View>
                </View>
                <View style={pageStyles.areaButtons}>
                    <View style={pageStyles.buttonContainer}>
                        <Button
                            labelStyle={pageStyles.buttonText}
                            backgroundStyle={pageStyles.buttonStyle}
                            states={{
                                default: {
                                    text: 'Create an account',
                                    onPress: this.props.gotoRegister,
                                    backgroundColor: colors.primary
                                }
                            }}/>
                        <DefaultText style={pageStyles.loginLink} onPress={this.props.gotoLogin}>
                            Already have an account?
                        </DefaultText>
                    </View>
                    <DefaultText style={[pageStyles.bottomLine, pageStyles.textStyle]} onPress={this.props.gotoTerms} >
                        By Signingup you agree to the <Text style={{textDecorationLine: 'underline'}}> Terms of Service and Privacy Policy</Text>
                    </DefaultText>
                </View>
            </View>
        )
    }
}

export default PageOne
