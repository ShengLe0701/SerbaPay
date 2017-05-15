import React, { Component } from 'react'
import {View, Modal, Text, ActivityIndicator, StyleSheet} from 'react-native'
import {
    InputTouchable,
    InputGroup,
} from 'panza'
import InputRow from '../InputRow'
import {CancelDoneHeader, BaseHeader} from '../../Headers'
import { connect } from 'react-redux'
import {DefaultText } from '../../Text'

const styles = StyleSheet.create({
    cancelDone: {
        color: 'white',
        fontSize: 17,
    }
})

export class ModalInput extends Component {
    static propTypes = {
        visible: React.PropTypes.bool,
        onDone: React.PropTypes.func,
        value: React.PropTypes.string,
        onChangeText: React.PropTypes.func,
        showModal: React.PropTypes.func.isRequired,
        closeModal: React.PropTypes.func.isRequired,
        show: React.PropTypes.bool.isRequired,
        modalId: React.PropTypes.string.isRequired,
        loading: React.PropTypes.bool,
    }
    static defaultProps = {
        visible: false,
        value: '',
        loading: false,
    }

    constructor(props){
        super(props)
        this.state = {
            modalOpen: false,
            value: ''
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.onModalShow = this.onModalShow.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onDone = this.onDone.bind(this)
    }
    openModal() {
        this.props.showModal()
    }
    closeModal() {
        this.props.closeModal()
    }
    onDone (){
        let value = this.state.value
        if (this.props.children){
            console.log('enviar el valor desde props')
            value = this.props.value
        }
        this.props.onDone && this.props.onDone(value)
        // this.closeModal()
    }
    handleChange(value) {
        if (this.props.onChangeText)
            this.props.onChangeText(value)
        else
            this.setState({...this.state, value})
    }
    onModalShow(){
        this.setState({...this.state, value: this.props.value})
    }
    render() {
        let {visible, value, children, loading, label, ...props} = this.props

        const loadIndicator = loading ?
            <ActivityIndicator
                size='small'
                color='white'
            />  : (
                <DefaultText onPress={this.onDone} style={styles.cancelDone}>Done</DefaultText>
            )

        return (
            <View>
                <Modal
                    visible={this.props.show}
                    onRequestClose={this.closeModal}
                    onShow={this.onModalShow}
                    >
                    <BaseHeader
                        leftComponent={(
                            <DefaultText onPress={this.closeModal} style={styles.cancelDone}>Cancel</DefaultText>
                        )}
                        rightComponent={loadIndicator}
                    />
                    <View>
                        {loadIndicator}
                    </View>
                    <InputGroup mb={0} mt={3} >
                        {
                            this.props.children ? this.props.children :
                                <InputRow
                                {...this.props}
                                value={this.state.value}
                                editable
                                autoFocus
                                selectTextOnFocus
                                onChangeText={this.handleChange} />
                        }
                    </InputGroup>
                </Modal>
                <InputTouchable
                    editable={false}
                    onPress={this.openModal}
                    showMore
                    {...this.props}
                />
            </View>
        )
    }
}

export default ModalInput
