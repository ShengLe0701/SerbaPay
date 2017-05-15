import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Modal, Timers, ActivityIndicator } from 'react-native'
import { DefaultText, LightText } from '../../components/Text'
import { TextInput } from '../../components/Input'
import { CancelDoneHeader } from '../../components/Headers'
import TimerMixin from 'react-timer-mixin'
import reactMixin from 'react-mixin'

import { colors, styles, textStyles } from '../../styles/global'

const pageStyles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
    },

    text: {
        textAlign: 'center'
    },

    subtitle: {
        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    inputsWrapper: {
        marginTop: 50,
        marginBottom: 50,
        flexDirection: 'column',
        alignItems: 'center'
    },
    inputs: {
        flexDirection: 'row',
        height: 50,
        width: 300
    },
    input: {
        flex: 1,
        marginRight: 10,
    },
    lastInput: {
        flex: 1
    }
})


export default class VerifyPhone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showLink: false,
        }

        // bindings
        this.focusNextField = this.focusNextField.bind(this)
        this.onModalShown = this.onModalShown.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.submit = this.submit.bind(this)
        this.startTimer = this.startTimer.bind(this)
        this.getAgain = this.getAgain.bind(this)

        this.handle1 = this.handleChange.bind(this, 1)
        this.handle2 = this.handleChange.bind(this, 2)
        this.handle3 = this.handleChange.bind(this, 3)
        this.handle4 = this.handleChange.bind(this, 4)
        this.handle5 = this.handleChange.bind(this, 5)
        this.handle6 = this.handleChange.bind(this, 6)
    }
    handleChange(id, value) {
        let code = [...this.props.code]
        code[id-1] = parseInt(value) ? value : ' '
        this.props.editCode(code)
        if (value){
            this.focusNextField(`i${id+1}`)
        } else {
            this.focusNextField(`i${id-1}`)
        }
    }

    focusNextField (nextField) {
        this.refs[nextField] &&
        this.refs[nextField].focus()
    }
    onModalShown(){
        this.startTimer()
    }
    getAgain(){
        this.setState({showLink: false})
        this.startTimer()
        this.props.getOtp()
    }
    startTimer(){
        this.setTimeout(()=>this.setState({showLink: true}), 60000)
    }
    closeModal(){
        this.props.closeModal()
    }
    submit(codigo) {
        this.props.submit(codigo)
    }
    static propTypes = {
        visible: React.PropTypes.bool.isRequired,
        user: React.PropTypes.object.isRequired,
        submit: React.PropTypes.func.isRequired,
        submitting: React.PropTypes.bool.isRequired,
        gettingOtp: React.PropTypes.bool.isRequired,
        getOtp: React.PropTypes.func.isRequired,
        editCode: React.PropTypes.func.isRequired,
        code: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    }
    render() {
        const inputProps = {
            keyboardType: 'numeric',
            maxLength: 1,
            onSubmitEditting: 'numeric',
            selectTextOnFocus: true,
            boxStyle: pageStyles.input,
        }

        return (
            <Modal visible={this.props.visible} onRequestClose={this.props.closeModal} onShow={this.onModalShown}>
                <View style={pageStyles.page}>
                    <CancelDoneHeader
                        onDonePress={this.props.closeModal}
                        hideCancel doneText='close' title='Verify Mobile' />
                    <DefaultText style={[pageStyles.subtitle, pageStyles.text]}>
                        Please enter your verification code that was sent to {this.props.user.phone}
                    </DefaultText>
                    <View style={pageStyles.inputsWrapper}>
                        {this.props.submitting ? (
                            <ActivityIndicator size='large'/>
                        )
                        : (
                            <View style={pageStyles.inputs}>
                               <TextInput ref='i1' value={this.props.code[0]} onChangeText={this.handle1} {...inputProps} />
                                <TextInput ref='i2' value={this.props.code[1]} onChangeText={this.handle2} {...inputProps} />
                                <TextInput ref='i3' value={this.props.code[2]} onChangeText={this.handle3} {...inputProps} />
                                <TextInput ref='i4' value={this.props.code[3]} onChangeText={this.handle4} {...inputProps} />
                                <TextInput ref='i5' value={this.props.code[4]} onChangeText={this.handle5} {...inputProps} />
                                <TextInput ref='i6' value={this.props.code[5]}
                                    {...inputProps}
                                    boxStyle={pageStyles.lastInput}
                                    onChangeText={this.handle6} returnKeyType='done' />
                            </View>
                        ) }
                    </View>
                    {this.state.showLink &&
                        <DefaultText style={[textStyles.link, pageStyles.text]} onPress={this.getAgain}>
                            DIDN’T RECEIVE ANYTHING?
                        </DefaultText>
                    }
                    {
                        this.props.gettingOtp &&
                        <ActivityIndicator />
                    }
                </View>
            </Modal>
        )
    }
}


reactMixin(VerifyPhone.prototype, TimerMixin)
