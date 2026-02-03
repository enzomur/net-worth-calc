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
