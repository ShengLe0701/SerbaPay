import {StyleSheet} from 'react-native'
import { colors } from '../../../styles/global'


const pageStyles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    trans: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        paddingTop: 15,
        paddingRight: 20,
        paddingBottom: 15,
        paddingLeft: 20,
    },
    transDate: {
        color: colors.inactive,
        position: 'absolute',
        left: 20,
        top: 15,
    },
    transNo: {
    },
    transAmmount: {
        color: 'green',
        position: 'absolute',
        right: 20,
        top: 15,
    },
    transAmmount2: {
        color: 'red',
    }
})

export default pageStyles
