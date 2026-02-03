'use client';

import { useState } from 'react';
import { Liability } from '@/types';
import { formatCurrency, sanitizeNumber } from '@/utils/calculations';

const PRESETS: { name: string; category: Liability['category'] }[] = [
  { name: 'Mortgage', category: 'mortgage' },
  { name: 'Student Loans', category: 'student-loans' },
  { name: 'Credit Card', category: 'credit-cards' },
  { name: 'Auto Loan', category: 'auto' },
  { name: 'Personal Loan', category: 'other' },
  { name: 'Medical Debt', category: 'other' },
];

interface Props {
  liabilities: Liability[];
  totalLiabilities: number;
  onAdd: (liability: Omit<Liability, 'id'>) => void;
  onRemove: (id: string) => void;
}

export default function LiabilityInput({ liabilities, totalLiabilities, onAdd, onRemove }: Props) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState<Liability['category']>('credit-cards');

  function handleAdd() {
    const numVal = sanitizeNumber(value);
    if (!name.trim() || numVal <= 0) return;
    onAdd({ name: name.trim(), value: numVal, category });
    setName('');
    setValue('');
  }

  function handlePreset(preset: typeof PRESETS[number]) {
    setName(preset.name);
    setCategory(preset.category);
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="text-red-400">-</span> Liabilities
          <span className="text-xs text-slate-500 font-normal ml-1">(What you owe)</span>
        </h2>
        <span className="text-red-400 font-mono font-bold">{formatCurrency(totalLiabilities)}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map(p => (
          <button
            key={p.name}
            onClick={() => handlePreset(p)}
            className="text-xs px-3 py-1.5 rounded-full bg-slate-700/50 text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-colors border border-slate-600"
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Liability name"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={100}
          className="flex-1 min-w-0 bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value as Liability['category'])}
          className="shrink-0 bg-slate-900/50 border border-slate-600 rounded-lg px-2 py-2 text-white text-sm focus:border-red-500 focus:outline-none"
        >
          <option value="mortgage">Mortgage</option>
          <option value="student-loans">Student Loans</option>
          <option value="credit-cards">Credit Cards</option>
          <option value="auto">Auto</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          inputMode="decimal"
          placeholder="$0"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          className="shrink-0 w-28 bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm text-right font-mono placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
        />
        <button
          onClick={handleAdd}
          className="shrink-0 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Add
        </button>
      </div>

      {liabilities.length > 0 && (
        <ul className="space-y-2">
          {liabilities.map(liability => (
            <li key={liability.id} className="flex items-center justify-between gap-2 bg-slate-900/30 rounded-lg px-3 py-2">
              <div className="min-w-0 flex-1">
                <span className="text-white text-sm truncate block">{liability.name}</span>
                <span className="text-slate-500 text-xs">{liability.category}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-red-400 font-mono text-sm">{formatCurrency(liability.value)}</span>
                <button onClick={() => onRemove(liability.id)} className="text-slate-500 hover:text-red-400 text-sm">&times;</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
