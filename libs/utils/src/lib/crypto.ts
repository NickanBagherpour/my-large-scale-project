import { ENV_CONSTANTS } from './env';
import { JwtPayload } from '@oxygen/types';

const DEFAULT_SALT = process.env.NEXT_PUBLIC_CRYPTO_HASH_KEY ?? 'THIS_IS_SECRET';

/**
 * Encrypts the input text using the given salt key.
 * @param {string} text - The text to be encrypted.
 * @param {string} salt - The key (salt) used for encryption.
 * @returns {string} - The encrypted text (as a string).
 */
export function encrypt(text, salt = DEFAULT_SALT) {
  if (ENV_CONSTANTS.IS_DEV) return text;

  let encrypted = '';
  for (let i = 0; i < text.length; i++) {
    // XOR each character with the corresponding character of the salt (looping over salt if necessary)
    encrypted += String.fromCharCode(text.charCodeAt(i) ^ salt.charCodeAt(i % salt.length));
  }
  return encrypted; // Return the encrypted text (it may contain non-printable characters)
}

/**
 * Decrypts the encrypted text using the same salt key.
 * @param {string} encryptedText - The text to be decrypted.
 * @param {string} salt - The key (salt) used for decryption (same as encryption key).
 * @returns {string} - The decrypted text (original).
 */
export function decrypt(encryptedText, salt = DEFAULT_SALT) {
  if (ENV_CONSTANTS.IS_DEV) return encryptedText;

  let decrypted = '';
  for (let i = 0; i < encryptedText.length; i++) {
    // XOR each character with the corresponding character of the salt (looping over salt if necessary)
    decrypted += String.fromCharCode(encryptedText.charCodeAt(i) ^ salt.charCodeAt(i % salt.length));
  }
  return decrypted; // Return the decrypted text
}

/**
 * Decodes the payload of a JWT without verifying its signature.
 * Works both on client and server sides.
 *
 * @param {string} token - The JWT string.
 * @returns {Object|null} - The decoded payload as an object, or null if decoding fails.
 */
export function decodeJWT(token: string): JwtPayload | null {
  if (!token) {
    console.error('No token provided to decode.');
    return null;
  }

  const parts = token.split('.');

  if (parts.length !== 3) {
    console.error('Invalid JWT format. Expected three parts separated by dots.');
    return null;
  }

  const payload = parts[1];

  try {
    // Base64URL decode
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

    // Pad with '=' to make the length a multiple of 4
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');

    // Decode Base64 string to UTF-8
    let decoded: string;

    if (typeof window !== 'undefined' && typeof window.atob === 'function') {
      // Client-side
      decoded = decodeURIComponent(
        Array.prototype.map
          .call(window.atob(padded), (c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
    } else if (typeof Buffer !== 'undefined') {
      // Server-side (Node.js)
      decoded = Buffer.from(padded, 'base64').toString('utf-8');
    } else {
      throw new Error('No method available to decode base64.');
    }

    // Parse JSON
    return JSON.parse(decoded);
  } catch (error: any) {
    console.error('Failed to decode JWT payload:', error);
    return null;
  }
}
