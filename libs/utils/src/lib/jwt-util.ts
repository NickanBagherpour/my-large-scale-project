import { JwtHeader, JwtPayload, Nullable } from '@oxygen/types';
import jwt, { SignOptions } from 'jsonwebtoken';

// Ensure that the JWT signature secret is available
const JWT_SIGNATURE_SECRET = process.env.JWT_SIGNITURE_SECRET;
// const SSO_JWT_SECRET = process.env.SSO_JWT_SECRET; // SSO's secret or public key

const DEFAULT_ALGORITHM = 'HS256';

/* if (!JWT_SIGNATURE_SECRET) {
  throw new Error('JWT_SIGNITURE_SECRET is not defined in environment variables');
}
 */
/* if (!SSO_JWT_SECRET) {
  throw new Error('SSO_JWT_SECRET is not defined in environment variables');
}
 */

export function decodeJWT2(token: string): { header: JwtHeader; payload: JwtPayload } | null {
  if (!token) {
    console.error('No token provided to decode.');
    return null;
  }

  const parts = token.split('.');

  if (parts.length !== 3) {
    console.error('Invalid JWT format. Expected three parts separated by dots.');
    return null;
  }

  const header = parts[0];
  const payload = parts[1];

  try {
    // Base64URL decode the header
    const base64Header = header.replace(/-/g, '+').replace(/_/g, '/');
    const paddedHeader = base64Header.padEnd(base64Header.length + ((4 - (base64Header.length % 4)) % 4), '=');
    const decodedHeader = Buffer.from(paddedHeader, 'base64').toString('utf-8');

    // Base64URL decode the payload
    const base64Payload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const paddedPayload = base64Payload.padEnd(base64Payload.length + ((4 - (base64Payload.length % 4)) % 4), '=');
    const decodedPayload = Buffer.from(paddedPayload, 'base64').toString('utf-8');

    // Parse JSON
    return {
      header: JSON.parse(decodedHeader),
      payload: JSON.parse(decodedPayload),
    };
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

/**
 * Verifies an incoming SSO JWT token.
 *
 * @param token - The SSO JWT token to verify.
 * @returns The decoded SSO payload if valid.
 * @throws Will throw an error if the token is invalid or verification fails.
 */
export const verifySSOToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SIGNATURE_SECRET, { algorithms: [DEFAULT_ALGORITHM] }) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid SSO token');
  }
};

/**
 * Signs a new JWT token with the provided payload.
 *
 * @param payload - The payload to encode into the new JWT.
 * @param options - Optional signing options (e.g., expiresIn, issuer).
 * @returns The signed JWT as a string.
 */
export const signToken = (payload: any /* JwtPayload */, options?: SignOptions): string => {
  // Define default signing options if not provided
  const signOptions: SignOptions = {
    // expiresIn: '1h', // Token expires in 1 hour
    // algorithm: DEFAULT_ALGORITHM, // Specify the algorithm
    ...options,
  };

  // Sign and return the token
  return jwt.sign(payload, JWT_SIGNATURE_SECRET, signOptions);
};

/**
 * Processes an incoming SSO token by verifying it and re-signing with your secret.
 *
 * @param ssoToken - The incoming SSO JWT token string.
 * @param options - Optional signing options for the new token.
 * @returns The newly signed JWT token string.
 */
export const processAndSignToken = (ssoToken: string, options?: SignOptions): string => {
  // Verify and decode the SSO token

  const decodedPayload = decodeJWT(ssoToken);

  // Optionally, you can manipulate the payload here if needed
  // For example, remove sensitive information or add additional claims

  // Sign a new token with the decoded payload
  const newToken = signToken(decodedPayload?.payload, { ...options, algorithm: decodedPayload?.header?.alg });

  return newToken;
};

export function decodeJWT(token: Nullable<string>): { header: JwtHeader; payload: JwtPayload } | null {
  if (!token) {
    console.error('No token provided to decode.');
    return null;
  }

  // console.log('token in decodeJWT -----------------------------------------------', token);

  const parts = token.split('.');

  if (parts.length !== 3) {
    console.error('Invalid JWT format. Expected three parts separated by dots.');
    return null;
  }

  const [header, payload] = parts;

  try {
    const decodedHeader = decodeBase64Url(header);
    const decodedPayload = decodeBase64Url(payload);

    return {
      header: JSON.parse(decodedHeader),
      payload: JSON.parse(decodedPayload),
    };
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

function decodeBase64Url(input: string): string {
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = 4 - (base64.length % 4);
  if (pad !== 4) {
    base64 += '='.repeat(pad);
  }

  if (typeof window !== 'undefined' && typeof window.atob === 'function') {
    return decodeURIComponent(
      Array.prototype.map
        .call(window.atob(base64), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(base64, 'base64').toString('utf-8');
  } else {
    throw new Error('No base64 decoding method available');
  }
}

export function getRole(decodedToken: JwtPayload | undefined): string | null {
  if (decodedToken?.role) {
    return decodedToken.role?.replace(`${process.env.NEXT_PUBLIC_SSO_CLIENT_KEY}-`, '');
  }

  return null;
}