// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEaMkFd1j8XOQF4VTtw_vEbtxQ-Tt9dgk",
    authDomain: "reactbubble.firebaseapp.com",
    databaseURL: "https://reactbubble-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "reactbubble",
    storageBucket: "reactbubble.firebasestorage.app",
    messagingSenderId: "841180882476",
    appId: "1:841180882476:web:74064aff9d0f040a9e9389"
  };

// Initialize Firebase
export const firebaseInit = initializeApp(firebaseConfig);