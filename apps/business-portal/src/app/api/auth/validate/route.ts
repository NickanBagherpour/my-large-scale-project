import { AuthApiHelper } from '@oxygen/utils';

export async function GET(req: Request) {
  const bearerToken = req.headers.get('Authorization');
  // const token = cookies().get(CookieKey.SESSION_ID)?.value;

  return AuthApiHelper.validateAccessToken(bearerToken, {
    ssoUrl: process.env.SSO_URL ?? '',
  });
}
