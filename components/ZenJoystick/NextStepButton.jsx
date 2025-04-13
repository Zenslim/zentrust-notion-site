// components/ZenJoystick/NextStepButton.jsx

import { useEffect, useState } from 'react';

export default function NextStepButton({ bp, ikigai }) {
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    const weakest = Object.entries(bp).sort((a, b) => a[1] - b[1])[0][0];
    const suggestions = {
      bio: "Go for a mindful walk in nature.",
      psycho: "Try writing a journal entry about what excites you.",
      social: "Reach out and check on someone you care about.",
      spiritual: "Reflect on what you'd do even if no one noticed.",
    };
    const ikigaiTail = ikigai ? ` As a "${ikigai}", this aligns your path.` : '';
    setRecommendation(suggestions[weakest] + ikigaiTail);
  }, [bp, ikigai]);

  return (
    <button className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-xl shadow-lg font-medium">
      🌱 Next Step → {recommendation}
    </button>
  );
}
