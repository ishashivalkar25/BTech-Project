// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn-FJu98mjxPehbtoeUNhEKwziwJ-eLOU",
  authDomain: "incomeandexpensetracker-aebb3.firebaseapp.com",
  projectId: "incomeandexpensetracker-aebb3",
  storageBucket: "incomeandexpensetracker-aebb3.appspot.com",
  messagingSenderId: "401740120924",
  appId: "1:401740120924:web:83c729f87c24074139f799",
  measurementId: "G-Y9GFMCPCTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// if(apps.length===0){
//     user_app = initializeApp(firebaseConfig);
//     console.log(app);
// }else {
//     user_app = app();
const auth = getAuth(app);
const db = getFirestore(app);
export { auth,db };