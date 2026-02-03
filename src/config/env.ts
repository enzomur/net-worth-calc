/**
 * Type-safe environment variable access
 * All NEXT_PUBLIC_ variables are available on both client and server
 */

export const env = {
  /** Application name displayed in UI */
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? 'Net Worth Educator',

  /** Application version */
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION ?? '0.1.0',

  /** Whether localStorage encryption is enabled by default */
  enableEncryption: process.env.NEXT_PUBLIC_ENABLE_ENCRYPTION === 'true',

  /** Maximum number of assets allowed */
  maxAssets: parseInt(process.env.NEXT_PUBLIC_MAX_ASSETS ?? '1000', 10),

  /** Maximum number of liabilities allowed */
  maxLiabilities: parseInt(process.env.NEXT_PUBLIC_MAX_LIABILITIES ?? '1000', 10),

  /** Whether we're in development mode */
  isDevelopment: process.env.NODE_ENV === 'development',

  /** Whether we're in production mode */
  isProduction: process.env.NODE_ENV === 'production',
} as const;

export type Env = typeof env;
