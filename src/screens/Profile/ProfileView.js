import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, Image, Platform } from 'react-native'
import { DefaultText, LinkText } from '../../components/Text'
import { Alert } from '../../components/Alert'

import CompleteProfile from './CompleteProfile'
import Address from './AddressContainer'

import {
    InputRow,
    InputTouchable,
    InputGroup,
} from 'panza'
import {ModalInput, InputPicker, Picker} from '../../components/Input'
import PersonalData from './PersonalData'
import BankAccount from './BankAccount'
import LoginPassword from './LoginPassword'
import PinNumber from './PinNumber'

export class ProfileView extends Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired,
        gotoVerifyMobile: React.PropTypes.func.isRequired,
        gotoDeposit: React.PropTypes.func.isRequired,
        fnShowCompleteModal: React.PropTypes.func.isRequired,
        fnShowCompleteProfileModal: React.PropTypes.func.isRequired,
        fnShowAddressModal: React.PropTypes.func.isRequired,
        fnShowPersonalDataModal: React.PropTypes.func.isRequired,
        fnShowBankAccountModal: React.PropTypes.func.isRequired,
        fnShowLoginPasswordModal: React.PropTypes.func.isRequired,
        fnShowPinNumberModal: React.PropTypes.func.isRequired,
        profileCompleted: React.PropTypes.bool.isRequired,
    }
    constructor(){
        super()
        this.openAddressModal = this.openAddressModal.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.state = {
            laguagePickerOpen: false,
            formData: {
                language: 'English'
            }
        }
    }
    openAddressModal(){
        this.props.fnShowAddressModal(true)
    }
    handleFormChange(formData){
        this.setState({formData: {...formData}})
    }
    render() {
        let value = '100'
        const {user, ...other} = this.props

        return (
            <View style={styles.page}>
                {
                    !this.props.profileCompleted && (
                    <Alert onPress={this.props.fnShowCompleteProfileModal}>
                        You have not completed your profile yet
                    </Alert>
                    )
                }
                <ScrollView keyboardShouldPersistTaps={true} style={styles.page}>
                    <CompleteProfile />
                    <Address />
                    <PersonalData />
                    <BankAccount/>
                    <LoginPassword/>
                    <PinNumber/>
                    <InputGroup mb={0} mt={3} >
                        <InputTouchable
                            editable={false}
                            onPress={this.props.fnShowPersonalDataModal}
                            label={user.full_name}
                            showMore
                        />
                        <InputTouchable
                            editable={false}
                            onPress={this.props.gotoDeposit}
                            style={styles.linkInput}
                            value='30.302.000'
                            label='iWantPay credits'
                        />
                        <InputTouchable
                            editable={false}
                            onPress={this.props.gotoDeposit}
                            style={styles.linkInput}
                            value={'12.000'}
                            placeholder='placeholder'
                            label='Bonus Points'
                        />
                    </InputGroup>
                    <InputGroup mb={0} mt={3} >
                        <InputTouchable
                            editable={false}
                            onPress={this.props.fnShowBankAccountModal}
                            showMore
                            label='Bank Account'
                        />
                    </InputGroup>
                    <InputGroup mb={0} mt={3} >
                        <InputTouchable
                            editable={false}
                            onPress={this.props.fnShowLoginPasswordModal}
                            showMore
                            placeholder='placeholder'
                            label='Login Password'
                        />
                        <InputTouchable
                            editable={false}
                            onPress={this.props.fnShowPinNumberModal}
                            showMore
                            placeholder='placeholder'
                            label='PIN Number'
                        />
                    </InputGroup>
                    <InputGroup mb={0} mt={3} >
                        <ModalInput
                            value={this.state.formData.language}
                            placeholder={this.state.formData.language}
                            label='Language'
                        >
                            <InputPicker
                                expanded={this.state.laguagePickerOpen}
                                value={this.state.formData.language}
                                label='Language'
                                editable
                                onToggleExpansion={() => {
                                    this.setState({ laguagePickerOpen: !this.state.laguagePickerOpen })
                                }}>
                                    <Picker
                                        prompt='Language'
                                        selectedValue={this.state.formData.language}
                                        onValueChange={val => this.setState({formData: {...this.state.formData, language: val}})}>
                                        <Picker.Item
                                            label='English' value='English'
                                         />
                                        <Picker.Item label='SG' value='SG' />
                                    </Picker>
                            </InputPicker>
                        </ModalInput>
                    </InputGroup>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    page: {flex: 1},
    linkInput: {
        paddingRight: 12
    }
})

export default ProfileView
