import { cookies } from 'next/headers';

import { CookieKey } from '@oxygen/types';
import { createErrorResponse, createResponse, decrypt } from '@oxygen/utils';

export async function GET(req: Request) {
  try {

    const cookieStore = await cookies();

    // Filter out the CONFIG cookie
    const cookiesToClear = cookieStore
      .getAll()
      .filter((cookie) => cookie.name !== CookieKey.CONFIG);

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
