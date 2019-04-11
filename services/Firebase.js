import firebase from 'firebase' // 4.8.1
// import  firebase from 'firebase/app';
// import 'firebase/firestore'
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
    const storageRef = firebase.storage().ref('images/' + image.name)
    const bucket = admin.storage().bucket('gs://openbs-storage')
    const a = await bucket.upload(image)
    return a
      // Create the file metadata
      var metadata = {
        contentType: 'image/png',
      };
    
      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.put(image);
    
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        function(error) {
          // Errors list: https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
    
            case 'storage/canceled':
              // User canceled the upload
              break;
    
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function() {
          // Upload completed successfully, now we can get the download URL
          var downloadURL = uploadTask.snapshot.downloadURL;
          console.log(downloadURL)
        }
      )
  }
}
export default FirebaseService
