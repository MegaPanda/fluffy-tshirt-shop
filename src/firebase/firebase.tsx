import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBVppX-va9iDLAXM95NSoom0aOFzP5TKyw",
    authDomain: "react-shopping-site-742ca.firebaseapp.com",
    databaseURL: "https://react-shopping-site-742ca-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-shopping-site-742ca",
    storageBucket: "react-shopping-site-742ca.appspot.com",
    messagingSenderId: "1064078219486",
    appId: "1:1064078219486:web:a9c240b39152aeaac1ca4f",
    measurementId: "G-Z9N21SF45G"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  export const firebaseDatabase = getDatabase(firebaseApp);