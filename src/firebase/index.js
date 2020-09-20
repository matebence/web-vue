import firebase from 'firebase/app'
import 'firebase/messaging'

const config = {
  apiKey: 'AIzaSyBVtjaL3GUCkBlaLaXvcZasRtsCpi_jFe0',
  authDomain: 'blesk-microservice-app.firebaseapp.com',
  databaseURL: 'https://blesk-microservice-app.firebaseio.com',
  projectId: 'blesk-microservice-app',
  storageBucket: 'blesk-microservice-app.appspot.com',
  messagingSenderId: '1028412285180',
  appId: '1:1028412285180:web:5366d8f246737b40bd3779',
  measurementId: 'G-X21Q10RRFQ'
}

firebase.initializeApp(config)

const messaging = firebase.messaging()
messaging.requestPermission()
  .then(function () {
    return messaging.getToken()
  })
  .then(function (token) {
    let data = localStorage.getItem(process.env.LOCAL_STORAGE_BROWSER_DATA)

    if (!data) {
      localStorage.setItem(process.env.LOCAL_STORAGE_BROWSER_DATA, JSON.stringify({browserId: token}))
    } else {
      data = JSON.parse(data)
      if (data.browserId === undefined) {
        localStorage.setItem(process.env.LOCAL_STORAGE_BROWSER_DATA, JSON.stringify({...data, browserId: token}))
      }
    }
  })
  .catch(function (err) {
    console.warn(err)
  })
