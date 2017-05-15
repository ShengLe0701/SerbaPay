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

export class LoginPassord extends Component {
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
                newPassword: '',
                repeatPassword: '',
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
                        title='Login Password'
                    />
                    <InputGroup mb={0} mt={3} style={{backgroundColor: 'white'}} >
                        <InputRow
                            label='Current Password'
                            placeholder='Required'
                            value={this.state.form.current}
                            editable
                            autoFocus
                            selectTextOnFocus
                            onChangeText={this.handlecurrent} />
                        <InputRow
                            label='New Password'
                            placeholder='Required'
                            selectTextOnFocus
                            value={this.state.form.newPassword}
                            editable
                            onChangeText={this.handlenewPassword} />
                        <InputRow
                            selectTextOnFocus
                            label='Repeat New Password'
                            placeholder='Required'
                            value={this.state.form.repeatPassword}
                            editable
                            onChangeText={this.handlerepeatPassword} />
                    </InputGroup>
                </ScrollView>
            </Modal>
        )
    }
}


export default LoginPassord
