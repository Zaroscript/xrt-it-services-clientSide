import NextAuth, { type DefaultSession, type User, type Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

// Extend the built-in session and user types
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
    } & DefaultSession['user'];
  }
}

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Please enter both email and password');
          }

          // Replace this with your actual authentication logic
          if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
            return {
              id: '1',
              name: 'Test User',
              email: 'test@example.com',
              role: 'admin'
            } as User;
          }

          // Return null with an error message
          throw new Error('Invalid email or password');
        } catch (error) {
          console.error('Authentication error:', error);
          // Return null with an error message that will be shown to the user
          throw new Error(error instanceof Error ? error.message : 'Invalid credentials');
        }
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    }
  },
  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/auth/login',
    error: '/error',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
