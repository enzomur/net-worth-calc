import { AgeBracket } from '@/types';

// Net worth percentile data by age bracket
// Source: Federal Reserve Survey of Consumer Finances (SCF) 2022
// Values in USD

export const NET_WORTH_PERCENTILES: AgeBracket[] = [
  {
    label: 'Under 35',
    minAge: 18,
    maxAge: 34,
    percentiles: {
      p10: -27689,
      p25: 5400,
      p50: 39000,
      p75: 131000,
      p90: 299000,
    },
  },
  {
    label: '35-44',
    minAge: 35,
    maxAge: 44,
    percentiles: {
      p10: -6521,
      p25: 35000,
      p50: 135600,
      p75: 352000,
      p90: 758000,
    },
  },
  {
    label: '45-54',
    minAge: 45,
    maxAge: 54,
    percentiles: {
      p10: -3800,
      p25: 50000,
      p50: 212500,
      p75: 553000,
      p90: 1227000,
    },
  },
  {
    label: '55-64',
    minAge: 55,
    maxAge: 64,
    percentiles: {
      p10: 1000,
      p25: 70000,
      p50: 272000,
      p75: 725000,
      p90: 1680000,
    },
  },
  {
    label: '65-74',
    minAge: 65,
    maxAge: 74,
    percentiles: {
      p10: 6700,
      p25: 100000,
      p50: 410000,
      p75: 988000,
      p90: 2300000,
    },
  },
  {
    label: '75+',
    minAge: 75,
    maxAge: 120,
    percentiles: {
      p10: 14000,
      p25: 86000,
      p50: 335000,
      p75: 868000,
      p90: 1860000,
    },
  },
];
