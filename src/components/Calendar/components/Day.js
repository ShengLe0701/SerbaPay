import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import styles from './styles';

export default class Day extends Component {

    constructor(props) {
        super(props)
        this.onPress = this.onPress.bind(this)
    }
  static defaultProps = {
    customStyle: {},
    events: [],
  }

  static propTypes = {
    caption: PropTypes.any,
    customStyle: PropTypes.object,
    filler: PropTypes.bool,
    events: PropTypes.arrayOf(React.PropTypes.object),
    isSelected: PropTypes.bool,
    isToday: PropTypes.bool,
    isWeekend: PropTypes.bool,
    onPress: PropTypes.func,
    usingEvents: PropTypes.bool,
  }

  dayCircleStyle = (isWeekend, isSelected, isToday, event) => {
    const { customStyle } = this.props
    const dayCircleStyle = [styles.dayCircleFiller, customStyle.dayCircleFiller]

    if (isSelected && !isToday) {
      dayCircleStyle.push(styles.selectedDayCircle, customStyle.selectedDayCircle)
    } else if (isSelected && isToday) {
      dayCircleStyle.push(styles.currentDayCircle, customStyle.currentDayCircle)
    }

    if (event) {
      dayCircleStyle.push(styles.hasEventCircle, customStyle.hasEventCircle, event.hasEventCircle)
    }
    return dayCircleStyle;
  }

  dayTextStyle = (isWeekend, isSelected, isToday, event) => {
    const { customStyle } = this.props;
    const dayTextStyle = [styles.day, customStyle.day];

    if (isToday && !isSelected) {
      dayTextStyle.push(styles.currentDayText, customStyle.currentDayText);
    } else if (isToday || isSelected) {
      dayTextStyle.push(styles.selectedDayText, customStyle.selectedDayText);
    } else if (isWeekend) {
      dayTextStyle.push(styles.weekendDayText, customStyle.weekendDayText);
    }

    if (event) {
      dayTextStyle.push(styles.hasEventText, customStyle.hasEventText, event.hasEventText)
    }
    return dayTextStyle;
  }

    onPress() {
        this.props.onPress(this.props.caption)
    }

  render() {
    let { caption, customStyle } = this.props
    const {
      filler,
      events,
      isWeekend,
      isSelected,
      isToday,
    } = this.props;
    const usingEvents = events.length > 0
    const event = events[0]

    return filler
    ? (
        <TouchableWithoutFeedback>
          <View style={[styles.dayButtonFiller, customStyle.dayButtonFiller]}>
            <Text style={[styles.day, customStyle.day]} />
          </View>
        </TouchableWithoutFeedback>
      )
    : (
      <TouchableOpacity onPress={this.onPress}>
        <View style={[styles.dayButton, customStyle.dayButton]}>
            <View style={styles.daySubContainer}>
              <View style={this.dayCircleStyle(isWeekend, isSelected, isToday, event)}>
                <Text style={this.dayTextStyle(isWeekend, isSelected, isToday, event)}>{caption}</Text>
              </View>
            </View>
          {usingEvents &&
            <View style={styles.daySubContainer}>
                {events.map((event, index) => {
                    return (
                        <View key={index} style={[
                            styles.eventIndicatorFiller,
                            event.eventIndicator,
                          ]}
                        />
                    )
                })}
            </View>
          }
        </View>
      </TouchableOpacity>
    );
  }
}
