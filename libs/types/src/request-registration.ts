export type ServiceRequest = {
  id: number;
  fee: number;
  name: string;
  persianName: string;
  version: string;
};

export type RequestParamsType = {
  searchTerm: string;
  sort: 'newest' | 'oldest';
  status: 'all' | 'confirmed' | 'reviewed' | 'rejected';
  page: number;
};
