// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl1Sh1bsCHAL0I7_U3r3NN8y9loy2iNJs",
  authDomain: "stack-overflow-clone-f0eed.firebaseapp.com",
  projectId: "stack-overflow-clone-f0eed",
  storageBucket: "stack-overflow-clone-f0eed.appspot.com",
  messagingSenderId: "321270475154",
  appId: "1:321270475154:web:e8afbfcac9766973b6b94b",
  measurementId: "G-CM0WEZ48E6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider()