export interface ServicesResponse {
  content: {
    id: number;
    name: string;
    persianName: string;
    fee: number | null;
    version: string;
  }[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}
