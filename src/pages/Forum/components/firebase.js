// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: YOUR_API_KEY,
//   authDomain: YOUR_AUTH_DOMAIN,
//   projectId: YOUR_PROJECT_ID,
//   storageBucket: YOUR_STORAGE_BUCKET,
//   messagingSenderId: YOUR_MESSAGING_SENDER_ID,
//   appId: YOUR_APP_ID
// };
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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)