import { TagsData } from './data/tags';

export const TagInfo = async (): Promise<any> => {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data: {
          content: TagsData,
          total: TagsData.length,
        },
      };

      resolve(response);
      // reject(Error('THIS IS ERRRRRRRRORRR'));
    }, 4500);
  });

  return data;
};
