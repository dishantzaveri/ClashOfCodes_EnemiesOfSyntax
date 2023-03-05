import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmiDm5a0QWAZHgRV3SsDyHc30mHYLYJx8",
  authDomain: "native-a2d6a.firebaseapp.com",
  databaseURL: "https://native-a2d6a-default-rtdb.firebaseio.com",
  projectId: "native-a2d6a",
  storageBucket: "native-a2d6a.appspot.com",
  messagingSenderId: "891619057276",
  appId: "1:891619057276:web:0ba59da13659f9d0ca73f9",
  measurementId: "G-SKQWGZFB1S"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();