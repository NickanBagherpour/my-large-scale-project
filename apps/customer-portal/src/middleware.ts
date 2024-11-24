import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { auth } from '@oxygen/customer/auth';

import { ROUTES } from '@oxygen/utils';

// Function to check if a URL has the same origin as the request
function isSameOrigin(request: NextRequest, url: string | null): boolean {
  if (!url) return false;
  try {
    return new URL(url).origin === request.nextUrl.origin;
  } catch {
    return false;
  }
}

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const publicPaths = [ROUTES.CUSTOMER.LANDING, ROUTES.CUSTOMER.AUTH]; // Add any specific public paths here

  // Get the current pathname
  const { pathname } = request.nextUrl;

  // Check if the user is trying to access a protected route
  const isProtectedRoute = !publicPaths.some(path => pathname === (path));

  if (isProtectedRoute) {
    // If there is no token, redirect to the login page
    if (!session?.user) {
      return NextResponse.redirect(new URL(ROUTES.CUSTOMER.AUTH, request.url));
    }
  }

  // If the user is authenticated and trying to access public routes, redirect them to the dashboard
  if (session?.user && publicPaths.some(path => pathname === (path))) {
    return NextResponse.redirect(new URL(ROUTES.CUSTOMER.PROFILE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
