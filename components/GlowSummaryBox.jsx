<div className="mt-4 space-y-4 overflow-y-auto max-h-[30vh] border-t border-zinc-700 pt-4">
  {entries.map((entry) => {
    const date = entry.timestamp?.toDate?.();
    const formattedDate = date ? format(date, 'MMM d, yyyy • h:mm a') : '⏳ Timeless';
    return (
      <div key={entry.id} className="bg-zinc-800 p-3 rounded-lg shadow">
        <div className="text-sm text-gray-400 mb-1">🗓 {formattedDate}</div>
        {/* ...rest of entry... */}
      </div>
    );
  })}

  {/* ✅ Only render this once after entries */}
  <GlowSummaryBox entries={entries} />
</div>
