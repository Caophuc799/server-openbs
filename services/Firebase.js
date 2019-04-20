global.XMLHttpRequest = require('xhr2') //workaround for firebase request

import firebase from 'firebase' // 4.8.1
import 'firebase/storage'
import * as admin from 'firebase-admin'

var serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://openbs-chat.firebaseio.com'
})
firebase.initializeApp({
  apiKey: 'AIzaSyDJ0Wmlyv6f1_v0vMQ-1wHE3qn_nK43RwA',
  authDomain: 'openbs-chat.firebaseapp.com',
  databaseURL: 'https://openbs-chat.firebaseio.com',
  projectId: 'openbs-chat',
  storageBucket: 'openbs-chat.appspot.com',
  messagingSenderId: '407267550673'
})
const FirebaseService = {
  init: async () => {
    console.log('Init firebase')
  },
  storage: async (image, name) => {
    const storageRef = firebase.storage().ref()
    const ref = storageRef.child(`images/${name}`)

    return ref.put(image)
  }
}
export default FirebaseService
