'use server';

import { cookies } from 'next/headers';
import { CookieKey } from '@oxygen/types';
import { encrypt, getAppBaseUrl, getRole, processAndSignToken } from '@oxygen/utils';

export async function handleSSO(code: string | null, ticket: string | null): Promise<boolean> {
  const baseUrl = await getAppBaseUrl();

  const response = await fetch(`${baseUrl}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error('Failed to sign in');
  }

  const tokenData = await response.json();

  if (!tokenData.success) {
    throw new Error(tokenData.error || 'Unknown error');
  }

  const token = tokenData.data.access_token;
  const signedToken = await processAndSignToken(token);
  const expiresIn = tokenData.data.expires_in;
  const userRole = getRole(token);

  // Set the cookie directly in the server action
  const cookieStore = await cookies();

  const cookieOptions = {
    path: '/',
    maxAge: expiresIn,
    sameSite: 'strict' as const,
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  };

  cookieStore.set(CookieKey.SESSION_ID, encrypt(token), cookieOptions);
  cookieStore.set(CookieKey.SESSION_TICKET, encrypt(ticket), cookieOptions);
  cookieStore.set(CookieKey.S_SESSION_ID, encrypt(signedToken), cookieOptions);
  cookieStore.set(CookieKey.INFO, encrypt(userRole ?? ''), cookieOptions);

  return true;
}
