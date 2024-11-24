import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        id: { label: 'ID', type: 'text' },
      },
      async authorize(credentials) {
        console.error(
          'Credentials authorize---------------------------------------------------------------------',
          credentials
        );

        // Your authorization logic here
        if (!credentials.id) {
          throw new Error('No ID provided');
        }

        // Simulate fetching user data
        const user = { id: credentials.id, accessToken: 'your-token-here' };
        return user;
      },
    }),
  ],
  secret: process.env['AUTH_SECRET'],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      console.error('callbacks ---------------------------------------------------------------------', token, user);

      if (user) {
        // token.accessToken = user.accessToken; // Store token in JWT
      }
      return token;
    },
    async session({ session, token }) {
      console.error('session ---------------------------------------------------------------------', session, token);

      // session.accessToken = token.accessToken; // Pass token to session
      return session;
    },
  },
});
