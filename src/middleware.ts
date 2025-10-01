import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';

// List of paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/profile',
  // Add more protected paths here
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  );

  // If it's not a protected path, continue
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // Check for token in the request
  const token = await getToken({ req: request });
  
  // If no token and trying to access protected route, redirect to signin
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(signInUrl);
  }

  // If token exists, continue with the request
  return NextResponse.next();
}

// For now, we'll protect all routes except auth and public assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/ (authentication pages)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|auth/).*)',
  ],
};
