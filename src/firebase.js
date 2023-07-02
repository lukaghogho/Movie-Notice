import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBRDazMUlJi00jGeGj6LXnEzNowHWFWpUA",
  authDomain: "movie-notice.firebaseapp.com",
  projectId: "movie-notice",
  storageBucket: "movie-notice.appspot.com",
  messagingSenderId: "129378878873",
  appId: "1:129378878873:web:08be8926fd4c26ec7dbf08",
  measurementId: "G-PP5E9KFFEJ",
  databaseURL:
    "https://movie-notice-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;
