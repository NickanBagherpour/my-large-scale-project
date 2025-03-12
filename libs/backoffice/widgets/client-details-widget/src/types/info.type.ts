export type ClientInfo = {
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
  tagIds: { code: number; title: string }[];
  description: string;
  organizationInfo: {
    organizationId: number;
    organizationName: string;
    organizationNationalId: string;
    isAggregator: boolean;
    aggregatorId: number;
    aggregatorName: string;
    representative: {
      nameAndLastName: string;
      mobileNumber: string;
      fixedPhoneNumber: string;
      representativeType: number;
    }[];
  } | null;
};

export type ClientTypes = {
  code: number;
  title: string;
}[];
