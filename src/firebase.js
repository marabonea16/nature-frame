// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSEYQqP9OmriVVXVIALwAVvI-mNv97vJg",
  authDomain: "online-store-70c13.firebaseapp.com",
  projectId: "online-store-70c13",
  storageBucket: "online-store-70c13.firebasestorage.app",
  messagingSenderId: "804801797496",
  appId: "1:804801797496:web:39d2bbfbb4c0bacab7fc8d",
  measurementId: "G-TV40VVRWLP"
};

// Initialize Firebase
getAnalytics(app);
initializeApp(firebaseConfig);
export const db = getFirestore();
