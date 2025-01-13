// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL3YYv6bYP_ERCxf1A3SSdp0pYhBIXkdg",
  authDomain: "mymarkettask.firebaseapp.com",
  projectId: "mymarkettask",
  storageBucket: "mymarkettask.firebasestorage.app",
  messagingSenderId: "835624710199",
  appId: "1:835624710199:web:1e29c4604029e835ef4fb2",
  measurementId: "G-C72NCQG988",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
