import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { User as OxygenUser, userSchema } from '@oxygen/types';
import { JWT } from 'next-auth/jwt';
import { encrypt } from '@oxygen/utils';

declare module 'next-auth' {
  interface User {
    name?: string | null;
    accessToken?: string;
  }

  interface Session {
    user: OxygenUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: OxygenUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        id: { label: 'ID', type: 'text' },
        name: { label: 'Name', type: 'text' },
      },
      async authorize(credentials) {

        if (!credentials.id) {
          throw new Error('No ID provided');
        }

        // Simulate fetching user data (replace with actual logic)
        const user = {
          name: credentials.name || '', // Ensure name is a string
          accessToken: credentials.id.toString(),
        };

        // Validate against the schema
        const parsedUser = userSchema.parse(user);
        return parsedUser; // Return the validated user
      },
    }),
  ],
  // secret: process.env['AUTH_SECRET'],
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  callbacks: {
    async jwt({ token, user }: any) {

      // console.log('-----------------------------------token-----------------------------------', token, user);

      if (user) {
        token.accessToken = user.accessToken; // Store token in JWT
        token.username = user.name; // Store token in JWT
      }
      return token;
    },
    async session({ session, token }: any) {
      // session.user = { ...session.user, name: token.name }; // Only include name or other non-sensitive info
      session.user.accessToken = encrypt(token.accessToken);
      session.user.name = token.username;

      // Object.assign(session.user, token.user ?? {});

      return session;
    },
  },
});
