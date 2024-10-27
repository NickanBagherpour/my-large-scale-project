import { TagsData } from './data/tags';

export const TagInfo = async (): Promise<any> => {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        data: {
          content: TagsData,
          total: TagsData.length,
        },
      };

      resolve(response);
    }, 2500);
  });

  return data;
};
