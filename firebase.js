// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4_QYADJ8WRkeaCwksRmy0NlG2eJwBETM",
  authDomain: "project-2a12d00d-24d8-478a-97d.firebaseapp.com",
  projectId: "project-2a12d00d-24d8-478a-97d",
  storageBucket: "project-2a12d00d-24d8-478a-97d.firebasestorage.app",
  messagingSenderId: "51855577331",
  appId: "1:51855577331:web:741727d40ccae39ec56786",
  measurementId: "G-QGRN1LCHM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);