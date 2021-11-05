import  firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyAF5xl83mUha8oZRrdjqmm1E_z8OAZlrU8",
    authDomain: "nuxt-ts-coffee-app.firebaseapp.com",
    projectId: "nuxt-ts-coffee-app",
    storageBucket: "nuxt-ts-coffee-app.appspot.com",
    messagingSenderId: "297634481830",
    appId: "1:297634481830:web:9d15edf4ac0d3de89d9667",
    measurementId: "G-7H5WW3LDH2"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const googleProvider = new firebase.auth.GoogleAuthProvider()
export { googleProvider }
export const auth = firebase.auth();
export const db = firebase.firestore()
export const Storage = firebase.storage()
export default firebase;