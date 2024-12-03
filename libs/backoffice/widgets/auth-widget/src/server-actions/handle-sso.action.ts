'use server';

import { cookies, headers } from 'next/headers';
import { CookieKey } from '@oxygen/types';
import { redirect } from 'next/navigation';
import { ROUTES } from '@oxygen/utils';

export async function handleSSO(code: string, ticket: string): Promise<boolean> {

  const host = headers().get('host');
  const protocol = /*process.env.NODE_ENV === 'production' ? 'https' : */'http';
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

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Unknown error');
  }

  console.log('Token set successfully:', data.tokenData.access_token);

  const token = data.tokenData.access_token;
  const expiresIn = data.tokenData.expires_in;

  // Set the cookie directly in the server action
  const cookieStore = cookies();
  cookieStore.set({
    name: CookieKey.SESSION_ID,
    value: token,
    path: '/',
    maxAge: expiresIn, // Token expiration in seconds
    // httpOnly: true, // Prevent JavaScript access
    // secure: process.env.NODE_ENV === 'production', // Only secure in production
    // sameSite: 'strict', // CSRF protection
  });

  cookieStore.set({
    name: CookieKey.SESSION_TICKET,
    value: ticket,
    path: '/',
    maxAge: expiresIn, // Token expiration in seconds
    // httpOnly: true, // Prevent JavaScript access
    // secure: process.env.NODE_ENV === 'production', // Only secure in production
    // sameSite: 'strict', // CSRF protection
  });

  return true;
}
