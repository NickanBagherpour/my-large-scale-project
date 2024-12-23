import { requestedServicesData, requestInfoData, requestResultData } from './data/request-details.data';

export const getRequestInfo = async ({ requestId }): Promise<any> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const filteredData = requestInfoData.filter((requestInfo) => requestInfo.requestId === requestId);
      const response = {
        data: filteredData[0],
      };
      resolve(response);
    }, 1500);
  });
};

export const getRequestedServices = async ({ requestId, pagination: { page, rowsPerPage } }) => {
  return new Promise<{ data: { content; total: number } }>((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      resolve({ data: { content: requestedServicesData.slice(start, end), total: requestedServicesData.length } });
    }, 700);
  });
};

export const getRequestResult = async ({ requestId }): Promise<any> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const filteredData = requestResultData.filter((requestInfo) => requestInfo.requestId === requestId);
      const response = {
        data: filteredData[0],
      };
      resolve(response);
    }, 1500);
  });
};
