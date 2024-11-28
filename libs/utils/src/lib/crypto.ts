// Default salt or key used for XOR operation
const DEFAULT_SALT = process.env.NEXT_PUBLIC_CRYPTO_HASH_KEY ?? 'THIS_IS_SECRE';

// Function to encrypt a plaintext string using XOR
export function encrypt(plaintext: string, secretKey?: string): string {
  /*  const salt = secretKey ?? DEFAULT_SALT;
    let ciphertext = '';

    for (let i = 0; i < plaintext.length; i++) {
      // XOR each character with the corresponding character of the salt
      ciphertext += String.fromCharCode(plaintext.charCodeAt(i) ^ salt.charCodeAt(i % salt.length));
    }

    return ciphertext; // Return the encrypted string directly*/

  return plaintext;

}

// Function to decrypt a ciphertext string using XOR
export function decrypt(ciphertext: string, secretKey?: string): string {
  /*  const salt = secretKey ?? DEFAULT_SALT;
    let plaintext = '';

    for (let i = 0; i < ciphertext.length; i++) {
      // XOR each character with the corresponding character of the salt
      plaintext += String.fromCharCode(ciphertext.charCodeAt(i) ^ salt.charCodeAt(i % salt.length));
    }

    return plaintext; // Return the decrypted plaintext*/

  return ciphertext;

}
