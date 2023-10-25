// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMEpqD3SK18y83nK7biI3IlEfi5UgeROs",
  authDomain: "adminpannel-463e3.firebaseapp.com",
  projectId: "adminpannel-463e3",
  storageBucket: "adminpannel-463e3.appspot.com",
  messagingSenderId: "440544802324",
  appId: "1:440544802324:web:b20a42cf7784b2a58c1901",
  measurementId: "G-1RMC00HJ30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use the getStorage function to get the storage instance
const Firstorage = getStorage(app);

export { Firstorage };