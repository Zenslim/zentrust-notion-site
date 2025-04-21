// components/ZenJoystick/ReflectionGlow.jsx
import { useEffect, useState } from 'react';

const analyzeReflections = (entries) => {
  const texts = entries.map(e => e.note).join(' ').toLowerCase();
  const words = texts.split(/\W+/);
  const freq = {};
  words.forEach(word => {
    if (word.length > 2) freq[word] = (freq[word] || 0) + 1;
  });

  const topWords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([word]) => word);

  const tone = entries.filter(e => e.mood).map(e => e.mood).sort((a, b) => (
    entries.filter(x => x.mood === b).length - entries.filter(x => x.mood === a).length
  ))[0] || '🤔';

  const eveningCount = entries.filter(e => {
    const hour = e.timestamp?.toDate?.().getHours?.() || 0;
    return hour >= 18;
  }).length;

  return {
    summary: `You've reflected deeply on themes like "${topWords.join(', ')}".`,
    timeHint: eveningCount > entries.length / 2 ? 'Most of your journaling happens during the evenings.' : '',
    toneHint: `Your prevailing emotional tone has been ${tone}.`,
    insight: `✨ It seems you're seeking clarity through ${topWords.includes('gratitude') ? 'gratitude' : 'simplicity and connection'}.`,
    encouragement: `🌌 Keep going — your reflections are forming a path toward your deeper why.`,
  };
};

export default function ReflectionGlow({ entries }) {
  const [insight, setInsight] = useState(null);

  useEffect(() => {
    if (entries.length >= 3) {
      const result = analyzeReflections(entries);
      setInsight(result);
    }
  }, [entries]);

  if (!insight) return null;

  return (
    <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-indigo-800 to-purple-900 text-white shadow-xl animate-fade-in">
      <h3 className="text-xl font-semibold mb-2">🔮 Your Reflection Begins to Glow</h3>
      <p className="text-sm text-blue-100 mb-1">{insight.summary}</p>
      {insight.timeHint && <p className="text-sm text-blue-200 mb-1">{insight.timeHint}</p>}
      <p className="text-sm text-blue-200 mb-1">{insight.toneHint}</p>
      <p className="text-sm text-emerald-200 mb-1">{insight.insight}</p>
      <p className="text-sm text-yellow-300 italic">{insight.encouragement}</p>
    </div>
  );
}
