import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';

// Public routes that don't require authentication
const publicRoutes: string[] = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/pending-approval',
  '/_next',
  '/favicon.ico',
  '/api/auth',
  '/_error',
  '/404'
];

// Routes that require authentication but no specific role
const protectedRoutes: string[] = [
  '/dashboard',
  '/profile',
  '/settings',
  '/billing'
];

// Admin-only routes
const adminRoutes: string[] = [
  '/admin',
  '/admin/users',
  '/admin/settings'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

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

  // Check if user is approved
  if (!token.isApproved) {
    // Allow access to pending approval page
    if (pathname !== '/auth/pending-approval') {
      const pendingApprovalUrl = new URL('/auth/pending-approval', request.url);
      return NextResponse.redirect(pendingApprovalUrl);
    }
    return NextResponse.next();
  }

  // Check admin routes
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  if (isAdminRoute && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/403', request.url));
  }

  // Check protected routes (already verified token exists)
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  if (isProtectedRoute) {
    return NextResponse.next();
  }

  // Allow all other routes for authenticated users
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
