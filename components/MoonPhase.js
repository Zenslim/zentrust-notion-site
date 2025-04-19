export default function MoonPhase() {
  const [phase, setPhase] = useState("");

  useEffect(() => {
    const getPhase = () => {
      const now = new Date();
      const synodicMonth = 29.53058867;
      const newMoon = new Date("2023-01-21T20:53:00Z").getTime(); // Reference new moon date
      const daysSinceNew = (now.getTime() - newMoon) / (1000 * 60 * 60 * 24);
      const currentPhase = daysSinceNew % synodicMonth;
      if (currentPhase < 1.84566) return "🌑 New Moon";
      if (currentPhase < 5.53699) return "🌒 Waxing Crescent";
      if (currentPhase < 9.22831) return "🌓 First Quarter";
      if (currentPhase < 12.91963) return "🌔 Waxing Gibbous";
      if (currentPhase < 16.61096) return "🌕 Full Moon";
      if (currentPhase < 20.30228) return "🌖 Waning Gibbous";
      if (currentPhase < 23.99361) return "🌗 Last Quarter";
      if (currentPhase < 27.68493) return "🌘 Waning Crescent";
      return "🌑 New Moon";
    };
    setPhase(getPhase());
  }, []);

  return <div className="mt-2 text-gray-400 text-sm">Moon phase: {phase}</div>;
}