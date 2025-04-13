// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD5...real_key',
  authDomain: 'zentrust-e647d.firebaseapp.com',
  projectId: 'zentrust-e647d',
  storageBucket: 'zentrust-e647d.appspot.com',
  messagingSenderId: '7350...',
  appId: '1:7350...:web:abc123def456',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
