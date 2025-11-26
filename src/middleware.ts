import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public paths that don't require authentication
const publicPaths = [
  "/",
  "/about",
  "/services",
  "/pricing",
  "/contact",
  "/auth/login",
  "/auth/signup",
  "/auth/forgetpassword",
  "/auth/reset-password",
  "/_next",
  "/favicon.ico",
  "/api",
];

// Paths that require authentication
const protectedPaths = [
  "/dashboard",
  "/profile",
  "/settings",
  "/billing",
  "/account",
];

// Paths that are only accessible when not authenticated
const guestOnlyPaths = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgetpassword",
  "/auth/reset-password",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const isGuestOnlyPath = guestOnlyPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // Get the token from cookies
  const token = request.cookies.get("auth_token")?.value;
  const isAuthenticated = !!token;

  // Handle API routes
  if (pathname.startsWith("/api/")) {
    // Add CORS headers for API routes
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return response;
  }

  // Allow access to public paths and non-protected paths
  if (isPublicPath || !isProtectedPath) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from guest-only pages
  if (isGuestOnlyPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Handle protected paths when not authenticated
  if (isProtectedPath && !isAuthenticated) {
    // If already on the login page, just continue
    if (pathname.startsWith("/auth/")) {
      return NextResponse.next();
    }

    // Redirect to login without any 'from' parameter
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If authenticated and trying to access login page, redirect to dashboard
  if (pathname.startsWith("/auth/") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // For all other cases, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public folder
    "/((?!_next/static|_next/image|favicon.ico|.*.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
