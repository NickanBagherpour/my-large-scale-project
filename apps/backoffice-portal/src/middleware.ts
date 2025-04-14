import { createMiddleware, ROUTES } from '@oxygen/utils';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_PREFIX } from '@oxygen/client';

// Enhanced logger configuration
const logger = {
  log: (message: string, data?: Record<string, unknown>) => {
    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_PROD_LOGS === 'true') {
      console.log(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          level: 'INFO',
          message,
          ...data,
        }),
      );
    }
  },
  error: (message: string, error?: unknown) => {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'ERROR',
        message,
        error: error instanceof Error ? error.message : String(error),
        stack: process.env.NODE_ENV !== 'production' && error instanceof Error ? error.stack : undefined,
      }),
    );
  },
};

// Create the original Oxygen middleware instance
const oxygenMiddleware = createMiddleware({
  publicPaths: [ROUTES.BACKOFFICE.AUTH],
  apiPrefixes: ['/api/', `/${API_PREFIX.PORTAL}/`],
  authRoute: ROUTES.BACKOFFICE.AUTH,
  baseProtectedRoute: ROUTES.BACKOFFICE.HOME,
  useOnlineValidation: false,
});

// Enhanced middleware with logging
export default async function middleware(request: NextRequest) {
  const startTime = Date.now();
  const { nextUrl, method, headers } = request;
  const requestId = headers.get('x-request-id') || crypto.randomUUID();

  try {
    // Log request start
    logger.log('Request started', {
      requestId,
      type: 'request-start',
      method,
      path: nextUrl.pathname,
      query: Object.fromEntries(nextUrl.searchParams),
      // ip,
      // country: geo?.country,
      userAgent: headers.get('user-agent'),
      referrer: headers.get('referer'),
    });

    // Process request through Oxygen middleware
    const response = await oxygenMiddleware(request);

    // Calculate response time
    const durationMs = Date.now() - startTime;

    // Log response
    logger.log('Request completed', {
      requestId,
      type: 'request-complete',
      status: response.status,
      statusText: response.statusText,
      durationMs,
      redirected: response.redirected,
      destination: response.headers.get('location'),
      cache: response.headers.get('cache-control'),
    });

    // Add request ID to response headers
    response.headers.set('x-request-id', requestId);

    return response;
  } catch (error) {
    // Log errors
    logger.error('Middleware processing failed', {
      requestId,
      type: 'request-error',
      method,
      path: nextUrl.pathname,
      durationMs: Date.now() - startTime,
      error,
    });

    // Return error response while preserving the request ID
    const errorResponse = NextResponse.next({
      status: 500,
      request: {
        headers: new Headers({ 'x-request-id': requestId }),
      },
    });
    return errorResponse;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
