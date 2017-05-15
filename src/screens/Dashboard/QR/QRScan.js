import {connect} from 'react-redux'
import {actions} from './reducer'
import React, { Component } from 'react'
import { View, TouchableHighlight, StyleSheet, Modal, Platform, Dimensions, Alert } from 'react-native'
import { DefaultText, LightText, SemiBoldText } from '../../../components/Text'
import { BaseHeader } from '../../../components/Headers'
import Camera from 'react-native-camera'  // ios
import BarcodeScanner from 'react-native-barcodescanner'  // android

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        flex: 1,
        width: 300,
        height: 300,
    },
})

export class QRScan extends Component {
    constructor(props){
        super(props)
        this.state = {
            torchMode: 'off',
        }
        this.codeRead = this.codeRead.bind(this)
    }
    codeRead(e){
        console.log('readed!', arguments)

        if (Platform.OS === 'android'){
            const data = e.data
            const type = e.type
            Alert.alert(
                'QR found',
                data,
                [
                  {text: 'OK'}
                ]
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' ? (
                    <Camera
                      ref={(cam) => {
                        this.camera = cam
                      }}
                      style={styles.preview}
                      aspect={Camera.constants.Aspect.fill}
                      onBarCodeRead={this.codeRead}
                      captureAudio={false}
                      >
                    </Camera>
                ) : (
                    <BarcodeScanner
                        onBarCodeRead={this.codeRead}
                        style={styles.preview}
                        cameraType='back'
                        torchMode={this.state.torchMode}
                    />
                )}
            </View>
        )
    }
}

export default QRScan
