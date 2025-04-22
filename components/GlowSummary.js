export function generateGlowSummary(entries) {
  if (!entries || entries.length < 3) return null;

  const words = entries.flatMap((entry) =>
    entry.note.toLowerCase().match(/\b\w+\b/g) || []
  );

  const frequencies = {};
  for (const word of words) {
    if (!["the", "and", "you", "but", "with", "this", "that", "are", "have", "for", "your"].includes(word)) {
      frequencies[word] = (frequencies[word] || 0) + 1;
    }
  }

  const topWords = Object.entries(frequencies)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([word]) => word);

  const timestamps = entries
    .map((e) => e.timestamp?.toDate?.())
    .filter(Boolean);
  const eveningCount = timestamps.filter((t) => t.getHours() >= 17).length;
  const timeOfDay =
    eveningCount > timestamps.length / 2 ? "evening" : "daytime";

  const moods = entries.map((e) => e.mood).filter(Boolean);
  const moodFreq = {};
  for (const mood of moods) {
    moodFreq[mood] = (moodFreq[mood] || 0) + 1;
  }
  const topMood =
    Object.entries(moodFreq).sort((a, b) => b[1] - a[1])[0]?.[0] || "🤔 undefined";

  const insight =
    topMood === "😊"
      ? "renewal and clarity through stillness and purpose"
      : topMood === "😔"
      ? "healing and comfort through reflection"
      : topMood === "😡"
      ? "release and transformation through expression"
      : "simplicity and connection";

  return `🔮 Your Reflection Begins to Glow

You've reflected deeply on themes like "${topWords.join(", ")}".
Most of your journaling happens during the ${timeOfDay}.
Your prevailing emotional tone has been ${topMood}.

✨ It seems you're seeking ${insight}.
🌌 Keep going — your reflections are forming a path toward your deeper why.`;
}