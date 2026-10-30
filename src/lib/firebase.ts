import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBh4JtqJLTXSYwIcIkFhO0UAuKOfWQabZ",
  authDomain: "sauti-poll.firebaseapp.com",
  databaseURL: "https://sauti-poll-default-rtdb.firebaseio.com",
  projectId: "sauti-poll",
  storageBucket: "sauti-poll.firebasestorage.app",
  messagingSenderId: "666202448055",
  appId: "1:666202448055:web:cdb0c823f08e790c45ad",
  measurementId: "G-K0H4CEZKCD"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
