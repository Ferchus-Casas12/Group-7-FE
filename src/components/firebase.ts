// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config (find this in your Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyD3Vr8hFYomcb_r59zmPNN9E4ccEs-w9v4",
  authDomain: "coursemanagementsystem-8d873.firebaseapp.com",
  projectId: "coursemanagementsystem-8d873",
  storageBucket: "coursemanagementsystem-8d873.firebasestorage.app",
  messagingSenderId: "912284539198",
  appId: "1:912284539198:web:9e2d86f4ae3f1de7d3346f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth(app);

export { auth };
