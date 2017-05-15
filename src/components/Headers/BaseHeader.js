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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    titleText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    backButtonCont: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    backButtonText: {
        margin: 10,
        marginLeft: 7,
        color: 'white',
        fontSize: 18,
    },
    backChevron: {
        marginLeft: 16,
        color: 'white',
        fontSize: 22
    },
    homeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primaryBg,
        borderWidth: 0,
        elevation: 0,
        height: sizes.headerHeight,
        paddingTop: sizes.iosPaddingAdjust,
    },
    leftComponent: {
        height: sizes.headerHeight,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        left: 20,
        top: 0,
    },
    rightComponent: {
        height: sizes.headerHeight,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        top: 0,
        right: 20,
    }
})



class BaseHeader extends Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        backText: React.PropTypes.string.isRequired,
        hideRight: React.PropTypes.bool.isRequired,
        hideLeft: React.PropTypes.bool.isRequired,
        rightComponent: React.PropTypes.node,
        leftComponent: React.PropTypes.node,
        onBackPress: React.PropTypes.func,
    };

    static defaultProps = {
        title: '',
        backText: 'Back',
        doneText: 'Done',
        hideRight: false,
        hideLeft: false,
    }

    componentWillMount() {
        this.renderLeftComponent = this.renderLeftComponent.bind(this)
        this.renderRightComponent = this.renderRightComponent.bind(this)
        this.renderTitleComponent = this.renderTitleComponent.bind(this)
    }

    renderLeftComponent() {
        if (this.props.leftComponent){
            return this.props.leftComponent
        }
        if (this.props.hideLeft){
            return (
                <View></View>
            )
        }
        return (
            <TouchableHighlight style={styles.backButton} onPress={this.props.onBackPress}>
                <View style={styles.backButtonCont}>
                    <Octicons name='chevron-left' style={styles.backChevron} />
                    <DefaultText style={styles.backButtonText}>{this.props.backText}</DefaultText>
                </View>
            </TouchableHighlight>
        )
    }
    renderRightComponent() {
        if(this.props.rightComponent){
            return this.props.rightComponent
        }
        return (
            <View></View>
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
                style={[styles.homeHeader]}
            >
                {this.renderTitleComponent()}
                <View style={styles.leftComponent}>
                    {this.renderLeftComponent()}
                </View>
                <View style={styles.rightComponent}>
                    {this.renderRightComponent()}
                </View>
            </View>
        )
    }
}


export default BaseHeader
