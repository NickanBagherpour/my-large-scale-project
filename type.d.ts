import 'styled-components';

import { ITheme } from './libs/types/src';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_PROFILE_DELAY: string;
      NEXT_PUBLIC_AUTH_MODE: string;
      NEXT_PUBLIC_PORTAL_PREFIX: string;
      NEXT_PUBLIC_SECURE_LOCAL_STORAGE_HASH_KEY: string;
      NEXT_PUBLIC_CRYPTO_HASH_KEY: string;
      NEXT_PUBLIC_TOKEN: string;
      API_BASE_URL: string;
      AUTH_SECRET: string;
      NEXT_PUBLIC_SSO_URL: string;
      NEXT_PUBLIC_SSO_REDIRECT_URL: string;
      // NEXT_PUBLIC_SSO_TOKEN_URL: string;
      NEXT_PUBLIC_SSO_CLIENT_KEY: string;
      NEXT_PUBLIC_SSO_CLIENT_SECRET: string;
      NEXT_PUBLIC_SSO_SCOPE: string;
      NEXT_PUBLIC_DEV_WITH_SSO: string;
    }
  }
}
