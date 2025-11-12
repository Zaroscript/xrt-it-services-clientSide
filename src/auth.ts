import NextAuth, { type DefaultSession, type Session, type NextAuthOptions, type User as NextAuthUser } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';


export type UserRole = 'user' | 'admin' | 'moderator'; 
// Extend the built-in User type
declare module 'next-auth' {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: UserRole;
    isApproved?: boolean;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
      isApproved?: boolean;
      accessToken: string;
      refreshToken: string;
      email?: string | null;
    } & Omit<DefaultSession['user'], 'name' | 'image'>;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    isApproved?: boolean;
    accessToken: string;
    refreshToken: string;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Function to fetch user data from the backend
async function fetchUserData(accessToken: string) {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data.data?.user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

// Event callbacks for NextAuth
declare module 'next-auth' {
  interface EventCallbacks {
    error: (error: Error) => void;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid profile email',
        },
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        type: { label: 'Type', type: 'text' }, // 'login' or 'register'
        fName: { label: 'First Name', type: 'text', required: false },
        lName: { label: 'Last Name', type: 'text', required: false },
        phone: { label: 'Phone', type: 'text', required: false }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email) throw new Error('Email is required');
          if (!credentials?.password) throw new Error('Password is required');

          const endpoint = credentials.type === 'register' ? '/auth/register' : '/auth/login';
          
          const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              ...(credentials.type === 'register' && {
                fName: credentials.fName || '',
                lName: credentials.lName || '',
                phone: credentials.phone || ''
              })
            }),
          });

          const data = await response.json().catch(() => ({}));

          if (!response.ok) {
            // Handle specific HTTP status codes
            if (response.status === 401) {
              throw new Error('Invalid email or password');
            }
            if (response.status === 403) {
              throw new Error('Account not approved');
            }
            throw new Error(data.message || 'Authentication failed');
          }

          const user = data.data?.user || data.user || data;
          const token = data.token || data.accessToken;

          if (!user || !token) {
            throw new Error('No user data returned from server');
          }

          // Check if user is approved
          if (credentials.type !== 'register' && !user.isApproved) {
            throw new Error('pending_approval');
          }

          return {
            id: user.id,
            name: user.name || `${user.fName || ''} ${user.lName || ''}`.trim() || user.email,
            email: user.email,
            role: user.role || 'user',
            isApproved: user.isApproved || false,
            accessToken: token,
            refreshToken: data.refreshToken || '',
          };
        } catch (error: any) {
          console.error('Authentication error:', error);
          // Return null to indicate authentication failure
          // NextAuth will handle the error and redirect to the error page
          return null;
        }
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async signIn(message) {
      // Handle successful sign in
      if (message.isNewUser) {
        // New user registered
      }
    },
    async signOut() {
      // Handle user sign out
    },
    async error(error) {
      console.error('Auth error:', error);
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          id: user.id,
          role: user.role,
          isApproved: user.isApproved,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            role: token.role,
            isApproved: token.isApproved,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
          },
        };
      }
      return session;
    },
  },
  logger: {
    error(code: string, metadata: any) {
      console.error('NextAuth Error:', { code, metadata });
    },
    warn(code: string) {
      console.warn('NextAuth Warning:', code);
    },
    debug(code: string, metadata: any) {
      console.debug('NextAuth Debug:', { code, metadata });
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
