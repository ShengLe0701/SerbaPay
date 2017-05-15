import {connect} from 'react-redux'
import {actions} from './reducer'
import pageStyles from './styles'
import React, { Component } from 'react'
import { View, TouchableHighlight } from 'react-native'
import { DefaultText, LightText, SemiBoldText } from '../../../components/Text'
import moment from 'moment'

class TransactionRow extends Component {
    render() {
        const {date, no, amount, type, id, select} = this.props

        return (
            <TouchableHighlight onPress={() => select(id)}>
                <View style={pageStyles.trans} key={id}>
                    <DefaultText style={pageStyles.transDate}>
                        {moment(date).format("h:mma")}
                    </DefaultText>
                    <DefaultText style={pageStyles.transNo}>
                        {no}
                    </DefaultText>
                    <DefaultText style={[pageStyles.transAmmount, amount < 300 && pageStyles.transAmmount2 ]}>
                        {amount}
                    </DefaultText>
                </View>
            </TouchableHighlight>
        )
    }
}

const mstp = state => ({})

const mdtp = {
    select: actions.selectAndShow
}

export default connect(mstp, mdtp)(TransactionRow)
