'use server';

export async function getSsoUrlAction(): Promise<string> {
  const baseUrl = process.env.SSO_URL;
  const clientId = process.env.SSO_CLIENT_KEY;
  const scope = process.env.SSO_SCOPE;
  const redirectUri = process.env.SSO_REDIRECT_URL;

  if (!baseUrl || !clientId || !scope || !redirectUri) {
    throw new Error('Missing required environment variables');
  }

  const ssoUrl = `${baseUrl}/identity/oauth2/auth/authorize?response_type=code&client_id=${clientId}&scope=${scope}&state=xyz-_123&sso=1&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;

  return ssoUrl;
}
