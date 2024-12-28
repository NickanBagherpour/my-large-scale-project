export type ParamsType = {
  searchTerm: string;
  sort: 'newest' | 'oldest';
  status: 'all' | 'active' | 'unActive';
  page: number;
};

export type ClientType = {
  name: string;
  logo: unknown;
  id: string;
  applicationKey: string;
  tags: string[] | null;
  description: string;
  isActiveInTheService: boolean;
  date: string;
};

export type OrganizationParamsType = {
  searchTerm: string;
  sort: 'newest' | 'oldest';
  status: 'isAggregator' | 'hasAggregator' | 'nothing' | undefined;
  page: number;
};

export type AggregatorsParamsType = {
  page: number;
  size: number;
  sort: 'newest' | 'oldest';
};
