'use server';

import { cookies, headers } from 'next/headers';
import { CookieKey, UserRole } from '@oxygen/types';
import { decodeToken, encrypt, getRole, processAndSignTokenWithScopes } from '@oxygen/utils';

export async function handleSSO(code: string | null, ticket: string): Promise<boolean> {
  const host = headers().get('host');
  const protocol = /*process.env.NODE_ENV === 'production' ? 'https' : */ 'http';
  const baseUrl = `${protocol}://${host}`;

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

  const signedToken = await processAndSignTokenWithScopes(tokenData.data.access_token, newScopes);
  const expiresIn = tokenData.data.expires_in;

  // Set the cookie directly in the server action
  const cookieStore = cookies();
  cookieStore.set({
    name: CookieKey.SESSION_ID,
    value: encrypt(token),
    // value: encrypt(token),
    path: '/',
    maxAge: expiresIn, // Token expiration in seconds
    // httpOnly: true, // Prevent JavaScript access
    // secure: process.env.NODE_ENV === 'production', // Only secure in production
    // sameSite: 'strict', // CSRF protection
  });

  cookieStore.set({
    name: CookieKey.SESSION_TICKET,
    value: encrypt(ticket),
    path: '/',
    maxAge: expiresIn, // Token expiration in seconds
    // httpOnly: true, // Prevent JavaScript access
    // secure: process.env.NODE_ENV === 'production', // Only secure in production
    sameSite: 'strict', // CSRF protection
  });

  cookieStore.set({
    name: CookieKey.S_SESSION_ID,
    value: encrypt(signedToken),
    path: '/',
    maxAge: expiresIn, // Token expiration in seconds
    // httpOnly: true, // Prevent JavaScript access
    // secure: process.env.NODE_ENV === 'production', // Only secure in production
    sameSite: 'strict', // CSRF protection
  });

  cookieStore.set({
    name: CookieKey.INFO,
    value: encrypt(userRole ?? ''),
    path: '/',
    maxAge: expiresIn, // Token expiration in seconds
    // httpOnly: true, // Prevent JavaScript access
    // secure: process.env.NODE_ENV === 'production', // Only secure in production
    sameSite: 'strict', // CSRF protection
  });

  return true;
}
