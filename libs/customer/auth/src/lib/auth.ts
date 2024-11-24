import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { User } from '@oxygen/types';

declare module 'next-auth' {
  interface User {
    accessToken?: string;
  }

  interface Session {
    user: User;
  }
}

/*declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
  }
}*/

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        id: { label: 'ID', type: 'text' },
        name: { label: 'name', type: 'text' },
      },
      async authorize(credentials) {
        // console.error(
        //   'Credentials authorize---------------------------------------------------------------------',
        //   credentials,
        // );

        // Your authorization logic here
        if (!credentials.id) {
          throw new Error('No ID provided');
        }

        // Simulate fetching user data
        const user = { name: credentials.name, accessToken: credentials.id.toString() };
        return user;
      },
    }),
  ],
  secret: process.env['AUTH_SECRET'],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      // console.error('callbacks jwt ---------------------------------------------------------------------', token, user);

      if (user) {
        // token.accessToken = user.accessToken; // Store token in JWT
      }
      return token;
    },
    async session({ session, token }) {
      // console.error('callbacks session session---------------------------------------------------------------------', session);
      // console.error('callbacks session token---------------------------------------------------------------------', token);

      // session.accessToken = token.accessToken; // Pass token to session
      return session;
    },
  },
});
