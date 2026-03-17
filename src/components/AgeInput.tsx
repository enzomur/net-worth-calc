'use client';

import { useState, useEffect } from 'react';

interface Props {
  age: number | null;
  onAgeChange: (age: number | null) => void;
}

export default function AgeInput({ age, onAgeChange }: Props) {
  const [inputValue, setInputValue] = useState(age?.toString() || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setInputValue(age?.toString() || '');
  }, [age]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setError(null);

    if (value === '') {
      onAgeChange(null);
      return;
    }

    const num = parseInt(value, 10);
    if (isNaN(num)) {
      setError('Please enter a valid number');
      return;
    }
    if (num < 18) {
      setError('Must be 18 or older');
      return;
    }
    if (num > 120) {
      setError('Please enter a valid age');
      return;
    }

    onAgeChange(num);
  };

  return (
    <div className="mt-6 pt-6 border-t border-slate-700/50">
      <div className="max-w-xs mx-auto">
        <label className="block text-slate-400 text-sm mb-2 text-center">
          Enter your age to see how you compare
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={inputValue}
            onChange={handleChange}
            placeholder="Age"
            min={18}
            max={120}
            className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {age !== null && (
            <button
              onClick={() => onAgeChange(null)}
              className="text-slate-400 hover:text-slate-300 text-sm"
              aria-label="Clear age"
            >
              Clear
            </button>
          )}
        </div>
        {error && (
          <p className="text-red-400 text-xs mt-1 text-center">{error}</p>
        )}
        {age !== null && !error && (
          <p className="text-slate-500 text-xs mt-2 text-center">
            Comparing to Federal Reserve SCF 2022 data
          </p>
        )}
      </div>
    </div>
  );
}
