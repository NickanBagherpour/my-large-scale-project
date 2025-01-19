import { decodeJwt, jwtVerify, SignJWT } from 'jose';
import { JwtPayload, Nullable } from '@oxygen/types';

// Secret key used for signing JWT tokens, encoded using TextEncoder
const JWT_SIGNATURE_SECRET = new TextEncoder().encode(process.env.JWT_SIGNITURE_SECRET as string);

// Default algorithm used for signing JWT tokens
const DEFAULT_ALGORITHM = 'HS256';

/**
 * Signs a new JWT token with the provided payload and optional signing options.
 *
 * @param payload - The payload to be encoded into the JWT. Must be a valid `JwtPayload` object.
 * @param options - Optional signing options such as expiration time (`expiresIn`).
 * @returns A promise that resolves to the signed JWT as a string.
 */
export const signToken = async (payload: JwtPayload, options?: { expiresIn?: string }): Promise<string> => {
  const signOptions = {
    ...options,
  };

  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: DEFAULT_ALGORITHM });
  // .setIssuedAt();

  if (!payload.exp) {
    jwt.setExpirationTime(signOptions.expiresIn || '1h');
  }

  // if (!payload.iss) {
  //   jwt.setIssuer(signOptions.issuer);
  // }

  return await jwt.sign(JWT_SIGNATURE_SECRET);
};

/**
 * Processes and verifies an incoming SSO token, then re-signs it with your JWT signature secret.
 *
 * @param ssoToken - The incoming JWT token string (typically from an SSO system).
 * @param options - Optional signing options for the new token (e.g., expiration time).
 * @returns A promise that resolves to the newly signed JWT token string.
 * @throws Will throw an error if the decoded token is invalid.
 */
export const processAndSignToken = async (ssoToken: string, options?: { expiresIn?: string }): Promise<string> => {
  const decodedToken = decodeToken(sanitizeJwt(ssoToken));

  if (!decodedToken) {
    throw new Error('Invalid decoded payload: payload is undefined.');
  }

  return await signToken(decodedToken, options);
};

/**
 * Processes an incoming SSO token, verifies it, updates its scopes, and re-signs it with your JWT signature secret.
 *
 * @param ssoToken - The incoming JWT token string (typically from an SSO system).
 * @param scopes - Optional list of scopes to attach to the new token, as a string (space-separated).
 * @param options - Optional signing options (e.g., expiration time).
 * @returns A promise that resolves to the newly signed JWT token string with updated scopes.
 * @throws Will throw an error if the decoded token is invalid.
 */
export const processAndSignTokenWithScopes = async (ssoToken: string, scopes?: string, options?: {
  expiresIn?: string
}): Promise<string> => {
  const decodedToken = decodeToken(ssoToken);

  if (!decodedToken) {
    throw new Error('Invalid decoded payload: payload is undefined.');
  }

  if (decodedToken?.scopes) {
    decodedToken.scopes = scopes?.split('+') ?? [];
  }

  return await signToken(decodedToken, options);
};

/**
 * Decodes a JWT token (header and payload) without verifying its signature.
 *
 * @param token - The JWT token string to decode. If the token is in 'Bearer' format, it will be sanitized.
 * @returns The decoded payload of the JWT, or null if decoding fails.
 */
export function decodeToken(token: Nullable<string>): JwtPayload | null {
  if (!token) {
    console.error('No token provided to decode.');
    return null;
  }

  try {

    const plainToken = sanitizeJwt(token.replace('Bearer', '').trim());

    const decoded = decodeJwt(plainToken);

    if (!decoded) {
      console.error('Invalid JWT or decode failed.');
      return null;
    }

    return decoded as JwtPayload;

  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

/**
 * Converts a base64-encoded string to base64url format by replacing special characters.
 *
 * @param str - The base64-encoded string to convert.
 * @returns The string converted to base64url format.
 */
export function toBase64Url(str: string): string {
  return str
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Sanitizes the JWT token to ensure it is in base64url format.
 * Throws an error if the token structure is invalid (i.e., not having 3 segments).
 *
 * @param token - The raw JWT string to sanitize. It should have 3 segments (header, payload, signature).
 * @returns The sanitized JWT token in proper base64url format.
 * @throws Will throw an error if the JWT structure is invalid.
 */
export function sanitizeJwt(token: string): string {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT structure; expected 3 segments (header.payload.signature)');
  }

  const [header, payload, signature] = parts;
  const fixedHeader = toBase64Url(header);
  const fixedPayload = toBase64Url(payload);
  const fixedSignature = toBase64Url(signature);

  return `${fixedHeader}.${fixedPayload}.${fixedSignature}`;
}

/**
 * Validates the given JWT token by sanitizing it, verifying its signature, and checking its claims.
 *
 * @param token - The raw JWT token string to validate.
 * @returns The decoded payload if the token is valid, or null if validation fails.
 * @throws Will throw an error if the token is invalid or expired.
 */
export async function validateToken(token: string): Promise<JwtPayload | null> {
  try {
    // Verify the token using the secret and specified algorithm
    const { payload } = await jwtVerify(sanitizeJwt(token), JWT_SIGNATURE_SECRET, {
      algorithms: [DEFAULT_ALGORITHM],
      clockTolerance: Number.MAX_VALUE,
      // requiredClaims: ['client_id', 'scopes', 'exp', 'ssn', 'role'],
    });

    if (!payload) {
      console.error('Token validation failed: payload is undefined.');
      return null;
    }

    if (!payload.exp || payload.exp < Date.now()) {
      console.error('Token validation failed: token is expired.');
      return null;
    }

    return payload as JwtPayload;
  } catch (error) {
    console.error('Token validation failed:', error);
    return null;
  }
}

/**
 * Extracts the role from the decoded JWT payload, if available.
 * The role will be sanitized by removing the client prefix.
 *
 * @param decodedToken - The decoded JWT payload.
 * @returns The sanitized role string, or null if the role is not present.
 */
export function getRole(decodedToken: JwtPayload | null): string | null {
  if (decodedToken?.role) {
    return decodedToken.role?.replace(`${process.env.NEXT_PUBLIC_SSO_CLIENT_KEY}-`, '');
  }

  return null;
}
