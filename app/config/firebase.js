import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDdf_PzblrqbE23ZtmdF00OsmnvXSn07cw",
    authDomain: "gymbuddy-test.firebaseapp.com",
    databaseURL: "https://gymbuddy-test.firebaseio.com",
    projectId: "gymbuddy-test",
    storageBucket: "gymbuddy-test.appspot.com",
    messagingSenderId: "392541421543"
}

export default firebase

export const firebaseApp = firebase.initializeApp(firebaseConfig)

export const firebaseDB = firebaseApp.database().ref()

export const firebaseStorage = firebaseApp.storage()