import { initializeApp } from "firebase/app";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCz1RpCPMesqwVwD5ki916ZsHm9Doi7JtU",
  authDomain: "pgp-cet-portal.firebaseapp.com",
  projectId: "pgp-cet-portal",
  storageBucket: "pgp-cet-portal.firebasestorage.app",
  messagingSenderId: "369834140308",
  appId: "1:369834140308:web:8d9cadb6e095f7575c8a81"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
