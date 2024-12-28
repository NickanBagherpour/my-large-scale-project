import { ENV_CONSTANTS } from './env';

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