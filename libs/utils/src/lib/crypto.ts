// Default salt or key used for XOR operation
const DEFAULT_SALT = process.env.NEXT_PUBLIC_CRYPTO_HASH_KEY ?? 'THIS_IS_SECRE';

export async function encrypt(text: string, password: string = DEFAULT_SALT): Promise<string> {
  const encoder = new TextEncoder();

  // Derive a deterministic salt and IV from the password
  const passwordHash = await crypto.subtle.digest('SHA-256', encoder.encode(password));
  const salt = new Uint8Array(passwordHash).slice(0, 16);
  const iv = new Uint8Array(passwordHash).slice(16, 28);

  // Derive a key from the password
  const passwordKey = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, [
    'deriveBits',
    'deriveKey',
  ]);

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );

  // Encrypt the text
  const ciphertextBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encoder.encode(text)
  );

  // Encode ciphertext as Base64
  return Buffer.from(ciphertextBuffer).toString('base64');
}

export async function decrypt(ciphertext: string, password: string = DEFAULT_SALT): Promise<string> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  // Derive deterministic salt and IV
  const passwordHash = await crypto.subtle.digest('SHA-256', encoder.encode(password));
  const salt = new Uint8Array(passwordHash).slice(0, 16);
  const iv = new Uint8Array(passwordHash).slice(16, 28);

  // Derive a key from the password
  const passwordKey = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, [
    'deriveBits',
    'deriveKey',
  ]);

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );

  // Decode the ciphertext
  const decodedCiphertext = Uint8Array.from(Buffer.from(ciphertext, 'base64'));

  // Decrypt the ciphertext
  const plaintextBuffer = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    decodedCiphertext
  );

  return decoder.decode(plaintextBuffer);
}
