import React, { Component } from 'react'
import { View, ScrollView, Modal, StyleSheet, Text, TouchableHighlight } from 'react-native'
import { DefaultText, LightText, SemiBoldText } from '../../../components/Text'
import { BaseHeader } from '../../../components/Headers'
import { colors } from '../../../styles/global'
import moment from 'moment'
import Calendar from '../../../components/Calendar'
import Month from '../../../components/Calendar/components/Month'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Transactions from '../Transactions'

const pageStyles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingTop: 10,
    },
    linksContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: colors.border,
        borderTopWidth: 1,
    },
    ctrlButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    ctrButton: {
        color: colors.primaryText,
        fontSize: 23,
        marginLeft: 8
    },
    bottomLinkText: {
        backgroundColor: colors.primaryText,
        padding: 16,
        color: colors.primaryBg,
        fontSize: 17
    }
})

export class CalendarView extends Component {
    constructor(props){
        super(props)
        this.state = {
            month: moment().format()
        }

        this.nextMonth = this.nextMonth.bind(this)
        this.prevMonth = this.prevMonth.bind(this)
        this.onDateSelect = this.onDateSelect.bind(this)
    }

    nextMonth(){
        this.setState({month: moment(this.state.month).add(1,'month').format()})
    }

    prevMonth(){
        this.setState({month: moment(this.state.month).subtract(1,'month').format()})
    }

    onDateSelect(date){
        this.props.showTransactionsForDay()
    }

    static propTypes = {
        closeModal: React.PropTypes.func.isRequired,
        visible: React.PropTypes.bool.isRequired,
        showTransactionsForDay: React.PropTypes.func,
    }

    render() {
        return (
            <Modal style={pageStyles.mainContainer}
                visible={this.props.visible}
                onRequestClose={this.props.closeModal} >
                <Transactions/>
                <BaseHeader
                    title={moment(this.state.month).format('MMM')}
                    onBackPress={this.props.closeModal}
                    rightComponent={
                        <View style={pageStyles.ctrlButtonsContainer}>
                            <FontAwesome name='chevron-circle-left' onPress={this.prevMonth} style={pageStyles.ctrButton}/>
                            <FontAwesome name='chevron-circle-right' onPress={this.nextMonth} style={pageStyles.ctrButton} />
                        </View>
                    }
                />
                <View style={pageStyles.container}>
                    <Month
                        date={this.state.month}
                        events={[
                            {date: '2016-10-10', eventIndicator: {backgroundColor: 'green'}},
                            {date: '2016-10-20', eventIndicator: {backgroundColor: 'red'}},
                            {date: '2016-10-20', eventIndicator: {backgroundColor: 'green'}},
                            {date: '2016-10-07', eventIndicator: {backgroundColor: 'red'}},
                            {date: '2016-10-14', eventIndicator: {backgroundColor: 'green'}},
                        ]}
                        onDateSelect={this.onDateSelect}
                    />
                </View>
                <View style={pageStyles.linksContainer}>
                    <TouchableHighlight style={pageStyles.bottomLink} onPress={nope => nope}>
                        <DefaultText style={pageStyles.bottomLinkText}>Transactions</DefaultText>
                    </TouchableHighlight>
                    <TouchableHighlight style={pageStyles.bottomLink} onPress={nope => nope}>
                        <DefaultText style={pageStyles.bottomLinkText}>Bonus Points</DefaultText>
                    </TouchableHighlight>
                </View>
            </Modal>
        )
    }
}

export default CalendarView
