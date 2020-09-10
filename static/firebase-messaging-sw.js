importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');

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

firebase.initializeApp(config);
firebase.messaging();
