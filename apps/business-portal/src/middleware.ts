import { createMiddleware, ROUTES } from '@oxygen/utils';

const middleware = createMiddleware({
  publicPaths: [ROUTES.BUSINESS.AUTH],
  apiPrefixes: ['/api/', '/commercial/api/', '/business/api/', '/back-api/'],
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
