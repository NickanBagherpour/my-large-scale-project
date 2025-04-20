import { NextResponse, NextRequest } from 'next/server';
import { CookieKey, IMiddlewareConfig } from '@oxygen/types';
import { validateTokenOffline, validateTokenOnline } from './token-validation';

/**
 * Creates a configurable middleware function for Next.js applications
 *
 * @param {IMiddlewareConfig} config - Configuration object for middleware
 * @returns {(request: NextRequest) => Promise<NextResponse>} - Middleware function for Next.js
 */
export function createMiddleware(config: IMiddlewareConfig) {
  return async function middleware(request: NextRequest): Promise<NextResponse> {
    const token = request.cookies.get(CookieKey.SESSION_ID)?.value;
    const { pathname } = request.nextUrl;

    console.log('request.nextUrl-------------> ', request.nextUrl);
    const isProtectedRoute = !config.publicPaths.some((path) => pathname === path);
    const isApiRoute = config.apiPrefixes.some((prefix) => pathname.startsWith(prefix));

    if (isApiRoute) {
      if (pathname.startsWith('/api/auth/')) {
        return NextResponse.next();
      }

      const signedToken = request.cookies.get(CookieKey.S_SESSION_ID)?.value;
      const isTokenValid = config.useOnlineValidation
        ? await validateTokenOnline(signedToken)
        : await validateTokenOffline(signedToken);

      if (!isTokenValid) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      return NextResponse.next();
    }

    if (isProtectedRoute && !token) {
      return NextResponse.redirect(new URL(config.authRoute, request.url));
    }

    if (token && config.publicPaths.some((path) => pathname === path)) {
      return NextResponse.redirect(new URL(config.baseProtectedRoute, request.url));
    }

    return NextResponse.next();
  };
}
