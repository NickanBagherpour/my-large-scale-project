import { AuthApiHelper } from '@oxygen/utils';

export async function GET(req) {
  // Get the authorization token from the request headers
  const bearerToken = req.headers.get('authorization');

  return AuthApiHelper.getUserInfo(bearerToken, {
    ssoUrl: process.env.SSO_URL ?? '',
  });
}
