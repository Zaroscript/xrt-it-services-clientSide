import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';

const publicRoutes: string[] = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/_next',
  '/favicon.ico'
];

const protectedRoutes: string[] = [
  '/profile',
  '/settings',
  '/billing'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET || 'your-secret-key'
    });

    // If no token and trying to access protected route, redirect to login
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (authentication pages)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth/).*)',
  ],
};
