import { NextResponse, NextRequest } from 'next/server';
import type {} from 'next/server';
import { headers } from 'next/headers';

import { decrypt, ROUTES, validateToken as JwtUtilValidateToken } from '@oxygen/utils';
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
async function validateTokenOnline(token: string | undefined): Promise<boolean> {
  const host = headers().get('host');
  const protocol = /*process.env.NODE_ENV === 'production' ? 'https' : */ 'http';
  const baseUrl = `${protocol}://${host}`;

  if (!token) {
    return false; // Token is missing, consider it invalid
  }

  try {
    // Call the custom API route for token validation
    const response = await fetch(`${baseUrl}/api/auth/validate`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${decrypt(token)}`,
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

export async function validateTokenOffline(token: string | undefined, pathname?: string): Promise<boolean> {
  if (!token) {
    return false; // Token is missing, consider it invalid
  }

  console.log('pathname in validateToken:', pathname);

  try {
    // Decrypt the token if your logic requires it
    // (assuming the `decrypt` function exists in your codebase)
    const decrypted = decrypt(token);

    // Call your local validateToken, which returns `JwtPayload | null`
    const decodedPayload = await JwtUtilValidateToken(decrypted);
    console.log('validated token in middleware:', decodedPayload);

    // If decodedPayload is not null, and has exp key , the token is valid
    //time is checked in the validateToken function
    return decodedPayload != null && decodedPayload.exp > 0;
    // return decodedPayload != null && decodedPayload.exp > Date.now();
  } catch (error) {
    console.error('Error during token validation:', error);
    return false; // Consider error as invalid token
  }
}

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get(CookieKey.SESSION_ID)?.value;

  const publicPaths = [ROUTES.BUSINESS.AUTH]; // Define public paths here
  const apiPrefixes = ['/api/', '/commercial/api/', '/business/api/', '/back-api/'];

  // Get the current pathname
  const { pathname } = request.nextUrl;

  // Check if the user is trying to access a protected route
  const isProtectedRoute = !publicPaths.some((path) => pathname === path);

  const isApiRoute = apiPrefixes.some((prefix) => pathname.startsWith(prefix));

  // If the request is for an API route
  if (isApiRoute) {
    // Skip validation for /api/auth/ routes
    if (pathname.startsWith('/api/auth/')) {
      return NextResponse.next(); // Allow the request to pass through
    }

    const signedToken = request.cookies.get(CookieKey.S_SESSION_ID)?.value;
    // Validate token for other /api/ routes by calling the external validation service
    // const isTokenValid = await validateTokenOnline(signedToken);  //fixme work on validation token
    const isTokenValid = await validateTokenOffline(signedToken, pathname); //fixme work on validation token

    if (!isTokenValid) {
      console.log('Invalid token, signing out...');

      // If the token is invalid, return a 401 response
      //fixme work on unauthorized response message translation
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
      return NextResponse.redirect(new URL(ROUTES.BUSINESS.AUTH, request.url));
    }
  }

  // If the user is authenticated and trying to access public routes, redirect them to the dashboard
  if (token && publicPaths.some((path) => pathname === path)) {
    return NextResponse.redirect(new URL(ROUTES.BUSINESS.DASHBOARD, request.url));
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
