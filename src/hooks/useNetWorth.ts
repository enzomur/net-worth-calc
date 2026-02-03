'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Asset, Liability, NetWorthSnapshot, Goal, FinancialData } from '@/types';
import { calculateNetWorth, getMilestones, generateInsights, getHealthLevel, getHealthPercent } from '@/utils/calculations';
import { saveData, loadData } from '@/utils/storage';

const DEFAULT_DATA: FinancialData = {
  assets: [],
  liabilities: [],
  history: [],
  goal: null,
};

export function useNetWorth() {
  const [data, setData] = useState<FinancialData>(DEFAULT_DATA);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadData();
    if (saved) setData(saved);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveData(data);
  }, [data, loaded]);

  const { totalAssets, totalLiabilities, netWorth } = useMemo(
    () => calculateNetWorth(data.assets, data.liabilities),
    [data.assets, data.liabilities]
  );

  const milestones = useMemo(() => getMilestones(netWorth), [netWorth]);
  const insights = useMemo(() => generateInsights(data.assets, data.liabilities), [data.assets, data.liabilities]);
  const healthLevel = useMemo(() => getHealthLevel(netWorth, totalAssets, totalLiabilities), [netWorth, totalAssets, totalLiabilities]);
  const healthPercent = useMemo(() => getHealthPercent(netWorth, totalAssets, totalLiabilities), [netWorth, totalAssets, totalLiabilities]);

  const addAsset = useCallback((asset: Omit<Asset, 'id'>) => {
    setData(prev => ({
      ...prev,
      assets: [...prev.assets, { ...asset, id: crypto.randomUUID() }],
    }));
  }, []);

  const removeAsset = useCallback((id: string) => {
    setData(prev => ({ ...prev, assets: prev.assets.filter(a => a.id !== id) }));
  }, []);

  const updateAsset = useCallback((id: string, updates: Partial<Asset>) => {
    setData(prev => ({
      ...prev,
      assets: prev.assets.map(a => a.id === id ? { ...a, ...updates } : a),
    }));
  }, []);

  const addLiability = useCallback((liability: Omit<Liability, 'id'>) => {
    setData(prev => ({
      ...prev,
      liabilities: [...prev.liabilities, { ...liability, id: crypto.randomUUID() }],
    }));
  }, []);

  const removeLiability = useCallback((id: string) => {
    setData(prev => ({ ...prev, liabilities: prev.liabilities.filter(l => l.id !== id) }));
  }, []);

  const updateLiability = useCallback((id: string, updates: Partial<Liability>) => {
    setData(prev => ({
      ...prev,
      liabilities: prev.liabilities.map(l => l.id === id ? { ...l, ...updates } : l),
    }));
  }, []);

  const saveSnapshot = useCallback(() => {
    const snapshot: NetWorthSnapshot = {
      date: new Date().toISOString().split('T')[0],
      assets: totalAssets,
      liabilities: totalLiabilities,
      netWorth,
    };
    setData(prev => {
      // Replace if same date, otherwise append
      const existing = prev.history.findIndex(h => h.date === snapshot.date);
      const history = [...prev.history];
      if (existing >= 0) {
        history[existing] = snapshot;
      } else {
        history.push(snapshot);
      }
      return { ...prev, history };
    });
  }, [totalAssets, totalLiabilities, netWorth]);

  const setGoal = useCallback((goal: Goal | null) => {
    setData(prev => ({ ...prev, goal }));
  }, []);

  return {
    assets: data.assets,
    liabilities: data.liabilities,
    history: data.history,
    goal: data.goal,
    totalAssets,
    totalLiabilities,
    netWorth,
    milestones,
    insights,
    healthLevel,
    healthPercent,
    loaded,
    addAsset,
    removeAsset,
    updateAsset,
    addLiability,
    removeLiability,
    updateLiability,
    saveSnapshot,
    setGoal,
  };
}
