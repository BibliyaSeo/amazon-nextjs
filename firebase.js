import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBk-90K9T5DswDGA3zre8lDOHw4r9IcVkM",
  authDomain: "nextjs-654c2.firebaseapp.com",
  projectId: "nextjs-654c2",
  storageBucket: "nextjs-654c2.appspot.com",
  messagingSenderId: "369926314070",
  appId: "1:369926314070:web:6b40d209223f760dbc83f7",
};

const app = initializeApp(firebaseConfig);
// const app = !firebase.apps.length ? initializeApp(firebaseConfig) : firebase.app();

// const db = app.firestore();
const db = getFirestore(app);

export default db;
