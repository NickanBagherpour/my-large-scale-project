'use server';

import { headers } from 'next/headers';

import { decrypt, validateToken as JwtUtilValidateToken } from '@oxygen/utils';
import { JwtPayload } from '@oxygen/types';

/**
 * Validates a token by making an online API request to the authentication endpoint
 *
 * @param {string | undefined} token - The authentication token to validate
 * @returns {Promise<boolean>} - Whether the token is valid
 */
export async function validateTokenOnline(token: string | undefined): Promise<boolean> {
  const host = headers().get('host');
  const protocol = 'http';
  const baseUrl = `${protocol}://${host}`;

  if (!token) return false;

  try {
    const response = await fetch(`${baseUrl}/api/auth/validate`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${decrypt(token)}`,
      },
    });

    const result: { success: boolean } = await response.json();
    return result.success;
  } catch (error) {
    console.error('Token online validation error:', error);
    return false;
  }
}

/**
 * Validates a token offline by decrypting and checking its payload
 *
 * @param {string | undefined} token - The authentication token to validate
 * @returns {Promise<boolean>} - Whether the token is valid
 */
export async function validateTokenOffline(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  try {
    const decrypted = decrypt(token);
    const decodedPayload: JwtPayload | null = await JwtUtilValidateToken(decrypted);

    return decodedPayload != null && decodedPayload.exp > 0;
  } catch (error) {
    console.error('Token offline validation error:', error);
    return false;
  }
}
