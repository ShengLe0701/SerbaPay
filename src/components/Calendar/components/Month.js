import React, { Component } from 'react'
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import moment from 'moment'
import styles from './styles'
import Day from './Day'
import {prepareEventDates} from '../utils'

export class Month extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedMoment: null,
        }
        this.selectDate = this.selectDate.bind(this)
        this.renderHeading = this.renderHeading.bind(this)
    }

    selectDate(day) {
        this.setState({ selectedMoment: day })
        this.props.onDateSelect && this.props.onDateSelect(day ? day.format(): null )
    }

    renderHeading() {
        const headings = []
        for (let i = 0; i < 7; i++) {
            const j = (i + this.props.weekStart) % 7
            headings.push(
                <Text
                  key={i}
                  style={j === 0 || j === 6 ?
                    [styles.weekendHeading, this.props.customStyle.weekendHeading] :
                    [styles.dayHeading, this.props.customStyle.dayHeading]}
                >
                    {this.props.dayHeadings[j]}
                </Text>
            )
        }

        return (
            <View style={[styles.calendarHeading, this.props.customStyle.calendarHeading]}>
                {headings}
            </View>
        )
    }

    static defaultProps = {
        events: {},
        weekStart: 1,
        customStyle: styles,
        dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    }

    static propTypes = {
        date: React.PropTypes.string.isRequired,
        events: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        weekStart: React.PropTypes.number.isRequired,
        customStyle: React.PropTypes.object,
        dayHeadings: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired
    }

    render() {
        const { date, events, ...props } = this.props
        const monthDate = moment(date)

        if (!monthDate.isValid())
            return (
                <Text>
                    Invalid monthDate
                </Text>
            )

        let
            renderIndex = 0,
            weekRows = [],
            days = [],
            startOfArgMonthMoment = moment(monthDate).startOf('month')

        const
            selectedMoment = moment(this.state.selectedMoment),
            weekStart = this.props.weekStart,
            todayMoment = moment(),
            todayIndex = todayMoment.date() - 1,
            argMonthDaysCount = monthDate.daysInMonth(),
            offset = (startOfArgMonthMoment.isoWeekday() - weekStart + 7) % 7,
            argMonthIsToday = monthDate.isSame(todayMoment, 'month'),
            selectedIndex = moment(selectedMoment).date() - 1,
            selectedMonthIsArg = selectedMoment.isSame(monthDate, 'month'),
            parsedEvents = prepareEventDates(events, monthDate)


        do {
          const dayIndex = renderIndex - offset;
          const isoWeekday = (renderIndex + weekStart) % 7;

          if (dayIndex >= 0 && dayIndex < argMonthDaysCount) {
            days.push((
              <Day
                startOfMonth={startOfArgMonthMoment}
                isWeekend={isoWeekday === 0 || isoWeekday === 6}
                key={`${renderIndex}`}
                onPress={() => {
                  this.selectDate(moment(startOfArgMonthMoment).set('date', dayIndex + 1));
                }}
                caption={`${dayIndex + 1}`}
                isToday={argMonthIsToday && (dayIndex === todayIndex)}
                isSelected={selectedMonthIsArg && (dayIndex === selectedIndex)}
                events={parsedEvents[dayIndex]}
                customStyle={this.props.customStyle}
              />
            ));
          } else {
            days.push(<Day key={`${renderIndex}`} filler customStyle={this.props.customStyle} />);
          }
          if (renderIndex % 7 === 6) {
            weekRows.push(
              <View
                key={weekRows.length}
                style={[styles.weekRow, this.props.customStyle.weekRow]}
              >
                {days}
              </View>);
            days = [];
            if (dayIndex + 1 >= argMonthDaysCount) {
              break;
            }
          }
          renderIndex += 1;
        } while (true)
        const containerStyle = [styles.monthContainer, this.props.customStyle.monthContainer];

        return <View {...props} style={containerStyle}>
            {this.renderHeading()}
            {weekRows}
        </View>
    }
}

export default Month
