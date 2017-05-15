import jwt from 'react-native-jwt'
import CryptoJS from 'crypto-js'
import { Alert, Platform } from 'react-native'

const CryptoJSAesJson = {
    stringify: function (cipherParams) {
        var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)}
        if (cipherParams.iv) j.iv = cipherParams.iv.toString()
        if (cipherParams.salt) j.s = cipherParams.salt.toString()
        return JSON.stringify(j)
    },
    parse: function (jsonStr) {
        var j = JSON.parse(jsonStr)
        var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)})
        if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
        if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
        return cipherParams
    }
}

const jwtSecret = 'zAduKuMDiuxu0CRA6wy5VqZj'
const aesSecret = 'zAduKuMDiuxu0CRA6wy5VqZjdSw10eQ2'
const baseURL = 'http://52.74.148.229'

export default class apiClient {
    constructor(token){
        this.authenticated = false
        if (token){
            this.authenticated = true
            this.token = token
        }
    }

    getUrl(url){
        return baseURL + url
    }

    decodeJWT(token){
        // WORKAROUND: https://github.com/StanScates/react-native-jwt/issues/4
        //fix ios
        if (Platform.OS === 'ios'){
            const tmp = token.slice(-3)
            token = token + tmp + 'AAAAA'
        }

        const data = jwt.decode(token, jwtSecret)
        return data
    }

    decodeAES(encoded){
        let dec = CryptoJS.AES.decrypt(
            encoded,
            aesSecret,
            {format: CryptoJSAesJson}
        ).toString(CryptoJS.enc.Utf8)
        return JSON.parse(dec)
    }

    post(url, initialData) {
        // auth
        let data = initialData || {}
        if (this.authenticated){
            data = {token: this.token, ...data}
        }
        // encrypt
        let dataTxt = JSON.stringify(data)
        let encrypted = CryptoJS.AES.encrypt(dataTxt, aesSecret, {format: CryptoJSAesJson}).toString()
        let payload = {
            exp: (Date.now() / 1000) + 30,
            lg: 'en',
            data: encrypted
        }

        let token = jwt.encode(payload, jwtSecret)

        // WORKAROUND: https://github.com/StanScates/react-native-jwt/issues/4
        // ensure the signature has the correct lenght on IOS
        if (Platform.OS === 'ios'){
            token = token.split('.')
            signature = token[2]
            if (signature.length > 43){
                signature = signature.slice(0, -8)
            }
            token[2] = signature
            token = token.join('.')
        }

        return fetch(this.getUrl(url), {
            method: 'POST',
            body: token
        })
        .then(response => response.text())
        .then(rawdata => {
            try {
                let data = this.decodeJWT(rawdata)
                if (data.status && data.data){
                    data.data = this.decodeAES(data.data)
                }
                return data
            } catch(e) {
                return {
                    status: 0,
                    message: rawdata
                }
            }
        })
    }


    postData(endpoint, data, userConf){
        const conf = {
            errAlertTitle: 'ERROR',
            showSuccessAlert: false,
            errButtons: [
                {text: 'OK', onPress: nope => nope},
            ],
            ...userConf,
        }
        return this.post(endpoint, data).catch(err => {
            console.log('ERROR', err)
        }).then(data => {
            if (data.data){
                return data.data
            } else if (data.status){
                if (data.message && conf.showSuccessAlert) {
                    Alert.alert(
                      data.message,
                      '',
                      conf.errButtons,
                    )
                }
                return {status: data.status}
            } else if (data.message) {
                Alert.alert(
                  conf.errAlertTitle,
                  data.message,
                  conf.errButtons,
                )
            } else {
                Alert.alert(
                  conf.errAlertTitle,
                  'Please try again',
                  conf.errButtons,
                )
            }
        })
    }

    // actually this does a post
    getData(endpoint, data, userConf){
        return this.postData(endpoint, data, userConf)
    }
}
