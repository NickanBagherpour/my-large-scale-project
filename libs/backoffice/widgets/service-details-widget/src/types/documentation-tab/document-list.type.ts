export type DocumentListResponseType = {
  serviceDocumentId: number;
  fileContents: string;
  fileName: string;
  serviceInfoId: number;
  fileGUId: string;
  deleted: boolean;
};
export type ConvertedDocumentListResponseType = {
  serviceDocumentId: number;
  fileContents: string;
  fileName: string;
  serviceInfoId: number;
  fileGUId: string;
  deleted: boolean;
  uid: number | string;
};
