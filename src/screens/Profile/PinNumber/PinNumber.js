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

export class PinNumber extends Component {
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
                current: '',
                newPin: '',
                repeatPin: '',
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
                    <CancelDoneHeader
                        onCancelPress={this.props.closeModal}
                        onDonePress={this.props.onDone}
                        title='Pin Number'
                    />
                    <InputGroup mb={0} mt={3} style={{backgroundColor: 'white'}} >
                        <InputRow
                            label='Current PIN'
                            placeholder='Required'
                            value={this.state.form.current}
                            autoFocus
                            editable
                            onChangeText={this.handlecurrent} />
                        <InputRow
                            label='New PIN'
                            placeholder='Required'
                            value={this.state.form.newPin}
                            editable
                            onChangeText={this.handlenewPin} />
                        <InputRow
                            label='Repeat New PIN'
                            placeholder='Required'
                            value={this.state.form.repeatPin}
                            editable
                            onChangeText={this.handlerepeatPin} />
                    </InputGroup>
                </ScrollView>
            </Modal>
        )
    }
}


export default PinNumber
