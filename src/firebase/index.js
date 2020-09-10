import firebase from 'firebase/app'
import 'firebase/messaging'

const config = {
  apiKey: 'AIzaSyCgMf5CKqxAITej7VpszC88htvWcwima9Y',
  appId: '1:692767479064:web:bd4cbc416f9b5d3e947a6d',
  databaseURL: 'https://app-blesk.firebaseio.com',
  authDomain: 'app-blesk.firebaseapp.com',
  storageBucket: 'app-blesk.appspot.com',
  messagingSenderId: '692767479064',
  measurementId: 'G-DGH0YPW1F0',
  projectId: 'app-blesk'
}

firebase.initializeApp(config)

const messaging = firebase.messaging()
messaging.requestPermission()
  .then(function () {
    return messaging.getToken()
  })
  .then(function (token) {
    let data = localStorage.getItem('browserData')

    if (!data) {
      localStorage.setItem('browserData', JSON.stringify({browserId: token}))
    } else {
      data = JSON.parse(data)
      if (data.browserId === undefined) {
        localStorage.setItem('browserData', JSON.stringify({...data, browserId: token}))
      }
    }
  })
  .catch(function (err) {
    console.warn(err)
  })
