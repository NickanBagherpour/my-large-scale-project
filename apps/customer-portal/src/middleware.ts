import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { ROUTES } from '@oxygen/utils';
import { CookieKey } from '@oxygen/types';

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get(CookieKey.SESSION_ID)?.value;

  const publicPaths = [
    ROUTES.CUSTOMER.LANDING,
    ROUTES.CUSTOMER.AUTH,
    ROUTES.CUSTOMER.DOCS_API,
    '/assets/images/service-categories.jpg',
  ]; // Define public paths here

  // Get the current pathname
  const { pathname } = request.nextUrl;

  // Check if the user is trying to access a protected route
  const isProtectedRoute = !publicPaths.some((path) => pathname === path);

  // Handle non-API routes
  if (isProtectedRoute) {
    // If there is no session user, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL(ROUTES.CUSTOMER.AUTH, request.url));
    }
  }

  // If the user is authenticated and trying to access public routes, redirect them to the dashboard
  if (
    token &&
    publicPaths.some(
      (path) =>
        pathname === path &&
        pathname !== ROUTES.CUSTOMER.DOCS_API &&
        pathname !== '/assets/images/service-categories.jpg'
    )
  ) {
    return NextResponse.redirect(new URL(ROUTES.CUSTOMER.DASHBOARD, request.url));
  }

  return NextResponse.next(); // Proceed with the original request for non-protected routes
}

export const config = {
  matcher: [
    /*
     * Match all request paths including API routes.
     * This will apply this middleware to all routes.
     */
    '/((?!api|back-api|_next/static|_next/image|favicon.ico).*)',
  ],
};
