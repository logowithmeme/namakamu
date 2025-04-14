//  firebase.js - Firebase Config 
import { initializeApp } from 'firebase/app'; 
import { getFirestore } from 'firebase/firestore'; 
 
const firebaseConfig = { 
  apiKey: "AIzaSyAUwfgzFm67GdSVF-oX-Dl3L8s4Oy2Jucc", 
  authDomain: "namakamu-1806.firebaseapp.com", 
  projectId: "namakamu-1806", 
  storageBucket: "namakamu-1806.firebasestorage.app", 
  messagingSenderId: "552324677336", 
  appId: "1:552324677336:web:554800d26102754ce561ad" 
}; 
const app = initializeApp(firebaseConfig); 
const db = getFirestore(app); 
export { db }; 