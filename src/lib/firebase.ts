import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfz6y_fXD5UmwbvqsiNlSgmSQneZ9JjUM",
  authDomain: "kemenag-b8baf.firebaseapp.com",
  projectId: "kemenag-b8baf",
  storageBucket: "kemenag-b8baf.firebasestorage.app",
  messagingSenderId: "795584468609",
  appId: "1:795584468609:web:4bbf7a2ab900b555fa5f80",
  measurementId: "G-YBJZC2038Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
