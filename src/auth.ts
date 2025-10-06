import NextAuth, { type DefaultSession, type User, type Session, type NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

// Extend the built-in session and user types
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      role?: string;
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email) {
            throw new Error('Email is required');
          }
          if (!credentials?.password) {
            throw new Error('Password is required');
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

          // If we get here, the credentials are invalid
          console.error('Invalid credentials for email:', credentials.email);
          return null; // Return null to indicate authentication failure
        } catch (error) {
          console.error('Authentication error:', error);
          // Return null with an error message that will be shown to the user
          return null;
        }
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    }
  },
  logger: {
    error(code, metadata) {
      console.error('NextAuth Error:', { code, metadata });
    },
    warn(code) {
      console.warn('NextAuth Warning:', code);
    },
    debug(code, metadata) {
      console.debug('NextAuth Debug:', { code, metadata });
    }
  },
  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
  events: {
    async signIn(message) {
      console.log('User signed in', message);
    },
    async signOut() {
      console.log('User signed out');
    },
    async error(error) {
      console.error('Auth error:', error);
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
