import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyD567V4ES3LrmnJwj4SmPdtYieWptkgusc",
  authDomain: "recipe-135ac.firebaseapp.com",
  databaseURL: "https://recipe-135ac.firebaseio.com",
  projectId: "recipe-135ac",
  storageBucket: "recipe-135ac.appspot.com",
  messagingSenderId: "904967550707",
  appId: "1:904967550707:web:f78742192567b75555e986",
  measurementId: "G-NHF6K537SD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//Initialize storage and firestore service
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export {projectStorage, projectFirestore};
