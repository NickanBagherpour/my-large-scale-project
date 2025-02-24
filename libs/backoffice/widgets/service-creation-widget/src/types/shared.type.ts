export type Pagination = {
  page: number;
  size: number;
};

export type ParamsWithPagaination<T extends object> = T & {
  page: number;
  size: number;
  sort?: 'createDate,DESC' | 'createDate,ASC';
};

export type ErrorMsg = {
  title?: string;
  description: string;
};
