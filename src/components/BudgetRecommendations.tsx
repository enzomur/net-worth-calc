'use client';

import { getBudgetRecommendations } from '@/utils/calculations';

interface Props {
  totalAssets: number;
  totalLiabilities: number;
}

export default function BudgetRecommendations({ totalAssets, totalLiabilities }: Props) {
  const recs = getBudgetRecommendations(totalAssets, totalLiabilities);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>📋</span> Budget Recommendations
      </h2>
      <ul className="space-y-3">
        {recs.map((rec, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
            <span className="text-emerald-400 mt-0.5 shrink-0">&#9679;</span>
            <span>{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
