// components/SignIn.js

import { signInWithPopup } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, provider, db } from '../lib/firebase';

export default function SignIn() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      // Create or update user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        lastLogin: serverTimestamp(),
      }, { merge: true });

      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <button
        onClick={handleLogin}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-md text-lg transition"
      >
        Sign in with Google
      </button>
    </div>
  );
}