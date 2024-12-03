const DEFAULT_SALT = process.env.NEXT_PUBLIC_CRYPTO_HASH_KEY ?? 'THIS_IS_SECRET';

/**
 * Simple XOR-based encryption function
 * @param {string} text - The text to be encrypted
 * @param {string} password - The password (key) used for encryption
 * @returns {string} - The encrypted text (base64 encoded)
 */
export function encrypt(text, password = DEFAULT_SALT) {
  let encrypted = '';
  for (let i = 0; i < text.length; i++) {
    encrypted += String.fromCharCode(text.charCodeAt(i) ^ password.charCodeAt(i % password.length));
  }
  return btoa(encrypted); // Base64 encode the result
}

/**
 * Simple XOR-based decryption function
 * @param {string} encryptedText - The encrypted text (base64 encoded)
 * @param {string} password - The password (key) used for decryption
 * @returns {string} - The decrypted text
 */
export function decrypt(encryptedText, password = DEFAULT_SALT) {
  const decoded = atob(encryptedText); // Decode from base64
  let decrypted = '';
  for (let i = 0; i < decoded.length; i++) {
    decrypted += String.fromCharCode(decoded.charCodeAt(i) ^ password.charCodeAt(i % password.length));
  }
  return decrypted;
}
