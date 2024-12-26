export const IS_BROWSER = typeof window !== 'undefined';

export const ENV_CONSTANTS = {
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
  IS_DEMO: process.env.NEXT_PUBLIC_IS_DEMO === 'true',
};
