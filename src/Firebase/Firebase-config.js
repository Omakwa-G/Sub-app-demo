// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1SZHlmete-klfTqbOsZs2LlWCpyt01a0",
  authDomain: "sub-app-c7221.firebaseapp.com",
  projectId: "sub-app-c7221",
  storageBucket: "sub-app-c7221.firebasestorage.app",
  messagingSenderId: "90442077270",
  appId: "1:90442077270:web:c9acdf55d8c42f878b17f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app); 
export const provider = new GoogleAuthProvider(); 
export default app;