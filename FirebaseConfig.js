// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from '@firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAoUrQgrfTkvLpP-pesnSgHBLq5n6Nc8W8",
    authDomain: "marvelous-85a76.firebaseapp.com",
    projectId: "marvelous-85a76",
    storageBucket: "marvelous-85a76.appspot.com",
    messagingSenderId: "961144293889",
    appId: "1:961144293889:web:e6d1f395a2c55a5bf50e00"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
