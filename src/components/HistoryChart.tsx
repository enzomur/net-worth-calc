'use client';

import { NetWorthSnapshot } from '@/types';
import { formatCurrency } from '@/utils/calculations';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

interface Props {
  history: NetWorthSnapshot[];
  onSaveSnapshot: () => void;
}

export default function HistoryChart({ history, onSaveSnapshot }: Props) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <span>📈</span> Monthly Tracking
        </h2>
        <button
          onClick={onSaveSnapshot}
          className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-xs font-medium transition-colors border border-emerald-500/30"
        >
          Save Snapshot
        </button>
      </div>

      {history.length < 2 ? (
        <div className="text-center py-8 text-slate-500 text-sm">
          <p>Save at least 2 monthly snapshots to see your trend chart.</p>
          <p className="text-xs mt-1">Click &quot;Save Snapshot&quot; to record today&apos;s numbers.</p>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                tickFormatter={(v: number) => formatCurrency(v)}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#94a3b8' }}
                formatter={(value) => formatCurrency(value as number)}
              />
              <Legend />
              <Line type="monotone" dataKey="netWorth" name="Net Worth" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="assets" name="Assets" stroke="#34d399" strokeWidth={1} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="liabilities" name="Liabilities" stroke="#f87171" strokeWidth={1} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
