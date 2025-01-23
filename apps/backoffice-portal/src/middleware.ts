import { createMiddleware, ROUTES } from '@oxygen/utils';

const middleware = createMiddleware({
  publicPaths: [ROUTES.BACKOFFICE.AUTH],
  apiPrefixes: ['/api/', '/publisher/api/'],
  authRoute: ROUTES.BACKOFFICE.AUTH,
  baseProtectedRoute: ROUTES.BACKOFFICE.HOME,
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
