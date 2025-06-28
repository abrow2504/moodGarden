// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNULquji5hL5jRva6dRX8bz8Wsh6ioK8E",
  authDomain: "gothicmoodgarden.firebaseapp.com",
  projectId: "gothicmoodgarden",
  storageBucket: "gothicmoodgarden.firebasestorage.app",
  messagingSenderId: "207951591949",
  appId: "1:207951591949:web:cc1e2d3ae4f2e56835b344"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // 👈 Add this to use Firestore elsewhere
