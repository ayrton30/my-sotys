import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl7p_NjGYnRgdOGIjFPX0p1kc8mh7_fSs",
  authDomain: "spotify-36d92.firebaseapp.com",
  projectId: "spotify-36d92",
  storageBucket: "spotify-36d92.appspot.com",
  messagingSenderId: "186698817892",
  appId: "1:186698817892:web:c8c46eb865c04f93c25a71",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
