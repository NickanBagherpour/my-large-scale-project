'use server';

import { headers } from 'next/headers';
import { CookieKey } from '@oxygen/types';

export async function handleSignOut() {
  const host = headers().get('host'); // Get the current host (domain)
  const protocol = /*process.env.NODE_ENV === 'production' ? 'https' :*/ 'http'; // Use HTTPS in production
  const baseUrl = `${protocol}://${host}`;

  // Assuming the session ticket is stored in a cookie or comes from some other source
  const sessionTicket = headers().get(CookieKey.SESSION_TICKET); // Example, replace with the correct header or method to fetch session ticket

  if (!sessionTicket) {
    throw new Error('No session ticket found');
  }

  // Build the signout URL with the sessionTicket
  const signOutUrl = `${baseUrl}/identity/oauth2/auth/session/signout?sessionTicket=${sessionTicket}`;

  // Send the GET request to sign out
  const response = await fetch(signOutUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', // Optional, depending on the API's requirements
    },
  });

  // Check if the response is ok
  if (!response.ok) {
    throw new Error('Failed to sign out');
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Unknown error');
  }

  console.log('Signout done successfully');
}
