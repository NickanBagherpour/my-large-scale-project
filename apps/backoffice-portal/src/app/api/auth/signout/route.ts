import { cookies } from 'next/headers';
import { CookieKey, createResponse } from '@oxygen/types';
import { decrypt } from '@oxygen/utils';

export async function GET(req: Request) {
  const sessionTicket = decrypt(cookies().get(CookieKey.SESSION_TICKET)?.value);
  const token = decrypt(cookies().get(CookieKey.SESSION_ID)?.value);
  const url = `${process.env.SSO_URL}/identity/oauth2/auth/session/signout?sessionTicket=${sessionTicket}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return createResponse({ success: true });
  } catch (error: any) {
    return createResponse({ success: false, error: error.message, errorDetails: error.stack, statusCode: 500 });
  }
}
