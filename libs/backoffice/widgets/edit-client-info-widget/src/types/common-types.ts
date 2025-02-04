export type ClientInfoType = {
  clientId: number;
  ssoClientId: number;
  clientEnglishName: string;
  clientPersianName: string;
  clientTypeCode: number;
  clientTypeName: string;
  clientKey: string;
  authorizationKey: string;
  websiteUrl: string;
  inboundAddress: string;
  redirectUrl: string;
  isClientFlow: boolean;
  isPasswordFlow: boolean;
  isAuthorizationFlow: boolean;
  isImplicitFlow: boolean;
  isRefreshToken: boolean;
  tagIds: number[];
  organizationInfo: any;
};

export type Tag = {
  key: number;
  label: string;
};

export type GrantValueType = 'ClientFlow' | 'PasswordFlow' | 'AuthorizationFlow' | 'ImplicitFlow' | 'RefreshToken';

export type GrantType = {
  key: GrantValueType;
  label: GrantValueType;
};
