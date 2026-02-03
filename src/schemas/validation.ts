import { z } from 'zod';
import {
  AssetInputSchema,
  LiabilityInputSchema,
  GoalInputSchema,
  FinancialDataSchema,
  type AssetInput,
  type LiabilityInput,
  type GoalInput,
} from './financial';
import type { FinancialData } from '@/types';

// Validation result type
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Validates asset input data
 */
export function validateAssetInput(input: unknown): ValidationResult<AssetInput> {
  const result = AssetInputSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errorMessage = result.error.issues.map((e) => e.message).join(', ');
  return { success: false, error: errorMessage };
}

/**
 * Validates liability input data
 */
export function validateLiabilityInput(input: unknown): ValidationResult<LiabilityInput> {
  const result = LiabilityInputSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errorMessage = result.error.issues.map((e) => e.message).join(', ');
  return { success: false, error: errorMessage };
}

/**
 * Validates goal input data
 */
export function validateGoalInput(input: unknown): ValidationResult<GoalInput> {
  const result = GoalInputSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errorMessage = result.error.issues.map((e) => e.message).join(', ');
  return { success: false, error: errorMessage };
}

/**
 * Validates financial data loaded from localStorage
 * Returns validated data or null if invalid
 */
export function validateFinancialData(data: unknown): FinancialData | null {
  const result = FinancialDataSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
  console.warn('Invalid financial data in localStorage:', result.error.issues);
  return null;
}

/**
 * Zod-based monetary input parser
 * Parses string input to a valid number within bounds
 */
const MonetaryInputSchema = z.string().transform((val, ctx) => {
  // Remove currency symbols, commas, and whitespace
  const cleaned = val.replace(/[$,\s]/g, '');
  const num = parseFloat(cleaned);

  if (isNaN(num)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid number format',
    });
    return z.NEVER;
  }

  // Clamp to valid range
  const clamped = Math.max(0, Math.min(num, 999_999_999));
  return Math.round(clamped * 100) / 100; // Round to 2 decimal places
});

/**
 * Parses a monetary string input to a validated number
 * Returns 0 for invalid inputs
 */
export function parseMonetaryInput(input: string): number {
  const result = MonetaryInputSchema.safeParse(input);
  if (result.success) {
    return result.data;
  }
  return 0;
}
