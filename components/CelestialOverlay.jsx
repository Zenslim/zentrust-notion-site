export default function CelestialOverlay() {
  const [localTime, setLocalTime] = useState("");
  const [locale, setLocale] = useState("");

  useEffect(() => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString([], { month: 'long', day: 'numeric' });
    setLocalTime(`${dateStr}, ${timeStr}`);
    setLocale(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return (
    <div className="mt-2 text-sm text-gray-500">
      {localTime} – {locale.replace("_", " ")}
    </div>
  );
}