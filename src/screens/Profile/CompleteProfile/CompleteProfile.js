import React, { Component } from 'react'
import { Modal, Text, TouchableHighlight, View, ScrollView, StyleSheet, Alert, Picker } from 'react-native'
import {CancelDoneHeader} from '../../../components/Headers'
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator'
import { styles, colors } from '../../../styles/global'
import { required } from '../../../lib/utils/validators'
import {
    InputRow,
    TouchableInput,
    InputGroup,
    InputHelpText,
    InputPicker
} from 'panza'

export class CompleteProfile extends Component {
    static propTypes = {
        showCompleteModal: React.PropTypes.bool.isRequired,
        fnShowCompleteModal: React.PropTypes.func.isRequired,
        getQuestions: React.PropTypes.func.isRequired,
        questions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        showPin: React.PropTypes.bool.isRequired,
        showQuestion: React.PropTypes.bool.isRequired,
        submit: React.PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props)
        //binds
        this.closeModal = this.closeModal.bind(this)
        this.done = this.done.bind(this)
        //state
        this.state = {
            form: {
                pin: '',
                rpin: '',
                question: '',
                answer: ''
            },
            focusPicker: false,
            formData: {}
        }

        Object.keys(this.state.form).forEach((key, index) => {
            this[`handle${key}`] = this.handleEdit.bind(this, key)
        })
    }
    closeModal(){
        this.props.fnShowCompleteModal(false)
    }
    done(){
        const { pin, rpin, question, answer } = this.state.form
        // frontend validation
        if (
            this.props.showPin && (pin !== rpin)
        ) {
            Alert.alert(
                'ERROR',
                'PIN fields are not equal',
                [
                    {text: 'OK'},
                ],
            )
        } else {
            let data = {}
            if (this.props.showPin){
                data.pin_number = pin
            }

            if (this.props.showQuestion){
                data.secret_question_key = question
                data.secret_answer = answer
            }
            this.props.submit(data)
        }
    }
    handleFormChange(formData){
        this.setState({formData: {...formData}})
    }
    handleFormFocus(e, component){
    }
    handleEdit(field, value){
        this.setState({form: {...this.state.form, [field]: value}})
    }

    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                onRequestClose={this.closeModal}
                visible={this.props.showCompleteModal}
                onShow={this.props.getQuestions}
            >
                <View style={styles.defaultView}>
                    <CancelDoneHeader
                        title='Complete Profile'
                        onCancelPress={this.closeModal}
                        onDonePress={this.done}
                        />
                    <ScrollView keyboardShouldPersistTaps={true}>
                        {this.props.showPin && (
                            <View>
                                <InputGroup mb={0} mt={3} >
                                    <InputRow
                                        label='PIN Number'
                                        placeholder='Required'
                                        value={this.state.form.pin}
                                        editable
                                        secureTextEntry
                                        onChangeText={this.handlepin} />
                                    <InputRow
                                        label='Repeat PIN'
                                        placeholder='Required'
                                        secureTextEntry
                                        value={this.state.form.rpin}
                                        editable
                                        onChangeText={this.handlerpin} />
                                </InputGroup>
                                <InputHelpText>
                                  PIN Number will be used when you do any cash out transaction.
                                </InputHelpText>
                            </View>
                        )}
                        {this.props.showQuestion && (
                            <View>
                                <InputGroup mb={0} mt={0} style={pageStyles.inputGroup} >
                                    <InputPicker
                                        expanded={this.state.focusPicker}
                                        value={this.state.form.question}
                                        label='Question'
                                        editable
                                        onToggleExpansion={() => {
                                            this.setState({ focusPicker: !this.state.focusPicker })
                                        }}>
                                        <Picker
                                            prompt='Select a security question'
                                            selectedValue={this.state.form.question}
                                            onValueChange={this.handlequestion}>
                                            {this.props.questions.map(question => (
                                                <Picker.Item key={question.key} label={question.value} value={question.key} />
                                            ))}
                                        </Picker>
                                    </InputPicker>
                                    <InputRow
                                        label='Answer'
                                        placeholder='Required'
                                        value={this.state.form.answer}
                                        editable
                                        onChangeText={this.handleanswer} />
                                </InputGroup>
                                <InputHelpText>
                                  Secret question will be used for restting your login password
                                </InputHelpText>
                            </View>
                        )}

                    </ScrollView>
                </View>
            </Modal>
        )
    }
}

export default CompleteProfile


const pageStyles = StyleSheet.create({
    inputGroup: {
        backgroundColor: colors.primaryText
    }
})
