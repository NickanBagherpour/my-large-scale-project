import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { decrypt, encrypt, ROUTES } from '@oxygen/utils';
import { cookies } from 'next/headers';
import { CookieKey } from '@oxygen/types';

// Function to check if a URL has the same origin as the request
function isSameOrigin(request: NextRequest, url: string | null): boolean {
  if (!url) return false;
  try {
    return new URL(url).origin === request.nextUrl.origin;
  } catch {
    return false;
  }
}

// Function to call the custom /api/auth/validate route
async function validateToken(token: string | undefined): Promise<boolean> {
  if (!token) {
    return false; // Token is missing, consider it invalid
  }

  try {
    // Call the custom API route for token validation
    const response = await fetch('/api/auth/validate', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${decrypt(token)}`,
      },
    });

    const result = await response.json();

    // Return true if token is valid, false otherwise
    return result.success === true;
  } catch (error) {
    console.error('Error during token validation:', error);
    return false; // Consider error as invalid token
  }
}

export default async function middleware(request: NextRequest) {
  // const session = await auth();

  const token = cookies().get(CookieKey.SESSION_ID)?.value;

  const publicPaths = [ROUTES.BACKOFFICE.AUTH]; // Define public paths here

  // Get the current pathname
  const { pathname } = request.nextUrl;

  // Check if the user is trying to access a protected route
  const isProtectedRoute = !publicPaths.some(path => pathname === path);

  // If the request is for an API route
  if (pathname.startsWith('/api/')) {
    // Skip validation for /api/auth/ routes
    if (pathname.startsWith('/api/auth/')) {
      return NextResponse.next(); // Allow the request to pass through
    }

    // Validate token for other /api/ routes by calling the external validation service
    const isTokenValid = await validateToken(token);

    if (!isTokenValid) {
      console.log('Invalid token, signing out...');

      // If the token is invalid, return a 401 response
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // // If the token is valid, proceed with the request
    // const modifiedRequest = request.clone(); // Clone the request to modify it
    // modifiedRequest.headers.set('Authorization', `Bearer ${token}`);
    // return NextResponse.next(modifiedRequest); // Proceed with the modified request

    return NextResponse.next();
  }

  // Handle non-API routes
  if (isProtectedRoute) {
    // If there is no session user, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL(ROUTES.BACKOFFICE.AUTH, request.url));
    }
  }

  // If the user is authenticated and trying to access public routes, redirect them to the dashboard
  if (token && publicPaths.some(path => pathname === path)) {
    return NextResponse.redirect(new URL(ROUTES.BACKOFFICE.HOME, request.url));
  }

  return NextResponse.next(); // Proceed with the original request for non-protected routes
}

export const config = {
  matcher: [
    /*
     * Match all request paths including API routes.
     * This will apply this middleware to all routes.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
