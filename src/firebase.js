import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAcU0wZM5mGZrAWaccH_pM5FTFk5sH1cFg",
  authDomain: "instagram-clone-react-46439.firebaseapp.com",
  projectId: "instagram-clone-react-46439",
  storageBucket: "instagram-clone-react-46439.appspot.com",
  messagingSenderId: "655924564819",
  appId: "1:655924564819:web:a9d6b98756803e1aa407a6",
  measurementId: "G-YL6DZ4NCVG",
};
// const auth = getAuth();
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export default getFirestore();
