import { cookies } from 'next/headers';

import { CookieKey } from '@oxygen/types';
import { decrypt, AuthApiHelper } from '@oxygen/utils';

export async function GET(req: Request) {
  const sessionTicket = decrypt(cookies().get(CookieKey.SESSION_TICKET)?.value);
  const token = decrypt(cookies().get(CookieKey.SESSION_ID)?.value);

  return AuthApiHelper.signout(sessionTicket, token, {
    ssoUrl: process.env.SSO_URL ?? '',
  });
}
