import { routeHistoryData } from '@oxygen/types';
import { routeChangeHistoryData } from './data/route-history.data';

export const getRouteChangeHistory = async ({ page, rowsPerPage }) => {
  return new Promise<{ data: { content: routeHistoryData[]; total: number } }>((resolve, reject) => {
    console.log(routeChangeHistoryData, 'routeHistoryData');

    setTimeout(() => {
      resolve({ data: { content: routeChangeHistoryData, total: routeChangeHistoryData.length } });
    }, 700);
  });
};
