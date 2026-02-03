import { Asset, Liability, Milestone, Insight, HealthLevel, Goal } from '@/types';

export function calculateNetWorth(assets: Asset[], liabilities: Liability[]) {
  const totalAssets = assets.reduce((sum, a) => sum + a.value, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.value, 0);
  return { totalAssets, totalLiabilities, netWorth: totalAssets - totalLiabilities };
}

export function getHealthLevel(netWorth: number, totalAssets: number, totalLiabilities: number): HealthLevel {
  if (totalAssets === 0 && totalLiabilities === 0) return 'fair';
  const ratio = totalLiabilities > 0 ? totalAssets / totalLiabilities : 10;
  if (netWorth < 0) return ratio < 0.5 ? 'critical' : 'poor';
  if (ratio > 5) return 'excellent';
  if (ratio > 2) return 'good';
  return 'fair';
}

export function getHealthColor(level: HealthLevel): string {
  const colors: Record<HealthLevel, string> = {
    excellent: '#10b981',
    good: '#34d399',
    fair: '#fbbf24',
    poor: '#f97316',
    critical: '#ef4444',
  };
  return colors[level];
}

export function getHealthPercent(netWorth: number, totalAssets: number, totalLiabilities: number): number {
  if (totalAssets === 0 && totalLiabilities === 0) return 50;
  if (totalLiabilities === 0) return 100;
  const ratio = totalAssets / totalLiabilities;
  return Math.min(100, Math.max(0, ratio * 20));
}

export function generateInsights(assets: Asset[], liabilities: Liability[]): Insight[] {
  const { totalAssets, totalLiabilities, netWorth } = calculateNetWorth(assets, liabilities);
  const insights: Insight[] = [];

  if (netWorth > 0) {
    insights.push({ type: 'positive', text: `Your net worth is positive at ${formatCurrency(netWorth)}.` });
  } else if (netWorth < 0) {
    insights.push({ type: 'warning', text: `Your net worth is negative. You owe ${formatCurrency(Math.abs(netWorth))} more than you own.` });
  }

  if (totalLiabilities > 0 && totalAssets > 0) {
    const ratio = totalLiabilities / totalAssets;
    if (ratio > 0.8) {
      insights.push({ type: 'warning', text: 'Your debt-to-asset ratio is high (>80%). Focus on debt reduction.' });
    } else if (ratio < 0.3) {
      insights.push({ type: 'positive', text: 'Great debt-to-asset ratio (<30%). You have strong financial leverage.' });
    }
  }

  const cashAssets = assets.filter(a => a.category === 'cash');
  const cashTotal = cashAssets.reduce((s, a) => s + a.value, 0);
  if (cashTotal === 0 && assets.length > 0) {
    insights.push({ type: 'warning', text: 'No cash reserves detected. Aim for 3-6 months of expenses in savings.' });
  }

  const creditCards = liabilities.filter(l => l.category === 'credit-cards');
  const ccTotal = creditCards.reduce((s, l) => s + l.value, 0);
  if (ccTotal > 5000) {
    insights.push({ type: 'warning', text: `Credit card debt of ${formatCurrency(ccTotal)} is costly. Consider debt avalanche or snowball method.` });
  }

  if (assets.length === 0 && liabilities.length === 0) {
    insights.push({ type: 'info', text: 'Add your assets and liabilities to see personalized insights.' });
  }

  return insights;
}

export function getMilestones(netWorth: number): Milestone[] {
  return [
    { label: 'Debt Free', threshold: 0, achieved: netWorth >= 0, icon: '🎯' },
    { label: '$1K Saved', threshold: 1000, achieved: netWorth >= 1000, icon: '🌱' },
    { label: '$10K Club', threshold: 10000, achieved: netWorth >= 10000, icon: '💪' },
    { label: '$50K Milestone', threshold: 50000, achieved: netWorth >= 50000, icon: '🔥' },
    { label: '$100K Club', threshold: 100000, achieved: netWorth >= 100000, icon: '⭐' },
    { label: 'Quarter Million', threshold: 250000, achieved: netWorth >= 250000, icon: '🏆' },
    { label: 'Half Million', threshold: 500000, achieved: netWorth >= 500000, icon: '💎' },
    { label: 'Millionaire', threshold: 1000000, achieved: netWorth >= 1000000, icon: '👑' },
  ];
}

export function getBudgetRecommendations(totalAssets: number, totalLiabilities: number): string[] {
  const recs: string[] = [];
  const ratio = totalLiabilities > 0 ? totalLiabilities / totalAssets : 0;

  if (ratio > 0.5) {
    recs.push('Allocate at least 20% of income to debt repayment using the avalanche method (highest interest first).');
  }
  if (totalAssets < 1000) {
    recs.push('Build a $1,000 emergency fund before aggressive investing. Start with a high-yield savings account.');
  }
  const cashAssets = totalAssets * 0.1; // rough estimate
  if (cashAssets < totalLiabilities * 0.05) {
    recs.push('Keep 3-6 months of expenses in liquid savings for emergencies.');
  }
  recs.push('Follow the 50/30/20 rule: 50% needs, 30% wants, 20% savings & debt repayment.');
  if (totalAssets > 10000) {
    recs.push('Consider diversifying investments across stocks, bonds, and real estate.');
  }
  return recs;
}

export function getGoalProgress(goal: Goal, currentNetWorth: number): number {
  if (goal.targetNetWorth <= 0) return 100;
  return Math.min(100, Math.max(0, (currentNetWorth / goal.targetNetWorth) * 100));
}

export function getMonthlyTargetSavings(goal: Goal, currentNetWorth: number): number {
  const deadline = new Date(goal.deadline);
  const now = new Date();
  const monthsLeft = Math.max(1, (deadline.getFullYear() - now.getFullYear()) * 12 + (deadline.getMonth() - now.getMonth()));
  const gap = goal.targetNetWorth - currentNetWorth;
  return gap > 0 ? gap / monthsLeft : 0;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function sanitizeNumber(input: string): number {
  const cleaned = input.replace(/[^0-9.-]/g, '');
  const num = parseFloat(cleaned);
  if (isNaN(num) || !isFinite(num)) return 0;
  return Math.max(0, Math.min(num, 999_999_999));
}
