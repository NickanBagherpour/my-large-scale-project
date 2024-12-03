// export const SSO_URL = `${process.env.NEXT_PUBLIC_SSO_URL}/identity/oauth2/auth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_SSO_CLIENT_KEY}&scope=${process.env.NEXT_PUBLIC_SSO_SCOPE}&state=xyz-_123&sso=1&redirect_uri=${encodeURI(process.env.NEXT_PUBLIC_SSO_REDIRECT_URL ?? '')}`;
const test = '';
export const AVAILABLE_ROWS_PER_PAGE = [5, 10, 25, 50, 100];
export const INITIAL_ROW_PER_PAGE = AVAILABLE_ROWS_PER_PAGE[0];
export const INITIAL_PAGE = 1;
