import { tableDetail } from './data/detail-table.data';

export const getDetailTableData = async (params): Promise<any> => {
  const limit = params.pagination.limit;
  const offset = params.pagination.page * limit - limit;
  const endIndex = offset + limit;
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: {
          content: tableDetail.slice(offset, endIndex),
          total: tableDetail.length,
        },
      };

      resolve(response);
    }, 2500);
  });

  return data;
};
