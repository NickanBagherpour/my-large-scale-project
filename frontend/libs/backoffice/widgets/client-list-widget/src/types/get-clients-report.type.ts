export type ParamsType = {
  searchTerm: string;
  sort: 'newest' | 'oldest';
  status: 'all' | 'active' | 'inactive';
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
