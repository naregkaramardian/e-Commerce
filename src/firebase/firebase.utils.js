import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC9ofnX0PXN34VnC1H3yYDIGJO4Zy501mo",
    authDomain: "e-commerce-eefbd.firebaseapp.com",
    databaseURL: "https://e-commerce-eefbd.firebaseio.com",
    projectId: "e-commerce-eefbd",
    storageBucket: "e-commerce-eefbd.appspot.com",
    messagingSenderId: "115011146253",
    appId: "1:115011146253:web:92e908602d7fa2cab1fb44",
    measurementId: "G-7DN4XCQ94S"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;