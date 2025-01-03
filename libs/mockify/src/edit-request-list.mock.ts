import { editRequestListData } from './data/edit-request-list';

export const editRequestListMock = async (): Promise<any> => {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: {
          content: editRequestListData,
          total: editRequestListData.length,
        },
      };

      resolve(response);
    }, 2500);
  });

  return data;
};
