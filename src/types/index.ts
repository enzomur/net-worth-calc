export interface Asset {
  id: string;
  name: string;
  value: number;
  category: 'cash' | 'investments' | 'property' | 'other';
}

export interface Liability {
  id: string;
  name: string;
  value: number;
  category: 'mortgage' | 'student-loans' | 'credit-cards' | 'auto' | 'other';
}

export interface NetWorthSnapshot {
  date: string; // ISO date
  assets: number;
  liabilities: number;
  netWorth: number;
}

export interface Goal {
  targetNetWorth: number;
  deadline: string; // ISO date
  createdAt: string;
}

export interface FinancialData {
  assets: Asset[];
  liabilities: Liability[];
  history: NetWorthSnapshot[];
  goal: Goal | null;
  age: number | null;
}

export interface AgeBracket {
  label: string;
  minAge: number;
  maxAge: number;
  percentiles: {
    p10: number;
    p25: number;
    p50: number;
    p75: number;
    p90: number;
  };
}

export interface PercentileResult {
  percentile: number;
  bracketLabel: string;
  medianNetWorth: number;
  comparedToMedian: 'above' | 'below' | 'at';
  insight: string;
}

export interface Milestone {
  label: string;
  threshold: number;
  achieved: boolean;
  icon: string;
}

export interface EducationTopic {
  id: string;
  title: string;
  icon: string;
  content: string;
  keyPoints: string[];
}

export interface Insight {
  type: 'positive' | 'warning' | 'info';
  text: string;
}

export type HealthLevel = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
