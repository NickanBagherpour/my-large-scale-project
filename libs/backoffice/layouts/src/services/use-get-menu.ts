import { useQuery } from '@tanstack/react-query';

import { useMenu } from '@oxygen/hooks';
import { RQKEYS } from '@oxygen/utils';

import Api from './api';

export const useGetMenu = () => {
  const { menu } = useMenu();

  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.AUTH.MENU],
    queryFn: Api.getMenus,
    enabled: !menu, // Only run the query if no menu data is present
    // retry: 3, // Retries failed requests 1 time
    // cacheTime: 1000 * 60 * 5, // Cache the data for 5 minutes
    // staleTime: 1000 * 60 * 2, // Stale time of 2 minutes
  });
};
