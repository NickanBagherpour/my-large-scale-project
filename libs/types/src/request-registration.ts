export type ServiceRequest = {
  id: number;
  fee: number;
  name: string;
  persianName: string;
  version: string;
};

export type RequestParamsType = {
  searchTerm: string;
  sort: string;
  status: any;
  pagination: {
    page: number;
    rowsPerPage: number;
  };
};
