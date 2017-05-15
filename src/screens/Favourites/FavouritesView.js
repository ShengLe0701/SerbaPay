import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { DefaultText, LinkText } from '../../components/Text'
import { colors, styles } from '../../styles/global'
import { Alert } from '../../components/Alert'

export class FavouritesView extends Component {
    static propTypes = {
        gotoProfile: React.PropTypes.func.isRequired,
    }
    render() {
        return (
            <View style={pageStyles.page}>
                <Text>
                    Favourites
                </Text>
            </View>
        )
    }
}


const pageStyles = StyleSheet.create({
    page: {},
})

export default FavouritesView
