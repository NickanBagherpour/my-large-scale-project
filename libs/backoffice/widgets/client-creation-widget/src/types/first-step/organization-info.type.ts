export type OrganizationInfoResponceType = {
  organizationId: number;
  organizationName: string;
  organizationNationalId: string;
  isAggregator: boolean;
  aggregatorId: number;
  aggregatorName: string;
  representative: RepresentativeType;
};

export type RepresentativeType = {
  nameAndLastName: string;
  mobileNumber: string;
  fixedPhoneNumber: string;
  representativeType: number;
};

export type OrganizationInfoParamsType = {
  orgNationalId: string;
};
