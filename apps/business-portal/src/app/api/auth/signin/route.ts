import { AuthApiHelper } from '@oxygen/utils';

export async function POST(req: Request) {
  const { code } = await req.json();

  return AuthApiHelper.signin(code, {
    ssoUrl: process.env.SSO_URL ?? '',
    clientKey: process.env.NEXT_PUBLIC_SSO_CLIENT_KEY ?? '',
    clientSecret: process.env.SSO_CLIENT_SECRET ?? '',
    redirectUrl: process.env.SSO_REDIRECT_URL ?? '',
  });
}
