import React, { Component, PropTypes } from 'react'
import {
    View,
    Text,
    TouchableHighlight,
    Image,
    StyleSheet
} from 'react-native'
import {
    Link,
    AnimatedHeader,
    Pop
} from 'react-router-native'
import Octicons from 'react-native-vector-icons/Octicons'
import { colors } from '../../styles/global'
import { DefaultText, LightText } from '../Text'


const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    colContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
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
    backButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
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
        backgroundColor: colors.primaryBg,
        borderColor: colors.primaryBg,
        borderWidth: 0,
        elevation: 0,
    }
})

const headerConstructor = (cfg) => {
    const config = {
        cancelText: 'Cancel',
        back: true,
        ...cfg
    }
    class Header extends Component {
        static contextTypes = {
            showMenu: PropTypes.func,
        };

        componentWillMount() {
            this.renderLeftComponent = this.renderLeftComponent.bind(this)
            this.renderRightComponent = this.renderRightComponent.bind(this)
            this.renderTitleComponent = this.renderTitleComponent.bind(this)
        }

        renderLeftComponent() {
            if (config.back === true){
                return (
                    <Pop style={styles.backButton}>
                        <View style={styles.backButtonCont}>
                            <Octicons name='chevron-left' style={styles.backChevron} />
                            <DefaultText style={styles.backButtonText}>Back</DefaultText>
                        </View>
                    </Pop>
                )
            }
            if (config.leftCancel === true){
                return (
                    <Pop style={styles.backButton}>
                        <View style={styles.backButtonCont}>
                            <DefaultText style={styles.backButtonText}>{config.cancelText}</DefaultText>
                        </View>
                    </Pop>
                )
            }
            return null
        }
        renderRightComponent() {
            if (config.cancel === true){
                return (
                    <Pop style={styles.backButton}>
                        <View style={styles.backButtonCont}>
                            <DefaultText style={styles.backButtonText}>{config.cancelText}</DefaultText>
                        </View>
                    </Pop>
                )
            }
            return null
        }

        renderTitleComponent() {
            if (config.title){
                return (
                    <View style={styles.colContainer}>
                        <DefaultText style={styles.titleText}>{config.title}</DefaultText>
                    </View>
                )
            }
            return null
        }
        render() {
            return (
                <AnimatedHeader
                    style={styles.homeHeader}
                    {...this.props}
                    renderRightComponent={this.renderRightComponent}
                    renderLeftComponent={this.renderLeftComponent}
                    renderTitleComponent={this.renderTitleComponent}
                />
            )
        }
    }
    return Header
}

export default headerConstructor
