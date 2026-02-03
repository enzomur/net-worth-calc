'use client';

import { Insight } from '@/types';

interface Props {
  insights: Insight[];
}

const icons: Record<Insight['type'], string> = {
  positive: '✅',
  warning: '⚠️',
  info: 'ℹ️',
};

const styles: Record<Insight['type'], string> = {
  positive: 'border-emerald-500/30 bg-emerald-500/5',
  warning: 'border-yellow-500/30 bg-yellow-500/5',
  info: 'border-blue-500/30 bg-blue-500/5',
};

export default function Insights({ insights }: Props) {
  if (insights.length === 0) return null;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>💡</span> Insights
      </h2>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <div key={i} className={`border rounded-lg p-3 ${styles[insight.type]}`}>
            <span className="mr-2">{icons[insight.type]}</span>
            <span className="text-slate-300 text-sm">{insight.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
