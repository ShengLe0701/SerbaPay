/* @noflow */
import React, {
  Component,
} from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import {
  withRouter
} from 'react-router-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {colors} from '../../styles/global'

const styles = StyleSheet.create({
    master: {
        flex: 1,
        backgroundColor: 'white',
    },
    body: {
        flex: 1,
        overflow: 'hidden',
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: colors.tabsBg,
        height: 60,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.color
    },
    tabLink: {
        flex: 1,
    },
    tabLinkText: {
        fontSize: 12,
    },
    tabActiveLinkText: {
        color: colors.primary
    },
    tabLinkContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.tabsBg
    },
})

const normalStyle = styles.tabLinkText
const normalColor = colors.inactive
const activeColor = colors.primary
const activeStyle = [styles.tabLinkText, styles.tabActiveLinkText]


class Tab extends Component {
    constructor(props) {
        super(props)
        this.go = this.go.bind(this)
    }
    go(){
        this.props.router.push(this.props.to)
    }
    render () {
        const {router, to, icon, text} = this.props
        const active = router.isActive(to)

        return (
            <TouchableHighlight
                style={styles.tabLink}
                onPress={this.go}
            >
                <View style={styles.tabLinkContainer}>
                    <FontAwesome name={icon} size={16} color={active ? activeColor : normalColor}/>
                    <Text style={active ? activeStyle : normalStyle}>{text}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const Tabs = (props) => {
    const { router } = props
    return (
        <View style={styles.tabs}>
            <Tab to='/dashboard' router={router} text='My App' icon='shield' />
            <Tab to='/deposit' router={router} text='Deposit' icon='money' />
            <Tab to='/favourites' router={router} text='Favourite' icon='star' />
            <Tab to='/profile' router={router} text='My Account' icon='user' />
        </View>
)}

class TabsOverlay extends Component {
    render() {
        const {router, ...props} = this.props
        return (
            <View style={styles.master}>
                <View style={styles.body}>
                    {props.children}
                    <Tabs router={router}/>
                </View>
            </View>
        )
    }
}

export default withRouter(TabsOverlay)
