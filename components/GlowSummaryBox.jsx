import { generateGlowSummary } from "./GlowSummary";

export default function GlowSummaryBox({ entries }) {
  const summary = generateGlowSummary(entries);
  if (!summary) return null;

  return (
    <div className="mt-6 bg-indigo-950 text-indigo-100 p-4 rounded-xl shadow-inner border border-indigo-700 whitespace-pre-wrap text-sm leading-relaxed max-h-[180px] overflow-y-auto">
      {summary}
    </div>
  );
}
