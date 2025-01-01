export enum LocalStorageKey {
  USER = 'user',
  USER_PHOTO = 'user-photo',
  MENU = 'menu',
  CONFIG = 'configuration',
  USER_ORG = 'userOrganization',
  Accounts = 'accounts',
  REQUEST_REGISTRATION = 'requestRegistration',
}

export enum CookieKey {
  SESSION_ID = 'session-id',
  SESSION_TICKET = 'session-ticket',
  S_SESSION_ID = 's-session-id',
  CONFIG = 'configuration',
}

export enum UserType {
  BRANCH_OPERATOR = 'BRANCH_OPERATOR',
  BRANCH_SUPERVISOR = 'BRANCH_SUPERVISOR',
  OPERATION_OFFICE_USER = 'OPERATION_OFFICE_USER',
  NONE = 'NONE',
}

export enum UserRole {
  COMMERCIAL_BANKING_ADMIN = 'commercial-banking-admin',
  BUSINESS_ADMIN = 'business-admin',
}
