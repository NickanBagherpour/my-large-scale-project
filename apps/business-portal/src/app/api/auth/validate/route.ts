import { AuthApiHelper } from '@oxygen/utils';

export async function GET(req: Request) {
  const bearerToken = req.headers.get('Authorization');

  // const cookieStore = await cookies();
  // const token = cookiesStore.get(CookieKey.SESSION_ID)?.value;

  return AuthApiHelper.validateAccessToken(bearerToken, {
    ssoUrl: process.env.SSO_URL ?? '',
  });
}
