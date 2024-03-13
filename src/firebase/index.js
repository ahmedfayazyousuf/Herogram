// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app"
import {getStorage} from "firebase/storage"
import "firebase/compat/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF70KyYslhA3zGFzbnzDMbLj5xY3x8hGw",
  authDomain: "hero-9f026.firebaseapp.com",
  projectId: "hero-9f026",
  storageBucket: "hero-9f026.appspot.com",
  messagingSenderId: "856557677765",
  appId: "1:856557677765:web:0c5f4e74be4bafe86cd4ac",
  measurementId: "G-FTHX5PDH11"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default firebase; 
export const storage = getStorage(app);
