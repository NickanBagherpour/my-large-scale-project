export type PaginatedData<TContentItem extends object> = {
  totalPages: number;
  totalElements: number;
  pageable: {
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    offset: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  };
  last: boolean;
  numberOfElements: number;
  first: boolean;
  size: number;
  content: TContentItem[];
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  empty: boolean;
};

export type Sort = 'createDate,DESC' | 'createDate,ASC';
