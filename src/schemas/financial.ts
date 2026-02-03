import { z } from 'zod';

// Constants for validation
const MAX_VALUE = 999_999_999;
const MAX_NAME_LENGTH = 100;

// Asset schemas
export const AssetCategorySchema = z.enum(['cash', 'investments', 'property', 'other']);

export const AssetSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(MAX_NAME_LENGTH),
  value: z.number().min(0).max(MAX_VALUE),
  category: AssetCategorySchema,
});

export const AssetInputSchema = AssetSchema.omit({ id: true });

// Liability schemas
export const LiabilityCategorySchema = z.enum(['mortgage', 'student-loans', 'credit-cards', 'auto', 'other']);

export const LiabilitySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(MAX_NAME_LENGTH),
  value: z.number().min(0).max(MAX_VALUE),
  category: LiabilityCategorySchema,
});

export const LiabilityInputSchema = LiabilitySchema.omit({ id: true });

// Goal schemas - deadline must be a future date
export const GoalSchema = z.object({
  targetNetWorth: z.number().min(0).max(MAX_VALUE),
  deadline: z.string().refine(
    (date) => {
      const deadlineDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return deadlineDate >= today;
    },
    { message: 'Deadline must be today or in the future' }
  ),
  createdAt: z.string(),
});

export const GoalInputSchema = GoalSchema.omit({ createdAt: true });

// Net worth snapshot schema
export const NetWorthSnapshotSchema = z.object({
  date: z.string(),
  assets: z.number().min(0),
  liabilities: z.number().min(0),
  netWorth: z.number(),
});

// Full financial data schema for localStorage validation
export const FinancialDataSchema = z.object({
  assets: z.array(AssetSchema),
  liabilities: z.array(LiabilitySchema),
  history: z.array(NetWorthSnapshotSchema),
  goal: GoalSchema.nullable(),
});

// Type exports inferred from schemas
export type AssetInput = z.infer<typeof AssetInputSchema>;
export type LiabilityInput = z.infer<typeof LiabilityInputSchema>;
export type GoalInput = z.infer<typeof GoalInputSchema>;
export type ValidatedFinancialData = z.infer<typeof FinancialDataSchema>;
