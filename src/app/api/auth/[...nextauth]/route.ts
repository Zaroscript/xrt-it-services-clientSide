import NextAuth from 'next-auth';
import { authOptions } from '@/auth';
import { NextResponse } from 'next/server';

const handler = async (req: Request, ctx: any) => {
  try {
    return await NextAuth(authOptions)(req, ctx);
  } catch (error) {
    console.error('Auth API Error:', error);
    return NextResponse.json(
      { error: 'Authentication error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
};

export { handler as GET, handler as POST };
