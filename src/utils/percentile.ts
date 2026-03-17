import { AgeBracket, PercentileResult } from '@/types';
import { NET_WORTH_PERCENTILES } from '@/data/netWorthPercentiles';
import { formatCurrency } from './calculations';

/**
 * Find the age bracket for a given age
 */
export function getAgeBracket(age: number): AgeBracket | null {
  return NET_WORTH_PERCENTILES.find(
    (bracket) => age >= bracket.minAge && age <= bracket.maxAge
  ) || null;
}

/**
 * Interpolate percentile between two data points
 */
function interpolatePercentile(
  netWorth: number,
  lowerPercentile: number,
  lowerValue: number,
  upperPercentile: number,
  upperValue: number
): number {
  if (upperValue === lowerValue) return (lowerPercentile + upperPercentile) / 2;
  const ratio = (netWorth - lowerValue) / (upperValue - lowerValue);
  return lowerPercentile + ratio * (upperPercentile - lowerPercentile);
}

/**
 * Calculate the percentile position for a given net worth and age
 */
export function calculatePercentile(netWorth: number, age: number): PercentileResult | null {
  const bracket = getAgeBracket(age);
  if (!bracket) return null;

  const { p10, p25, p50, p75, p90 } = bracket.percentiles;
  let percentile: number;

  // Determine percentile by interpolation between data points
  if (netWorth <= p10) {
    // Below p10: extrapolate down, capped at 1
    percentile = Math.max(1, 10 * (netWorth / p10));
    if (p10 <= 0 && netWorth < p10) {
      percentile = Math.max(1, 10 - (p10 - netWorth) / Math.abs(p10) * 5);
    }
  } else if (netWorth <= p25) {
    percentile = interpolatePercentile(netWorth, 10, p10, 25, p25);
  } else if (netWorth <= p50) {
    percentile = interpolatePercentile(netWorth, 25, p25, 50, p50);
  } else if (netWorth <= p75) {
    percentile = interpolatePercentile(netWorth, 50, p50, 75, p75);
  } else if (netWorth <= p90) {
    percentile = interpolatePercentile(netWorth, 75, p75, 90, p90);
  } else {
    // Above p90: extrapolate up, capped at 99
    const excess = (netWorth - p90) / (p90 - p75);
    percentile = Math.min(99, 90 + excess * 5);
  }

  // Round to nearest integer
  percentile = Math.round(percentile);

  // Determine comparison to median
  let comparedToMedian: 'above' | 'below' | 'at';
  if (netWorth > p50 * 1.05) {
    comparedToMedian = 'above';
  } else if (netWorth < p50 * 0.95) {
    comparedToMedian = 'below';
  } else {
    comparedToMedian = 'at';
  }

  // Generate insight text
  const insight = generateInsight(percentile, bracket.label, p50, netWorth, comparedToMedian);

  return {
    percentile,
    bracketLabel: bracket.label,
    medianNetWorth: p50,
    comparedToMedian,
    insight,
  };
}

/**
 * Generate insight text based on percentile position
 */
function generateInsight(
  percentile: number,
  bracketLabel: string,
  median: number,
  netWorth: number,
  comparedToMedian: 'above' | 'below' | 'at'
): string {
  const medianFormatted = formatCurrency(median);

  if (percentile >= 90) {
    return `You're in the top 10% of ${bracketLabel.toLowerCase()} Americans. The median net worth for your age group is ${medianFormatted}.`;
  } else if (percentile >= 75) {
    return `You're doing better than 3 out of 4 people in your age group. The median is ${medianFormatted}.`;
  } else if (percentile >= 50) {
    return `You're above the median (${medianFormatted}) for ${bracketLabel.toLowerCase()} Americans.`;
  } else if (percentile >= 25) {
    const diff = median - netWorth;
    return `You're ${formatCurrency(diff)} below the median (${medianFormatted}) for your age group.`;
  } else {
    return `Focus on building your net worth. The median for your age group is ${medianFormatted}.`;
  }
}

/**
 * Get ordinal suffix for a number (1st, 2nd, 3rd, etc.)
 */
export function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
