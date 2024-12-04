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
