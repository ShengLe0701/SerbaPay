import React, { Component } from 'react'
import {
    Modal,
    View,
    StyleSheet,
    Text,
    ScrollView,
    Picker,
    LayoutAnimation
} from 'react-native'
import {
    InputTouchable,
    InputGroup,
    InputPicker,
    InputDatePicker,
} from 'panza'
import { CancelDoneHeader } from '../../../components/Headers'
import { ModalInput, InputRow } from '../../../components/Input'
import {colors} from '../../../styles/global'


const styles = StyleSheet.create({
    page: {},
})

export class BankAccount extends Component {
    static propTypes = {
        closeModal: React.PropTypes.func.isRequired,
        onDone: React.PropTypes.func.isRequired,
        visible: React.PropTypes.bool.isRequired,
    }
    constructor(props){
        super(props)
        this.state = {
            focusBank: false,
            focusDate: false,
            form: {
                bank: 'Bank1',
                accountNumber: '1231231',
                accountName: '12312312',
                ktp: '123123',
            }
        }

        Object.keys(this.state.form).forEach((key, index) => {
            const name = `handle${key}`
            this[name] = this.handleEdit.bind(this, key)
        })
    }
    handleEdit(field, value){
        this.setState({form: {...this.state.form, [field]: value}})
    }
    render() {
        return (
            <Modal
                visible={this.props.visible}
                onRequestClose={this.props.closeModal}
            >
                <ScrollView keyboardShouldPersistTaps={true} style={styles.page}>
                    <CancelDoneHeader onCancelPress={this.props.closeModal} onDonePress={this.props.onDone} title='Bank Account' />
                    <InputGroup mb={0} mt={3} style={{backgroundColor: 'white'}} >
                        <InputPicker
                            expanded={this.state.focusBank}
                            value={this.state.form.bank}
                            label='Bank'
                            editable
                            onToggleExpansion={() => {
                                this.setState({ focusBank: !this.state.focusBank })
                            }}>
                            <Picker
                                prompt='Select a bank'
                                selectedValue={this.state.form.question}
                                onValueChange={this.handlebank}>
                                <Picker.Item label='Bank 1' value='Bank 1' />
                                <Picker.Item label='Bank 2' value='Bank 2' />
                            </Picker>
                        </InputPicker>
                        <InputRow
                            label='Account Number'
                            placeholder='Required'
                            value={this.state.form.accountNumber}
                            editable
                            onChangeText={this.handleaccountNumber} />
                        <InputRow
                            label='Account Name'
                            placeholder='Required'
                            value={this.state.form.accountName}
                            editable
                            onChangeText={this.handleaccountName} />
                        <InputRow
                            label='KTP Number'
                            placeholder='Required'
                            value={this.state.form.ktp}
                            editable
                            onChangeText={this.handlektp} />
                    </InputGroup>
                </ScrollView>
            </Modal>
        )
    }
}


export default BankAccount
