// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhidEIiH8caRo2LS2xSfJuU4YrPpFUtm4",
  authDomain: "foodapp-8e823.firebaseapp.com",
  projectId: "foodapp-8e823",
  storageBucket: "foodapp-8e823.appspot.com",
  messagingSenderId: "288602393956",
  appId: "1:288602393956:web:79fd8250713003b679fe71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);