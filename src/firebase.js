// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBRDazMUlJi00jGeGj6LXnEzNowHWFWpUA",
  authDomain: "movie-notice.firebaseapp.com",
  projectId: "movie-notice",
  storageBucket: "movie-notice.appspot.com",
  messagingSenderId: "129378878873",
  appId: "1:129378878873:web:08be8926fd4c26ec7dbf08",
  measurementId: "G-PP5E9KFFEJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
