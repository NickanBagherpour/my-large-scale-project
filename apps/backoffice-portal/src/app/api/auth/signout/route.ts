import { cookies } from 'next/headers';

import { CookieKey } from '@oxygen/types';
import { decrypt, createResponse, createErrorResponse } from '@oxygen/utils';

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

    if (!response.ok) {
      // throw new Error('SSO signout failed');
      console.log('-------------------SSO signout failed-------------------------');
    }

    // Filter out the CONFIG cookie
    const cookiesToClear = cookies().getAll().filter(
      (cookie) => cookie.name !== CookieKey.CONFIG,
    );

    // Create the response with success and clear the cookies
    const res = createResponse({ success: true });

    // Append Set-Cookie headers to clear each cookie
    cookiesToClear.forEach((cookie) => {
      res.cookies.delete(cookie.name);
    });

    return res;

  } catch (error: unknown) {
    return createErrorResponse(error);
  }
}
