export type GrantValueType = 'ClientFlow' | 'PasswordFlow' | 'AuthorizationFlow' | 'ImplicitFlow' | 'RefreshToken';

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
  organizationInfo: any;
  activeTagIds: Tag[];
  activeGrantType: GrantType[];
};

export type Tag = {
  key: number;
  label: string;
};

export type Client = {
  value: number;
  label: string;
};

export type TagType = Tag[];

export type clientType = Client[];

export type GrantType = {
  key: GrantValueType;
  label: GrantValueType;
};
