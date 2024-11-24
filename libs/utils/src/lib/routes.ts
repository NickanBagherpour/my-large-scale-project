export const MAIN_HREF = {
  AUTH: '/auth',
  HOME: '/home',
  LANDING: '/',
};

export const ROUTES = {
  BACKOFFICE: {
    HOME: '/',
    DASHBOARD: '/dashboard',
    APPLICANT_HISTORY: '/applicant-history',
    CLIENT_CREATION: '/client-creation',
    CLIENT_DETAILS: '/client-details',
    CLIENT_HISTORY: '/client-history',
    CLIENT_LIST: '/client-list',
    EDIT_CLIENT_INFO: '/edit-client-info',
    EDIT_APPLICANT_INFO: '/edit-applicant-info',
    EDIT_SERVICE: '/edit-service',
    EDIT_SCOPE: '/edit-scope',
    SCOPE_CREATION: '/scope-creation',
    SCOPE_LIST: '/scope-list',
    SERVICE_HISTORY: '/service-history',
    SERVICE_LIST: '/service-list',
    UPSTREAM_CREATION: '/upstream-creation',
    UPSTREAM_DETAILS: '/upstream-details',
    UPSTREAM_LIST: '/upstream-list',
    SERVICE_CREATION: '/service-creation',
  },
  CUSTOMER: {
    LANDING: '/',
    AUTH: '/authorization',
    DASHBOARD: '/dashboard',
    REQUESTS_MANAGEMENT: '/requests-management',
    REQUEST_CREATION: '/request-creation',
  },
};
export const CUSTOMER_ROUTE_GROUPS = [[ROUTES.CUSTOMER.REQUESTS_MANAGEMENT, ROUTES.CUSTOMER.REQUEST_CREATION]];

export const BACKOFFICE_ROUTE_GROUPS = [
  // ['/dashboard', '/dashboard-report'],
  [
    ROUTES.BACKOFFICE.APPLICANT_HISTORY,
    ROUTES.BACKOFFICE.CLIENT_CREATION,
    ROUTES.BACKOFFICE.CLIENT_DETAILS,
    ROUTES.BACKOFFICE.CLIENT_HISTORY,
    ROUTES.BACKOFFICE.CLIENT_LIST,
    ROUTES.BACKOFFICE.EDIT_CLIENT_INFO,
    ROUTES.BACKOFFICE.EDIT_APPLICANT_INFO,
  ],
  [
    ROUTES.BACKOFFICE.EDIT_SERVICE,
    ROUTES.BACKOFFICE.SERVICE_HISTORY,
    ROUTES.BACKOFFICE.SERVICE_LIST,
    ROUTES.BACKOFFICE.SERVICE_CREATION,
  ],
  [ROUTES.BACKOFFICE.EDIT_SCOPE, ROUTES.BACKOFFICE.SCOPE_CREATION, ROUTES.BACKOFFICE.SCOPE_LIST],
  [ROUTES.BACKOFFICE.UPSTREAM_LIST, ROUTES.BACKOFFICE.UPSTREAM_CREATION],
];
