import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMDI0CpkdaXSHJeN_s6aysucHQfQexaEk",
  authDomain: "aliaaf-931b6.firebaseapp.com",
  projectId: "aliaaf-931b6",
  storageBucket: "aliaaf-931b6.appspot.com",
  messagingSenderId: "856058001070",
  appId: "1:856058001070:web:f1ff3cad97efee937b5f3f",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCh-6ftybbJkp1gzcCu6kShUr7EiaPiegk",
//   authDomain: "maltimart-67e69.firebaseapp.com",
//   projectId: "maltimart-67e69",
//   storageBucket: "maltimart-67e69.appspot.com",
//   messagingSenderId: "587620914620",
//   appId: "1:587620914620:web:87163fb0866db27aa5c7b9"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
