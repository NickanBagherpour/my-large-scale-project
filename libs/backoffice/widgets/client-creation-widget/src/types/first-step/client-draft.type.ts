export type ConvertedClientDraftDataType = {
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
  tagIds: ConvertedTag[];
  organizationInfo: OrganizationInfoType;
};
export type ClientDraftDataType = {
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
  organizationInfo: OrganizationInfoType;
};

interface ConvertedTag {
  key: number;
  label: string;
}

interface Tag {
  code: number;
  title: string;
}

interface OrganizationInfoType {
  organizationId: number;
  organizationName: string;
  organizationNationalId: string;
  isAggregator: boolean;
  aggregatorId: number;
  aggregatorName: string;
  representative: RepresentativeType;
}

interface RepresentativeType {
  nameAndLastName: string;
  mobileNumber: string;
  fixedPhoneNumber: string;
  representativeType: number;
}
