export type ParamsWithPagination = {
  page: number;
  size: number;
  sort: 'createDate,DESC' | 'createDate,ASC';
};

export type Draft = {
  clientId: number;
  clientName: string;
  progressPercent: number;
  stepName: string;
};

export type Drafts = WithPagaination<Draft>;

type WithPagaination<T extends object> = {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};
