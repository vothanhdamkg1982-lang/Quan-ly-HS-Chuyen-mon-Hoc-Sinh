// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyQwhUj2sHgz_ShNJjkePs-6CJeey0IpU",
  authDomain: "watchful-scope-458105-u1.firebaseapp.com",
  projectId: "watchful-scope-458105-u1",
  storageBucket: "watchful-scope-458105-u1.firebasestorage.app",
  messagingSenderId: "87169120468",
  appId: "1:87169120468:web:c1f601cefddf3f51e0a341",
  measurementId: "G-G07G9THRYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);