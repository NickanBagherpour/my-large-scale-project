import { createMiddleware, ROUTES } from '@oxygen/utils';
import { API_PREFIX } from '@oxygen/client';

const middleware = createMiddleware({
  publicPaths: [ROUTES.BACKOFFICE.AUTH],
  apiPrefixes: ['/api/', `/${API_PREFIX.PORTAL}/`],
  authRoute: ROUTES.BACKOFFICE.AUTH,
  baseProtectedRoute: ROUTES.BACKOFFICE.HOME,
  useOnlineValidation: false,
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

export default middleware;
