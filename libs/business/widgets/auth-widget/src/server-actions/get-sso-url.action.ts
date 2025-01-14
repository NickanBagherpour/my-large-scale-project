'use server';

export async function getSsoUrlAction(): Promise<string> {
  const baseUrl = process.env.SSO_URL;
  const clientId = process.env.NEXT_PUBLIC_SSO_CLIENT_KEY;
  const scopes = process.env.SSO_SCOPE;
  //fixme remove above and uncomment below after fix scope issue
  // const scopes = `${process.env.SSO_SCOPE}+${process.env.SSO_SCOPE_COMMERCIAL}+${process.env.SSO_SCOPE_BUSINESS}`;
  const redirectUri = process.env.SSO_REDIRECT_URL;

  if (!baseUrl || !clientId || !scopes || !redirectUri) {
    throw new Error('Missing required environment variables');
  }

  const ssoUrl = `${baseUrl}/identity/oauth2/auth/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&state=xyz-_123&sso=1&redirect_uri=${encodeURIComponent(
    redirectUri,
  )}`;

  return ssoUrl;
}
