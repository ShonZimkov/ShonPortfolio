
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from '@firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAmUtFcReVkRRfYpICsusFAWcZZWIAIfCg",
  authDomain: "shonportfolio.firebaseapp.com",
  projectId: "shonportfolio",
  storageBucket: "shonportfolio.appspot.com",
  messagingSenderId: "337271673021",
  appId: "1:337271673021:web:39484ce6421b272b9a27d4",
  measurementId: "G-2J7LXVWVJB"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);


export const signInWithGoogle = () => signInWithPopup(auth, provider);