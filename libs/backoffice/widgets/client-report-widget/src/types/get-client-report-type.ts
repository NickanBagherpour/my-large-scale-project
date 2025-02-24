export type ClientReportDto = {
  id: number;
  name: string;
  national: string;
};

export type ParamsWithPagination = {
  page: number;
  size: number;
  sort?: 'createDate,DESC' | 'createDate,ASC';
};

export type ClientReportParamsType = ParamsWithPagination & {
  searchParam: string;
};

export interface ClientReportsDto {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: ClientReportDto[];

  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  empty: boolean;
}
