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

  const publicPaths = [ROUTES.CUSTOMER.LANDING, ROUTES.CUSTOMER.AUTH]; // Define public paths here

  // Get the current pathname
  const { pathname } = request.nextUrl;

  // Check if the user is trying to access a protected route
  const isProtectedRoute = !publicPaths.some((path) => pathname === path);

  /*
    // Handle API routes
    if (pathname.startsWith('/api/')) {
      const token = decrypt(session?.user?.accessToken ?? '');
      // If token exists, set it in the Authorization header
      // if (token) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>hi middleware  with /api/<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', token);
      const modifiedRequest = request.clone(); // Clone the request to modify it
      modifiedRequest.headers.set('Authorization', `Bearer ${token}`);
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>hi middleware  with /api/ modified<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', modifiedRequest);
      return NextResponse.next(modifiedRequest); // Proceed with the modified request
      // }

      // Optionally, you might want to handle unauthorized access for API routes
      // return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    */

  // Handle non-API routes
  if (isProtectedRoute) {
    console.log('>>>>>>', session);
    // If there is no session user, redirect to the login page
    if (!session?.user) {
      return NextResponse.redirect(new URL(ROUTES.CUSTOMER.AUTH, request.url));
    }
  }

  // If the user is authenticated and trying to access public routes, redirect them to the dashboard
  if (session?.user && publicPaths.some((path) => pathname === path)) {
    return NextResponse.redirect(new URL(ROUTES.CUSTOMER.REQUEST_MANAGEMENT, request.url));
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
