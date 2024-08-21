import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA2GHgPlH8jTli_7HGe9nLySebPPgv_n2M",
    authDomain: "cool-6f593.firebaseapp.com",
    projectId: "cool-6f593",
    storageBucket: "cool-6f593.appspot.com",
    messagingSenderId: "554312178402",
    appId: "1:554312178402:web:cf8965d66e306da8111cbb"
};

firebase.initializeApp(firebaseConfig);

export default firebase;