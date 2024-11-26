import CryptoJS from 'crypto-js';

const DEFAULT_SALT = process.env.NEXT_PUBLIC_CRYPTO_HASH_KEY ?? "THIS_IS_SECRE";
// Function to encrypt a plaintext string
export function encrypt(plaintext: string, secretKey?: string): string {
  const salt = secretKey ??  DEFAULT_SALT;
  // Encrypt the plaintext using AES algorithm and the provided secret key
  const ciphertext = CryptoJS.AES.encrypt(plaintext, salt).toString();
  return ciphertext; // Return the encrypted string
}

// Function to decrypt a ciphertext string
export function decrypt(ciphertext: string, secretKey?: string): string {
  const salt = secretKey ?? DEFAULT_SALT;
  // Decrypt the ciphertext using AES algorithm and the same secret key
  const bytes = CryptoJS.AES.decrypt(ciphertext, salt);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8); // Convert bytes to UTF-8 string
  return decryptedText; // Return the decrypted plaintext
}
