'use server';

import { headers } from 'next/headers';

/**
 * Constructs and returns the base URL for the current environment.
 * @returns {string} The base URL (e.g., "http://localhost:3000" or "https://example.com").
 */
export async function getAppBaseUrl(): Promise<string> {
  const host = headers().get('host');
  if (!host) {
    throw new Error('Host header is missing');
  }

  const protocol = headers().get('x-forwarded-proto') || 'http';
  //const protocol = /*process.env.NODE_ENV === 'production' ? 'https' : */ 'http';

  return `${protocol}://${host}`;
}
