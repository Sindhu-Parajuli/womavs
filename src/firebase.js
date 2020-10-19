import firebase from "firebase";
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCkVnrs2-4u_kJLuJDW1mM5Y5qpgGbCWCY",
    authDomain: "womavs.firebaseapp.com",
    databaseURL: "https://womavs.firebaseio.com",
    projectId: "womavs",
    storageBucket: "womavs.appspot.com",
    messagingSenderId: "700089258084",
    appId: "1:700089258084:web:ba573528ab3a5646f30f71",
    measurementId: "G-MBGGS6NVTM"
};

const fire=firebase.initializeApp(config);
// Get the Storage service for the default app
const defaultStorage = firebase.storage();
export default firebase;