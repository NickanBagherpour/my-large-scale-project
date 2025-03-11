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
  code: number;
  title: string;
};

export type Client = {
  value: number;
  label: string;
};

export type TagType = Tag[];

export type clientType = Client[];

export type GrantType = {
  code: GrantValueType;
  title: GrantValueType;
};
