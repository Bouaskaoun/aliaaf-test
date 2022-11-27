import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCh-6ftybbJkp1gzcCu6kShUr7EiaPiegk",
  authDomain: "maltimart-67e69.firebaseapp.com",
  projectId: "maltimart-67e69",
  storageBucket: "maltimart-67e69.appspot.com",
  messagingSenderId: "587620914620",
  appId: "1:587620914620:web:87163fb0866db27aa5c7b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;