// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase app configuration
// It is meant to be public, no need to be protected
const firebaseConfig = {
  apiKey: 'AIzaSyAqcPmGEyi8UlImW3gi7BnaF4XbGSRN7Qk',
  authDomain: 'coding-beauty-final.firebaseapp.com',
  projectId: 'coding-beauty-final',
  storageBucket: 'coding-beauty-final.appspot.com',
  messagingSenderId: '935205161939',
  appId: '1:935205161939:web:382e8df8fbfb254adbfd26',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export tools
export const db = getFirestore(app);
export const auth = getAuth(app);

// apply the default browser preference
auth.useDeviceLanguage();
