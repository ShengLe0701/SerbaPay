import { Platform, StyleSheet, Dimensions } from 'react-native'

export const sizes = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    headerHeight: 52,
    alertHeight: 30,
    tabsHeight: 60,
    iosPaddingAdjust: Platform.OS === 'ios' ? 20 : 0,
}
export const colors = {
    primary: '#1375bc',
    primaryBg: '#26A2CE',
    primaryText: '#ffffff',
    warning: '#F89A36',
    warningTxt: '#ffffff',
    danger: '#ED1F24',
    bg: '#F4F4F6',
    tabsBg: '#EFEFEF',
    color: '#222',
    inactive: '#929292',
    border: '#C1C1C1',
}

export const styles = StyleSheet.create({
    bluePage: {
        backgroundColor: colors.primary
    },
    bluePageText: {
        color: colors.primaryText
    },
    defaultView: {
        backgroundColor: colors.bg
    },
    defaultText: {
        fontFamily: 'OpenSans',
        color: '#222'
    }
})

export const textStyles = StyleSheet.create({
    link: {
        textDecorationLine: 'underline',
        color: colors.primary
    }
})

export const navBarStyles = StyleSheet.create({
    defaultTitle: {
        fontSize: 16,
        fontFamily: 'OpenSans-Light',
        textAlign: 'left',
        paddingLeft: 34,
        color: colors.primary,
    },
    bluePageTitle: {
        color: colors.primaryText,
    },
    defaultBar: {
        borderBottomWidth: 0
    },
    bluePage: {
        backgroundColor: colors.primaryBg,
        borderBottomWidth: 0
    }
})
