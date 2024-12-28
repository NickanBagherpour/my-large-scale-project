import { User as AuthUser } from 'next-auth';
import { z } from 'zod';

export const userSchema = z.object({
  // hashedPassword: z.string().optional(),
  accessToken: z.string().optional(),
  name: z.string().optional(),
});

export type User = AuthUser & z.infer<typeof userSchema>;

export interface UserToken {
  email?: string;
  image?: string | null;
  exp: number;
  accessToken: string;
}

export type UserSession = UserToken; //change interface to type becuse lint error

/**
 * Interface representing the payload of a JWT.
 */
export interface JwtPayload {
  grant: string;

  iss: string;

  aud: string;

  exp: number;

  nbf: number;

  role: string;

  serial: string;

  ssn: string;

  client_id: string;

  scopes: string[];
}

export enum BusinessUserRole {
  COMMERCIAL_BANKING_ADMIN = 'commercial-banking-admin',
  BUSINESS_ADMIN = 'business-admin',
}
