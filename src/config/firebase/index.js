import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBy30flX9IkONU616kSVh58Wdbp0Ne92-c",
    authDomain: "react-firebase-829b8.firebaseapp.com",
    databaseURL: "https://react-firebase-829b8.firebaseio.com",
    projectId: "react-firebase-829b8",
    storageBucket: "react-firebase-829b8.appspot.com",
    messagingSenderId: "306814819570",
    appId: "1:306814819570:web:4fee8cd993c290475fc46b",
    measurementId: "G-FJRR28P7KE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

  export default firebase;