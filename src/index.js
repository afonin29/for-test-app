import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getPerformance } from 'firebase/performance';


const firebaseConfig = {
  apiKey: "AIzaSyCntQg5E0XN9W36yhsZmt31jwM6cW-mYGY",
  authDomain: "test-app-d95e2.firebaseapp.com",
  projectId: "test-app-d95e2",
  storageBucket: "test-app-d95e2.appspot.com",
  messagingSenderId: "187520627297",
  appId: "1:187520627297:web:518d3128d2b02073927020"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
