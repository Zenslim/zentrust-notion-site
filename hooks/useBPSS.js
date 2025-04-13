// hooks/useBPSS.js

import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

export function useBPSS(uid) {
  const [bp, setBP] = useState({ bio: 0, psycho: 0, social: 0, spiritual: 0 });
  const [ikigai, setIkigai] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    const fetchData = async () => {
      const ref = doc(db, 'users', uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setBP(data.bp || bp);
        setIkigai(data.ikigai || '');
      }
      setLoading(false);
    };

    fetchData();
  }, [uid]);

  const updateBPSS = async (newBP, newIkigai) => {
    const ref = doc(db, 'users', uid);
    await setDoc(ref, { bp: newBP, ikigai: newIkigai }, { merge: true });
    setBP(newBP);
    setIkigai(newIkigai);
  };

  return { bp, ikigai, loading, updateBPSS };
}
