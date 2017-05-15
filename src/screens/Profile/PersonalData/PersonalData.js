import React, { Component } from 'react'
import {
    Modal,
    View,
    StyleSheet,
    Text,
    ScrollView,
    LayoutAnimation,
    ActivityIndicator,
} from 'react-native'
import {
    InputRow,
    InputTouchable,
    InputGroup,
    InputDatePicker,
} from 'panza'
import { CancelDoneHeader } from '../../../components/Headers'
import { ModalInput, Picker, InputPicker } from '../../../components/Input'
import moment from 'moment'
import {colors} from '../../../styles/global'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    page: {},
    unverified: {
        position: 'absolute',
        top: 15,
        right: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    unverifiedText: {
        color: colors.warning,
        textAlign: 'right',
    },
    emailField: {
        paddingTop: 20,
    }
})

export class PersonalData extends Component {
    static propTypes = {
        closeModal: React.PropTypes.func.isRequired,
        visible: React.PropTypes.bool.isRequired,
        user: React.PropTypes.object.isRequired,
        requestEmailVerification: React.PropTypes.func.isRequired,
        loadingEmailVerification: React.PropTypes.bool.isRequired,
    }
    constructor(props){
        super(props)
        this.state = {
            focusGenderInput: false,
            focusDate: false,
            form: {
                gender: ' ',
                phone: ' ',
                date: new Date(),
                full_name: ' ',
                profession: ' '
            }
        }

        Object.keys(this.state.form).forEach((key, index) => {
            const name = `handle${key}`
            this[name] = this.handleEdit.bind(this, key)
            const doneName = `done${key}`
            this[doneName] = this.onFieldDone.bind(this, key)
        })
        this.updateFormFromStore = this.updateFormFromStore.bind(this)
    }
    onFieldDone(field, value, modalId){
        this.props.editMemberInfo(field, value, modalId)
    }
    updateFormFromStore(){
        const {user} = this.props
        const form = {
            gender: user.gender || ' ',
            profession: user.profession || ' ',
            phone: user.phone || ' ',
        }
        this.setState({...this.state, form: {...this.state.form, ...form}})
    }
    handleEdit(field, value){
        this.setState({form: {...this.state.form, [field]: value}})
    }
    render() {
        const {user, editMemberInfo, loadingMemberInfo, ...other} = this.props

        return (
            <Modal
                visible={this.props.visible}
                onRequestClose={this.props.closeModal}
                onShow={this.updateFormFromStore}
            >
                <ScrollView keyboardShouldPersistTaps={true} style={styles.page}>
                    <CancelDoneHeader onCancelPress={this.props.closeModal} backButton hideDone/>
                    <InputGroup mb={0} mt={3} >
                        <ModalInput
                            label='Full Name'
                            modalId='personal_fullName'
                            value={user.full_name}
                            placeholder={user.full_name}
                            loading={loadingMemberInfo}
                            onDone={(value) => editMemberInfo('full_name', value, 'personal_fullName')}
                        />
                        <View style={styles.emailField}>
                            <InputTouchable
                                label='Email'
                                value={this.props.user.email}
                                showMore
                                onPress={this.props.requestEmailVerification}
                            />

                            <View style={styles.unverified}>
                                <ActivityIndicator
                                    animating={this.props.loadingEmailVerification}
                                    size="small"
                                    color={colors.warning}
                                />
                                <Text style={styles.unverifiedText}>
                                    {!this.props.loadingEmailVerification &&
                                        <FontAwesome name='exclamation-triangle' size={16} color={colors.warning} />
                                    }
                                    Unverified
                                </Text>
                            </View>
                        </View>
                        <ModalInput
                            value={user.phone}
                            placeholder={user.phone}
                            label='Telephone'
                            modalId='personal_phone'
                            loading={loadingMemberInfo}
                            onDone={(value) => editMemberInfo('phone', value, 'personal_phone')}
                        />
                        <ModalInput
                            value={this.state.form.gender}
                            placeholder={user.gender === 'm' ? 'Male' : user.gender === 'f' ? 'Female' : ' '}
                            loading={loadingMemberInfo}
                            label='Gender'
                            modalId='personal_gender'
                            onDone={(value) => editMemberInfo('personal_gender', value, 'personal_gender')}
                        >
                            <InputPicker
                                expanded={this.state.focusGenderInput}
                                value={this.state.form.gender}
                                label='Gender'
                                editable
                                onToggleExpansion={() => {
                                    this.setState({ focusGenderInput: !this.state.focusGenderInput })
                                }}>
                                <Picker
                                    prompt='Gender'
                                    selectedValue={this.state.form.gender}
                                    onValueChange={val => this.setState({form: {...this.state.form, gender: val}})}>
                                    <Picker.Item label=' ' value=' ' />
                                    <Picker.Item label='Male' value='m' />
                                    <Picker.Item label='Female' value='f' />
                                </Picker>
                            </InputPicker>
                        </ModalInput>
                        <ModalInput
                            value={user.profession}
                            label='Profession'
                            loading={loadingMemberInfo}
                            modalId='personal_profession'
                            placeholder={user.profession}
                            onDone={(value) => editMemberInfo('profession', value, 'personal_profession')}
                        />
                        <ModalInput
                            value={moment(this.state.form.date).format('MMMM Do YYYY')}
                            label='Birthday'
                            modalId='personal_birthday'
                            placeholder={this.state.form.date}
                        >
                            <InputDatePicker
                              expanded={this.state.focusDate}
                              date={this.state.form.date}
                              value={moment(this.state.form.date).format('MMMM Do YYYY')}
                              onDateChange={this.handledate}
                              label='Birthday'
                              onToggleExpansion={() => {
                                  LayoutAnimation.spring()
                                  this.setState({ focusDate: !this.state.focusDate })
                              }}
                            />
                        </ModalInput>
                    </InputGroup>

                </ScrollView>
            </Modal>
        )
    }
}


export default PersonalData
