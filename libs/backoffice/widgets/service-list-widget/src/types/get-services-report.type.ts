export interface ParamsType {
  isActive: boolean | null;
  'search-field'?: string | null;
  'scope-id'?: string;
  page: number;
  size: number;
  sort: string;
}
export type ServiceDto = {
  id: number;
  name: string;
  persianName: string;
  scope: string;
  version: string;
  path: string;
  isActive: boolean;
};
// export type ServiceTypeQuery = {
//   list: ServiceType[];
//   total: number;
// };

// export type PaginationResultType = {
//   pageNumber: number;
//   pageSize: number;
//   totalNumberOfEntries: number;
// };
export interface ServicesDto {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: ServiceDto[];

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
