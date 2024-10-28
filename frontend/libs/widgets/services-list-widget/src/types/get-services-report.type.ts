export type ParamsType = {
  searchTerm: string;
  sort: 'newest' | 'oldest';
  status: 'all' | 'active' | 'inactive';
  page: number;
};

export type ServiceType = {
  name: string;
  persianName: string;
  scope: string;
  url: string;
  status: boolean;
};
