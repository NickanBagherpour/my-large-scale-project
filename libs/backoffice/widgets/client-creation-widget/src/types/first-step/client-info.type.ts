interface ClientStatus {
  code: number;
  title: string;
}

interface Tag {
  code: number;
  title: string;
}

interface Representative {
  nameAndLastName: string;
  mobileNumber: string;
  fixedPhoneNumber: string;
  representativeType: number;
}

interface OrganizationInfo {
  organizationId: number;
  organizationName: string;
  organizationNationalId: string;
  isAggregator: boolean;
  aggregatorId: number;
  aggregatorName: string;
  representative: Representative;
}

interface ClientInfoType {
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
  tagIds: Tag[];
  status: ClientStatus;
  organizationInfo: OrganizationInfo;
}

interface SSOInfoType {
  applicationName: string;
  uri: string;
  scopes: number[];
  organizationName: string;
  nationalId: string;
  inboundAddress: string;
  redirectingUri: string;
  contactPersonName: string;
  contactPersonCell: string;
  contactPersonEmail: string;
  contactPersonFax: string;
  oauthKey: string;
  authorizationCodeFlow: boolean;
  implicitFlow: boolean;
  passwordFlow: boolean;
  clientFlow: boolean;
  getsRefreshToken: boolean;
  description: string;
  id: number;
  type: number;
}

export type ClientInfoResponseType = {
  status: number;
  clientInfo: ClientInfoType;
  ssoInfo: SSOInfoType;
};
