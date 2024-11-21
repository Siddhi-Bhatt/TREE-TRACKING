// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import {getauth} from "firebase/auth";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS3qSZLv7F0MLqJ8qL9eJz1d1-IgMb3X8",
  authDomain: "ecocredit-aa0d6/database/ecocredit-aa0d6-default-rtdb/data/~2F",
  projectId: "ecocredit-aa0d6",
  storageBucket: "ecocredit-aa0d6.firebasestorage.app",
  messagingSenderId: "537761383308",
  appId: "1:537761383308:web:65bf8cfbfbb2afded28ca9",
  measurementId: "G-FNVFGSJGES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);