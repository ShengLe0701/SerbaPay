import React, { Component } from 'react'
import { View, ScrollView, ListView, Modal, StyleSheet, TouchableHighlight } from 'react-native'
import { DefaultText, LightText, SemiBoldText } from '../../../components/Text'
import { BaseHeader } from '../../../components/Headers'
import TransactionDetail from '../TransactionsDetail'
import { colors } from '../../../styles/global'
import moment from 'moment'
import pageStyles from './styles'
import Transaction from './TransactionRow'

const renderTransaction = props => (<Transaction {...props}/>)


export class Transactions extends Component {
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.transactions)
        }
    }

    static propTypes = {
        closeModal: React.PropTypes.func.isRequired,
        visible: React.PropTypes.bool.isRequired,
        transactions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    }

    render() {
        return (
            <Modal visible={this.props.visible} onRequestClose={this.props.closeModal} >
                <TransactionDetail/>
                <BaseHeader
                    onBackPress={this.props.closeModal}
                    title='8 Aug 2016' />
                <ListView
                    style={pageStyles.mainContainer}
                    dataSource={this.state.dataSource}
                    renderRow={renderTransaction} />
            </Modal>
        )
    }
}

export default Transactions
