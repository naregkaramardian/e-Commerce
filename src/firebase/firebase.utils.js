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

export const CreateUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const {
            displayName,
            email
        } = userAuth
        const CreatedAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                CreatedAt,
                ...additionalData
            })
        } catch (error) {
            console.log("error creating the user", error.message);

        }
    }
    return userRef ;
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