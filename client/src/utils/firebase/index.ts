// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase app configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAqcPmGEyi8UlImW3gi7BnaF4XbGSRN7Qk',
  authDomain: 'coding-beauty-final.firebaseapp.com',
  projectId: 'coding-beauty-final',
  storageBucket: 'coding-beauty-final.appspot.com',
  messagingSenderId: '935205161939',
  appId: '1:935205161939:web:382e8df8fbfb254adbfd26',
};

// Email Link Auth Setting
export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost:3000/',
  // This must be true.
  handleCodeInApp: true,
  // iOS: {
  //   bundleId: 'com.example.ios'
  // },
  // android: {
  //   packageName: 'com.example.android',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
  // dynamicLinkDomain: 'example.page.link'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export tools
export const db = getFirestore(app);
export const auth = getAuth(app);

// apply the default browser preference
auth.useDeviceLanguage();
