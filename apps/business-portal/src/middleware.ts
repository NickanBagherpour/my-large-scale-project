import { createMiddleware, ROUTES } from '@oxygen/utils';
import { API_PREFIX } from '@oxygen/client';

const middleware = createMiddleware({
  publicPaths: [ROUTES.BUSINESS.AUTH],
  apiPrefixes: ['/api/', `/${API_PREFIX.PORTAL}/`],
  authRoute: ROUTES.BUSINESS.AUTH,
  baseProtectedRoute: ROUTES.BUSINESS.DASHBOARD,
  useOnlineValidation: false,
});

export default middleware;

export const config = {
  matcher: [
    /*
     * Match all request paths including API routes.
     * This will apply this middleware to all routes.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
