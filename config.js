import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCZ15JKybtXBjmiEbkD482ZpFLu3IRzDoI",
    authDomain: "krish-app-c48d5.firebaseapp.com",
    databaseURL: "https://krish-app-c48d5-default-rtdb.firebaseio.com",
    projectId: "krish-app-c48d5",
    storageBucket: "krish-app-c48d5.appspot.com",
    messagingSenderId: "685727797640",
    appId: "1:685727797640:web:049d85484ead02b9de2a3d"
  };

// Initialize Firebase
if(!firebase.apps.length)
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
