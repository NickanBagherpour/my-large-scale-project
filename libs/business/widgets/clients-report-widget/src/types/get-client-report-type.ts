export interface ParamsType {
  'search-field'?: string | null;
  'scope-id'?: string;
  page: number;
  size: number;
}

export interface ClientReportsDto {
  response: {
    page: {
      number: number;
      size: number;
      totalElements: number;
      totalPages: number;
    };
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
  };
}

export type ClientReportDto = {
  clientEnName: string;
  clientPersianName: string;
  isActive: true;
  clientKey: number;
  authKey: number;
  websiteUrl: string;
  createDate: string;
  organizationNationalId: number;
  organizationName: string;
};
