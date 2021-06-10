import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAnbe7-3MU4qS4NLVVVBSxwI_hCfT4GLG0",
    authDomain: "my-app-30b04.firebaseapp.com",
    databaseURL: "https://my-app-30b04-default-rtdb.firebaseio.com",
    projectId: "my-app-30b04",
    storageBucket: "my-app-30b04.appspot.com",
    messagingSenderId: "751010698278",
    appId: "1:751010698278:web:7bc9b7b79e4a13dbc982e7"
  };

// Initialize Firebase
if(!firebase.apps.length)
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
