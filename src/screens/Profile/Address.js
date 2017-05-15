import React, { Component } from 'react'
import { Modal, Text, TouchableHighlight, View, ScrollView, StyleSheet, Alert } from 'react-native'
import {CancelDoneHeader} from '../../components/Headers'
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator'
import { styles, colors } from '../../styles/global'
import { required } from '../../lib/utils/validators'

const pageStyles = StyleSheet.create({
    formContainer: {
        backgroundColor: colors.bg,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    form: {
        backgroundColor: 'white',
        flex: 1
    },
    grayInput: {
        backgroundColor: colors.bg
    },
})

export class Address extends Component {
    static propTypes = {
        showAddressModal: React.PropTypes.bool.isRequired,
        fnShowAddressModal: React.PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props)
        //binds
        this.closeModal = this.closeModal.bind(this)
        this.done = this.done.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        //state
        this.state = {
            formData: {}
        }
    }
    closeModal(){
        this.props.fnShowAddressModal(false)
    }
    done(){
        this.props.fnShowAddressModal(false)
    }
    handleFormChange(formData){
        this.setState({formData: {...formData}})
    }
    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                onRequestClose={this.closeModal}
                visible={this.props.showAddressModal}
            >
                <View style={[styles.defaultView, {flex: 1}]}>
                    <CancelDoneHeader
                        title='Living Address'
                        onCancelPress={this.closeModal}
                        onDonePress={this.done}
                        />
                    <ScrollView keyboardShouldPersistTaps={true} contentContainerStyle={pageStyles.formContainer}>
                        <Form
                            ref='registrationForm'
                            onChange={this.handleFormChange}
                            label="Personal Information"
                            style={pageStyles.form}
                        >
                            <Separator style={pageStyles.grayInput} style={styles.defaultText} />
                            <InputField ref='fullAddress' placeholder='Full Address' style={styles.defaultText}/>
                            <InputField ref='province' placeholder='Province' style={styles.defaultText}/>
                            <InputField ref='regency' placeholder='Regency/City' style={styles.defaultText}/>
                            <InputField ref='postcode' placeholder='Postcode' style={styles.defaultText}/>
                        </Form>

                    </ScrollView>
                </View>
            </Modal>
        )
    }
}

export default Address
