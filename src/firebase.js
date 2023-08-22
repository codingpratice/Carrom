import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAxajzcqAPt36A8h-UrLI5H1RDUv3aY93k",
  authDomain: "carrom-game-99289.firebaseapp.com",
  projectId: "carrom-game-99289",
  storageBucket: "carrom-game-99289.appspot.com",
  messagingSenderId: "926486978984",
  appId: "1:926486978984:web:f26c31d93222dc69413d9d",
  measurementId: "G-GMP09W797E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };