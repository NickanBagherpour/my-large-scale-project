'use server';

import { cookies } from 'next/headers';
import { CookieKey, UserRole } from '@oxygen/types';
import { decodeToken, encrypt, getAppBaseUrl, getRole, processAndSignTokenWithScopes } from '@oxygen/utils';

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
  const decodedToken = decodeToken(token);
  const userRole = getRole(decodedToken);

  const newScopes = `${process.env.SSO_SCOPE}+${
    userRole === UserRole.COMMERCIAL_BANKING_ADMIN ? process.env.SSO_SCOPE_COMMERCIAL : process.env.SSO_SCOPE_BUSINESS
  }`;

  const signedToken = await processAndSignTokenWithScopes(token, newScopes);
  const expiresIn = tokenData.data.expires_in;

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
