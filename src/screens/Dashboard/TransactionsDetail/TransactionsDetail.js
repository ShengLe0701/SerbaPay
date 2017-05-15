import React, { Component } from 'react'
import { View, ScrollView, ListView, Modal, StyleSheet, TouchableHighlight } from 'react-native'
import { DefaultText, LightText, SemiBoldText } from '../../../components/Text'
import { BaseHeader } from '../../../components/Headers'
import { colors } from '../../../styles/global'
import moment from 'moment'

const pageStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        margin: 20,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        marginBottom: 22,
        color: colors.inactive
    }
})


export class TransactionDetail extends Component {
    static propTypes = {
        closeModal: React.PropTypes.func.isRequired,
        visible: React.PropTypes.bool.isRequired,
        transaction: React.PropTypes.object.isRequired,
    }

    render() {
        const {transaction} = this.props
        return (
            <Modal visible={this.props.visible} onRequestClose={this.props.closeModal} >
                <BaseHeader
                    onBackPress={this.props.closeModal}
                    title='Transaction Detail' />
                <ScrollView style={pageStyles.mainContainer}>
                    <DefaultText style={pageStyles.title}>
                        Date
                    </DefaultText>
                    <DefaultText style={pageStyles.text}>
                        {moment(transaction.date).format('DD-MM-YYYY HH:mm:ss')}
                    </DefaultText>
                    <DefaultText style={pageStyles.title}>
                        Transaction No
                    </DefaultText>
                    <DefaultText style={pageStyles.text}>
                        {transaction.no}
                    </DefaultText>
                    <DefaultText style={pageStyles.title}>
                        Reference
                    </DefaultText>
                    <DefaultText style={pageStyles.text}>
                        {transaction.reference}
                    </DefaultText>
                    <DefaultText style={pageStyles.title}>
                        Amount
                    </DefaultText>
                    <DefaultText style={pageStyles.text}>
                        {transaction.amount}
                    </DefaultText>
                    <DefaultText style={pageStyles.title}>
                        Description
                    </DefaultText>
                    <DefaultText style={pageStyles.text}>
                        {transaction.description}
                    </DefaultText>
                    <DefaultText style={pageStyles.title}>
                        Remark
                    </DefaultText>
                    <DefaultText style={pageStyles.text}>
                        {transaction.remark}
                    </DefaultText>
                </ScrollView>
            </Modal>
        )
    }
}

export default TransactionDetail
