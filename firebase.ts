
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOuVT7qbMjkzq6lI2mVw4AKpd356DAbpE",
  authDomain: "yousif-b7816.firebaseapp.com",
  projectId: "yousif-b7816",
  storageBucket: "yousif-b7816.firebasestorage.app",
  messagingSenderId: "894679120242",
  appId: "1:894679120242:web:4796b746304f24482c05eb",
  measurementId: "G-4Q2F35B6R1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
