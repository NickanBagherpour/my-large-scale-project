export type ParamsType = {
  searchTerm: string;
  sort: 'newest' | 'oldest';
  status: 'all' | 'active' | 'inactive';
  page: number;
  rowsPerPage: any;
};

export type ServiceType = {
  name: string;
  persianName: string;
  scope: string;
  url: string;
  status: boolean;
};
