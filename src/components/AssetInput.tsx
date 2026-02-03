'use client';

import { useState } from 'react';
import { Asset } from '@/types';
import { formatCurrency, sanitizeNumber } from '@/utils/calculations';

const PRESETS: { name: string; category: Asset['category'] }[] = [
  { name: 'Checking Account', category: 'cash' },
  { name: 'Savings Account', category: 'cash' },
  { name: '401(k)', category: 'investments' },
  { name: 'Roth IRA', category: 'investments' },
  { name: 'Brokerage Account', category: 'investments' },
  { name: 'Primary Home', category: 'property' },
  { name: 'Vehicle', category: 'other' },
  { name: 'Crypto', category: 'investments' },
];

interface Props {
  assets: Asset[];
  totalAssets: number;
  onAdd: (asset: Omit<Asset, 'id'>) => void;
  onRemove: (id: string) => void;
}

export default function AssetInput({ assets, totalAssets, onAdd, onRemove }: Props) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState<Asset['category']>('cash');

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
          <span className="text-emerald-400">+</span> Assets
          <span className="text-xs text-slate-500 font-normal ml-1">(What you own)</span>
        </h2>
        <span className="text-emerald-400 font-mono font-bold">{formatCurrency(totalAssets)}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map(p => (
          <button
            key={p.name}
            onClick={() => handlePreset(p)}
            className="text-xs px-3 py-1.5 rounded-full bg-slate-700/50 text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors border border-slate-600"
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Asset name"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={100}
          className="flex-1 min-w-0 bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value as Asset['category'])}
          className="shrink-0 bg-slate-900/50 border border-slate-600 rounded-lg px-2 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none"
        >
          <option value="cash">Cash</option>
          <option value="investments">Investments</option>
          <option value="property">Property</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          inputMode="decimal"
          placeholder="$0"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          className="shrink-0 w-28 bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm text-right font-mono placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
        />
        <button
          onClick={handleAdd}
          className="shrink-0 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Add
        </button>
      </div>

      {assets.length > 0 && (
        <ul className="space-y-2">
          {assets.map(asset => (
            <li key={asset.id} className="flex items-center justify-between gap-2 bg-slate-900/30 rounded-lg px-3 py-2">
              <div className="min-w-0 flex-1">
                <span className="text-white text-sm truncate block">{asset.name}</span>
                <span className="text-slate-500 text-xs">{asset.category}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-emerald-400 font-mono text-sm">{formatCurrency(asset.value)}</span>
                <button onClick={() => onRemove(asset.id)} className="text-slate-500 hover:text-red-400 text-sm">&times;</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
