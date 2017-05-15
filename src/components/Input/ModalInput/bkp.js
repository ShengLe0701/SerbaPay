import React, { Component } from 'react'
import {View, Modal, Text} from 'react-native'
import {
    InputTouchable,
    InputGroup,
} from 'panza'
import InputRow from '../InputRow'
import {CancelDoneHeader} from '../../Headers'
import { connect } from 'react-redux'


export class ModalInput extends Component {
    static propTypes = {
        visible: React.PropTypes.bool,
        onDone: React.PropTypes.func,
        value: React.PropTypes.string,
        onChangeText: React.PropTypes.func
    }
    static defaultProps = {
        visible: false,
        value: '',
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
        this.setState({modalOpen: true})
    }
    closeModal() {
        this.setState({modalOpen: false})
    }
    onDone (){
        this.props.onDone && this.props.onDone(this.state.value)
        this.closeModal()
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
        let {visible, value, children, ...props} = this.props
        return (
            <View>
                <Modal
                    visible={this.state.modalOpen || visible}
                    onRequestClose={this.closeModal}
                    onShow={this.onModalShow}
                    >
                    <CancelDoneHeader onCancelPress={this.closeModal} onDonePress={this.onDone}></CancelDoneHeader>
                    <InputGroup mb={0} mt={3} >
                        {
                            this.props.children ? this.props.children :
                                <InputRow
                                {...this.props}
                                ref='field'
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
