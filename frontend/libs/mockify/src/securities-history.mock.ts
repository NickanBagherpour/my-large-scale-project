import { filterSecuritiesTypeData, filterStatusData, filterSecuritiesData } from './data/filter.data';
import { securitiesHistoryData } from './data/securities-history.data';

export const getSecuritiesHistoryData = async (params): Promise<any> => {
  const offset = params.pagination.offset;
  const limit = params.pagination.limit;
  const endIndex = offset + limit;
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: {
          content: securitiesHistoryData.slice(offset, endIndex),
          total: securitiesHistoryData.length,
        },
      };

      resolve(response);
    }, 500);
  });

  return data;
};

export const getSecuritiesItem = async (params): Promise<any> => {
  const { id } = params;

  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data:
          securitiesHistoryData.find((item) => item.id === id),
      };

      resolve(response);
    }, 2000);
  });
};
export const postSecuritiesItem = async (params): Promise<any> => {
  const { id } = params;

  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data:
          securitiesHistoryData.find((item) => item.id === id),
      };

      resolve(response);
    }, 2000);
  });
};

export const getFilterStatus = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: filterStatusData,
      };

      resolve(response);
    }, 1000);
  });
};

export const getFilterSecuritiesTypes = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: filterSecuritiesTypeData,
      };

      resolve(response);
    }, 800);
  });
};

export const getFilterSecurities = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: filterSecuritiesData,
      };

      resolve(response);
    }, 500);
  });
};
