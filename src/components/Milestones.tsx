'use client';

import { Milestone } from '@/types';
import { formatCurrency } from '@/utils/calculations';

interface Props {
  milestones: Milestone[];
}

export default function Milestones({ milestones }: Props) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>🏆</span> Milestones
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {milestones.map(m => (
          <div
            key={m.label}
            className={`rounded-xl p-3 text-center border transition-all ${
              m.achieved
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-slate-900/30 border-slate-700 opacity-50'
            }`}
          >
            <div className="text-2xl mb-1">{m.icon}</div>
            <div className={`text-xs font-medium ${m.achieved ? 'text-emerald-400' : 'text-slate-500'}`}>
              {m.label}
            </div>
            <div className="text-xs text-slate-500 font-mono">{formatCurrency(m.threshold)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
