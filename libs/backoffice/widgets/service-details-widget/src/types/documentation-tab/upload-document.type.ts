export type UploadDocumentResponseType = {
  serviceDocumentId: number;
  fileContents: string;
  fileName: string;
  serviceInfoId: number;
  fileGUId: string;
  deleted: boolean;
};
export type UploadDocumentParamsType = {
  serviceName: string;
  file: File;
};
