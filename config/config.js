import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAwZD2nDEfU2tNEvCM3W_rewfIY0FvX2mo",
    authDomain: "rnmapfire.firebaseapp.com",
    databaseURL: "https://rnmapfire.firebaseio.com",
    projectId: "rnmapfire",
    storageBucket: "rnmapfire.appspot.com",
    messagingSenderId: "953739746934"
  };
  firebase.initializeApp(config)

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
