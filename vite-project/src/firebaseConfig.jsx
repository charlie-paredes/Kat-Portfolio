// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9q0nZyuRi3-bPpQ6vL8EL4-LMrWPvMgs",
  authDomain: "kat-portfolio-e96e5.firebaseapp.com",
  projectId: "kat-portfolio-e96e5",
  storageBucket: "kat-portfolio-e96e5.appspot.com",
  messagingSenderId: "448891019623",
  appId: "1:448891019623:web:5f3c5a15d47d63086acfc2",
  measurementId: "G-SC4RBLRCRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };