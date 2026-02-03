'use client';

import { formatCurrency } from '@/utils/calculations';
import { HealthLevel } from '@/types';

interface Props {
  netWorth: number;
  totalAssets: number;
  totalLiabilities: number;
  healthLevel: HealthLevel;
  healthPercent: number;
}

const healthColors: Record<HealthLevel, string> = {
  excellent: 'text-emerald-400',
  good: 'text-green-400',
  fair: 'text-yellow-400',
  poor: 'text-orange-400',
  critical: 'text-red-400',
};

const healthBgColors: Record<HealthLevel, string> = {
  excellent: 'bg-emerald-400',
  good: 'bg-green-400',
  fair: 'bg-yellow-400',
  poor: 'bg-orange-400',
  critical: 'bg-red-400',
};

export default function NetWorthDisplay({ netWorth, totalAssets, totalLiabilities, healthLevel, healthPercent }: Props) {
  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 rounded-2xl p-8 text-center">
      <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Your Net Worth</p>
      <p className={`text-4xl md:text-5xl font-bold font-mono mb-4 ${netWorth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
        {formatCurrency(netWorth)}
      </p>

      <div className="flex justify-center gap-8 mb-6">
        <div>
          <p className="text-slate-500 text-xs uppercase">Assets</p>
          <p className="text-emerald-400 font-mono">{formatCurrency(totalAssets)}</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs uppercase">Liabilities</p>
          <p className="text-red-400 font-mono">{formatCurrency(totalLiabilities)}</p>
        </div>
      </div>

      {/* Health meter */}
      <div className="max-w-xs mx-auto">
        <div className="flex justify-between items-center mb-1">
          <span className="text-slate-400 text-xs">Financial Health</span>
          <span className={`text-xs font-semibold capitalize ${healthColors[healthLevel]}`}>{healthLevel}</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${healthBgColors[healthLevel]}`}
            style={{ width: `${healthPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
