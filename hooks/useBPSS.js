import { useEffect, useState } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { app } from '../firebase';

export function useBPSS(uid) {
  const db = getFirestore(app);
  const [bp, setBP] = useState({ spiritual: 0, psycho: 0, bio: 0, social: 0 });
  const [ikigai, setIkigai] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    const ref = doc(db, 'bp', uid);
    const unsub = onSnapshot(ref, (snap) => {
      const d = snap.data();
      if (d) {
        setBP({
          spiritual: d.spiritual || 0,
          psycho: d.psycho || 0,
          bio: d.bio || 0,
          social: d.social || 0,
        });
        setIkigai(d.ikigai || '');
      }
      setLoading(false);
    });

    return () => unsub();
  }, [uid]);

  return { bp, ikigai, loading };
}