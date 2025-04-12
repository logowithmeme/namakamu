// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// ✅ Correct Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAtsaaia80YJvDjl8dqneWhWD9TbLDEEjw",
  authDomain: "namakamu-ad3f9.firebaseapp.com",
  databaseURL: "https://namakamu-ad3f9-default-rtdb.firebaseio.com",
  projectId: "namakamu-ad3f9",
  storageBucket: "namakamu-ad3f9.appspot.com",
  messagingSenderId: "471475940832",
  appId: "1:471475940832:web:b5ec433f8d077df7868f85"
};

// ✅ Initialize Firebase and export both app and db
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };
