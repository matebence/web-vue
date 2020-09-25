importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');

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

firebase.initializeApp(config);
if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging()
}
