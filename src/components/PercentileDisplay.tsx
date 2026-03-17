'use client';

import { PercentileResult } from '@/types';
import { formatCurrency } from '@/utils/calculations';
import { getOrdinalSuffix } from '@/utils/percentile';

interface Props {
  result: PercentileResult;
}

function getPercentileColor(percentile: number): { text: string; bg: string } {
  if (percentile >= 75) {
    return { text: 'text-emerald-400', bg: 'bg-emerald-400' };
  } else if (percentile >= 50) {
    return { text: 'text-green-400', bg: 'bg-green-400' };
  } else if (percentile >= 25) {
    return { text: 'text-yellow-400', bg: 'bg-yellow-400' };
  } else {
    return { text: 'text-orange-400', bg: 'bg-orange-400' };
  }
}

export default function PercentileDisplay({ result }: Props) {
  const { percentile, bracketLabel, medianNetWorth, insight } = result;
  const colors = getPercentileColor(percentile);

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 rounded-2xl p-6">
      <div className="text-center mb-4">
        <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">
          Net Worth Percentile ({bracketLabel})
        </p>
        <p className={`text-4xl font-bold ${colors.text}`}>
          {getOrdinalSuffix(percentile)}
        </p>
        <p className="text-slate-500 text-sm mt-1">percentile</p>
      </div>

      {/* Percentile bar */}
      <div className="mb-4">
        <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
          {/* Median marker */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white/50 z-10"
            style={{ left: '50%' }}
          />
          {/* Percentile position */}
          <div
            className={`h-full rounded-full transition-all duration-700 ${colors.bg}`}
            style={{ width: `${percentile}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>0</span>
          <span className="text-slate-400">Median</span>
          <span>100</span>
        </div>
      </div>

      {/* Median comparison */}
      <div className="text-center mb-4">
        <p className="text-slate-400 text-sm">
          Median for {bracketLabel.toLowerCase()}:
        </p>
        <p className="text-white font-mono text-lg">
          {formatCurrency(medianNetWorth)}
        </p>
      </div>

      {/* Insight */}
      <p className="text-slate-300 text-sm text-center border-t border-slate-700/50 pt-4">
        {insight}
      </p>
    </div>
  );
}
