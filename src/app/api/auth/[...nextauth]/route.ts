import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { UserRole } from '@/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

import type { JWT } from 'next-auth/jwt';

const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password');
        }

        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            credentials: 'include' // Important for cookies
          });

          const data = await response.json();
          
          if (!response.ok) {
            // If the account is pending approval, return the user with isApproved: false
            if (response.status === 403 && data.message?.includes('pending approval')) {
              return {
                id: data.user?._id || 'pending-user',
                email: credentials.email,
                isApproved: false,
                role: data.user?.role || 'user',
                accessToken: data.tokens?.accessToken || '',
                refreshToken: data.tokens?.refreshToken || ''
              };
            }
            throw new Error(data.message || 'Authentication failed');
          }

          // Extract user data and tokens from the response
          const userData = data.data?.user || data.user || data;
          const tokens = data.data?.tokens || data.tokens || {};

          if (!userData || !tokens.accessToken) {
            throw new Error('Invalid response from authentication server');
          }

          // Return the user object that will be encoded in the JWT
          return {
            id: userData._id || userData.id,
            email: userData.email,
            name: userData.name || `${userData.fName || ''} ${userData.lName || ''}`.trim(),
            role: userData.role || 'user',
            isApproved: userData.isApproved !== undefined ? userData.isApproved : true,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
          };
        } catch (error: any) {
          console.error('Authentication error:', error);
          // If it's our custom pending approval error, rethrow it
          if (error.name === 'PendingApproval') {
            throw error;
          }
          throw new Error(error.message || 'Authentication failed');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user?: any; account?: any }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          role: user.role,
          isApproved: user.isApproved !== false, // Default to true if not set
        };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.sub!,
          role: token.role as UserRole,
          isApproved: token.isApproved as boolean,
          accessToken: token.accessToken as string,
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Prevent redirecting to login for unauthorized access
      if (url.startsWith('/auth/login')) {
        return baseUrl;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      },
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };