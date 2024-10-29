export type Pagination = { page: number; rowsPerPage: number };

export type ClientInfo = {
  grantType: string[];
  tags: string[];
  clientStatus: string;
  englishClientName: string;
  persianClientName: string;
  clientType: string;
  clientId: string;
  authenticationId: string;
  websiteAddress: string;
  inputAddress: string;
  clientReturnAddress: string;
  aggregator: string;
  applicantInfo: string;
  username: string;
  nationalCode: string;
  organizationName: string;
  mobile: string;
  phone: string;
  email: string;
};

export type Service = {
  serviceName: string;
  persianName: string;
  scope: string;
  url: string;
  version: string;
  status: string;
  details: string;
  remove: string;
};
