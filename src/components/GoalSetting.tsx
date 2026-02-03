'use client';

import { useState } from 'react';
import { Goal } from '@/types';
import { formatCurrency, getGoalProgress, getMonthlyTargetSavings, sanitizeNumber } from '@/utils/calculations';

interface Props {
  goal: Goal | null;
  netWorth: number;
  onSetGoal: (goal: Goal | null) => void;
}

export default function GoalSetting({ goal, netWorth, onSetGoal }: Props) {
  const [editing, setEditing] = useState(false);
  const [targetStr, setTargetStr] = useState(goal?.targetNetWorth?.toString() ?? '');
  const [deadline, setDeadline] = useState(goal?.deadline ?? '');

  function handleSave() {
    const target = sanitizeNumber(targetStr);
    if (target <= 0 || !deadline) return;
    onSetGoal({ targetNetWorth: target, deadline, createdAt: new Date().toISOString() });
    setEditing(false);
  }

  if (!goal && !editing) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <span>🎯</span> Set a Goal
        </h2>
        <p className="text-slate-400 text-sm mb-4">Set a target net worth and deadline to track your progress.</p>
        <button
          onClick={() => setEditing(true)}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Set Goal
        </button>
      </div>
    );
  }

  if (editing) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>🎯</span> Set Your Goal
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            inputMode="decimal"
            placeholder="Target net worth"
            value={targetStr}
            onChange={e => setTargetStr(e.target.value)}
            className="flex-1 bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm font-mono placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
          />
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className="bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors">
            Save
          </button>
          <button onClick={() => setEditing(false)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Show goal progress
  const progress = getGoalProgress(goal!, netWorth);
  const monthly = getMonthlyTargetSavings(goal!, netWorth);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <span>🎯</span> Goal Progress
        </h2>
        <div className="flex gap-2">
          <button onClick={() => { setTargetStr(goal!.targetNetWorth.toString()); setDeadline(goal!.deadline); setEditing(true); }} className="text-xs text-slate-400 hover:text-white">Edit</button>
          <button onClick={() => onSetGoal(null)} className="text-xs text-slate-400 hover:text-red-400">Remove</button>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-400">Target: {formatCurrency(goal!.targetNetWorth)}</span>
          <span className="text-slate-400">by {new Date(goal!.deadline).toLocaleDateString()}</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-1">{progress.toFixed(1)}% complete</p>
      </div>

      {monthly > 0 && (
        <p className="text-sm text-slate-400">
          Save <span className="text-emerald-400 font-mono font-medium">{formatCurrency(monthly)}</span>/month to reach your goal.
        </p>
      )}
    </div>
  );
}
