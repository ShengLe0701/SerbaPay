import React, { Component, PropTypes } from 'react'
import {
    View,
    Text,
    TouchableHighlight,
    Image,
    StyleSheet,
    Platform,
} from 'react-native'
import {
    Link,
    AnimatedHeader,
    Pop
} from 'react-router-native'
import Octicons from 'react-native-vector-icons/Octicons'
import { colors, sizes } from '../../styles/global'
import { DefaultText, LightText } from '../Text'


const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftRightEl: {
        width: 80,
        flexDirection: 'row',
    },
    leftEl: {
        justifyContent: 'flex-start'
    },
    rightEl: {
        justifyContent: 'flex-end'
    },
    titleText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
    },
    backButtonCont: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.prymaryBg
    },
    backButtonText: {
        margin: 10,
        color: 'white',
        fontSize: 18,
    },
    homeHeader: {
        paddingTop: Platform.OS === 'ios' ? sizes.iosPaddingAdjust : 0,
        backgroundColor: colors.primaryBg,
        elevation: 0,
        height: Platform.OS === 'ios' ? sizes.headerHeight + sizes.iosPaddingAdjust: sizes.headerHeight,
    },
    backChevron: {
        marginLeft: 16,
        color: 'white',
        fontSize: 22
    },
})


class CancelDoneHeader extends Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        onCancelPress: React.PropTypes.func.isRequired,
        onDonePress: React.PropTypes.func.isRequired,
        cancelText: React.PropTypes.string.isRequired,
        doneText: React.PropTypes.string.isRequired,
        hideDone: React.PropTypes.bool.isRequired,
        hideCancel: React.PropTypes.bool.isRequired,
        rightComponent: React.PropTypes.node,
        leftComponent: React.PropTypes.node,
    };

    static defaultProps = {
        title: '',
        cancelText: 'Cancel',
        doneText: 'Done',
        hideDone: false,
        hideCancel: false,
        onDonePress: nope => nope,
        onCancelPress: nope => nope,
    }

    componentWillMount() {
        this.renderLeftComponent = this.renderLeftComponent.bind(this)
        this.renderRightComponent = this.renderRightComponent.bind(this)
        this.renderTitleComponent = this.renderTitleComponent.bind(this)
    }

    renderLeftComponent() {
        if (this.props.hideCancel)
            return (
                <View style={styles.leftRightEl}>
                </View>
            )
        if (this.props.leftComponent){
            return this.props.leftComponent
        }
        if (this.props.backButton){
            return (
                <TouchableHighlight onPress={this.props.onCancelPress} style={[styles.leftRightEl, styles.leftEl]}>
                    <View style={styles.backButtonCont}>
                        <Octicons name='chevron-left' style={styles.backChevron} />
                        <DefaultText style={styles.backButtonText}>Back</DefaultText>
                    </View>
                </TouchableHighlight>
            )
        }
        return (
            <TouchableHighlight onPress={this.props.onCancelPress} style={[styles.leftRightEl, styles.leftEl]}>
                <View style={styles.backButtonCont}>
                    <DefaultText style={styles.backButtonText}>{this.props.cancelText}</DefaultText>
                </View>
            </TouchableHighlight>
        )
    }
    renderRightComponent() {
        if (this.props.hideDone)
            return null
        if (this.props.rightComponent){
            return this.props.rightComponent
        }
        return (
            <TouchableHighlight onPress={this.props.onDonePress} style={[styles.leftRightEl, styles.rightEl]}>
                <DefaultText style={styles.backButtonText}>{this.props.doneText}</DefaultText>
            </TouchableHighlight>
        )
    }

    renderTitleComponent() {
        return (
            <DefaultText style={styles.titleText}>{this.props.title}</DefaultText>
        )
    }
    render() {
        return (
            <View
                style={[styles.rowContainer, styles.homeHeader]}
            >
                {this.renderLeftComponent()}
                {this.renderTitleComponent()}
                {this.renderRightComponent()}
            </View>
        )
    }
}


export default CancelDoneHeader
