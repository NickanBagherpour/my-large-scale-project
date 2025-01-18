import { useQuery } from '@tanstack/react-query';

import { getCookie, RQKEYS } from '@oxygen/utils';

import Api from './api';
import { CookieKey } from '@oxygen/types';

export const useGetUserInfo = () => {
  const token = getCookie(CookieKey.SESSION_ID);
  return useQuery({
    queryKey: [RQKEYS.BACKOFFICE.AUTH.USER_INFO],
    queryFn: Api.getUserProfile,
    enabled: !!token,
    retry: 3, // Retries failed requests 1 time
    // cacheTime: 1000 * 60 * 5, // Cache the data for 5 minutes
    // staleTime: 1000 * 60 * 2, // Stale time of 2 minutes
  });
};
