import { type DefaultSession, type Session } from "next-auth"
import { type JWT } from "next-auth/jwt"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
    } & DefaultSession["user"]
  }
}

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password')
        }

        // TODO: Replace with your actual user authentication logic
        // This is a placeholder that will always fail authentication
        // In a real app, you would check against your database here
        throw new Error('Authentication not implemented')
        
        // Example of what a successful authentication might look like:
        // return {
        //   id: '1',
        //   email: credentials.email,
        //   name: 'Test User'
        // }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development'
}
