interface Representative {
  nameAndLastName: string;
  mobileNumber: string;
  fixedPhoneNumber: string;
  representativeType: number;
}

export interface OrganizationParamsType {
  organization: {
    legalName: string;
    legalType: string;
    registerNo: string;
    registerDate: string;
    organizationNationalId: string;
    economicCode: string;
    activityIndustry: string;
    postalCode: string;
    phone: string;
    registeredAddress: string;
    isAggregator: boolean;
    aggregatorId: null;
  };
  representative: {
    clientKey: string;
    representatives: Representative[];
  };
}
